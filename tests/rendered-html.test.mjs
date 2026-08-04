import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Catamarca Global homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Catamarca Global/i);
  assert.match(html, /Conectamos/);
  assert.match(html, /Modelo ONU/);
  assert.match(html, /Misión/);
  assert.match(html, /María Estela Argerich/);
  assert.match(html, /Luciana Parodi Cruz/);
  assert.match(html, /https:\/\/catamarca-global\.matexcardozo\.chatgpt\.site\/favicon\.ico/);
  assert.match(html, /https:\/\/catamarca-global\.matexcardozo\.chatgpt\.site\/favicon\.svg/);
  assert.doesNotMatch(html, /catamarca-global\.pages\.dev\/favicon/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("removes starter-only code and dependency", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|themeColor|\bViewport\b/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /lucide-react/);
});
