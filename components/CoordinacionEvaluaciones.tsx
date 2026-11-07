"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { criterios } from "@/data/evaluacion";

type Ficha = {
  id: string;
  jurado: string;
  fecha: string;
  comision: string;
  delegacion: string;
  puntajes: Record<string, number>;
  puntaje: number | null;
  fortaleza: string;
  observacion: string;
  candidata: boolean | null;
  estado: "borrador" | "final";
  creado: string;
  actualizado: string;
};
type HistorialFicha = Ficha & { instancia: string; instancia_nombre: string; archivado: string };
type Instancia = { instancia: string; nombre: string; iniciada: string };

type ApiResponse = { ok?: boolean; fichas?: Ficha[]; historial?: HistorialFicha[]; instancia?: Instancia; archivadas?: number; error?: string };
const endpoint = "/api/evaluaciones-admin.php";
const formatter = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });

async function request(method: "GET" | "POST", body?: object): Promise<{ status: number; data: ApiResponse }> {
  const response = await fetch(endpoint, {
    method,
    credentials: "same-origin",
    cache: "no-store",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({})) as ApiResponse;
  return { status: response.status, data };
}

function csvCell(value: unknown) {
  let text = String(value ?? "");
  if (/^[\s]*[=+@\-]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

function FichaItem({ ficha }: { ficha: Ficha }) {
  return <details className="coord-ficha"><summary><span className="coord-ficha-main"><strong>{ficha.delegacion || "Delegación pendiente"}</strong><small>{ficha.comision || "Comisión pendiente"} · {ficha.jurado} · {ficha.fecha}</small></span><span className="coord-ficha-end"><strong>{ficha.puntaje === null ? "—" : formatter.format(ficha.puntaje)} <small>/ 100</small></strong><em className={ficha.estado === "final" ? "coord-final" : "coord-draft"}>{ficha.estado === "final" ? "Final" : "Borrador"}</em></span></summary><div className="coord-detail"><div className="coord-detail-grid">{criterios.map((criterio) => <div key={criterio.id}><span>{criterio.nombre} <small>({criterio.peso} %)</small></span><strong>{ficha.puntajes[criterio.id] ?? "—"} / 4</strong></div>)}</div><div className="coord-detail-notes"><p><strong>Fortaleza:</strong> {ficha.fortaleza || "Sin observación"}</p><p><strong>Observación:</strong> {ficha.observacion || "Sin observación"}</p><p><strong>Candidata a mejor delegación:</strong> {ficha.candidata === null ? "Sin marcar" : ficha.candidata ? "Sí" : "No"}</p><small>Última actualización: {ficha.actualizado}</small></div></div></details>;
}

export function CoordinacionEvaluaciones() {
  const [access, setAccess] = useState<"loading" | "login" | "ready" | "error">("loading");
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [historial, setHistorial] = useState<HistorialFicha[]>([]);
  const [instancia, setInstancia] = useState<Instancia | null>(null);
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("todos");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [cerrando, setCerrando] = useState(false);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [nombreNueva, setNombreNueva] = useState("");
  const [claveCierre, setClaveCierre] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const load = useCallback(async () => {
    try {
      const { status, data } = await request("GET");
      if (status === 401) { setMessage(""); setAccess("login"); return; }
      if (status !== 200 || data.ok !== true || !Array.isArray(data.fichas) || !Array.isArray(data.historial) || !data.instancia) {
        setMessage(data.error || "No se pudieron cargar las fichas.");
        setAccess("error");
        return;
      }
      setFichas(data.fichas);
      setHistorial(data.historial);
      setInstancia(data.instancia);
      setAccess("ready");
      setMessage("");
    } catch {
      setMessage("No se pudo conectar con el servidor de evaluaciones.");
      setAccess("error");
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const { status, data } = await request("POST", { action: "login", password });
      if (status !== 200 || data.ok !== true) {
        setMessage(data.error || "No se pudo iniciar sesión.");
        return;
      }
      setPassword("");
      await load();
    } catch {
      setMessage("No se pudo conectar con el servidor.");
    } finally { setBusy(false); }
  }

  async function logout() {
    try {
      const { status, data } = await request("POST", { action: "logout" });
      if (status !== 200 || data.ok !== true) {
        setMessage(data.error || "No se pudo cerrar la sesión. Probá nuevamente.");
        return;
      }
      setFichas([]);
      setHistorial([]);
      setInstancia(null);
      setAccess("login");
      setPassword("");
      setMessage("");
    } catch {
      setMessage("No se pudo cerrar la sesión. Probá nuevamente.");
    }
  }

  function exportCsv(lista: Ficha[], prefijo: string, incluirInstancia = false) {
    const headers = [...(incluirInstancia ? ["Instancia"] : []), "Fecha", "Jurado", "Comisión", "Delegación", "Estado", "Puntaje", "Candidata", ...criterios.map((criterio) => criterio.nombre), "Fortaleza", "Observación", "Actualizado"];
    const rows = lista.map((ficha) => [...(incluirInstancia ? [(ficha as HistorialFicha).instancia_nombre] : []), ficha.fecha, ficha.jurado, ficha.comision, ficha.delegacion, ficha.estado, ficha.puntaje, ficha.candidata === null ? "" : ficha.candidata ? "Sí" : "No", ...criterios.map((criterio) => ficha.puntajes[criterio.id] ?? ""), ficha.fortaleza, ficha.observacion, ficha.actualizado]);
    const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${prefijo}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function cerrarInstancia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!instancia || !confirmado || !claveCierre || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const { status, data } = await request("POST", { action: "cerrar_instancia", password: claveCierre, instancia: instancia.instancia, cantidad: fichas.length, nombre_archivo: nombreArchivo.trim(), nombre_nueva: nombreNueva.trim() });
      if (status !== 200 || data.ok !== true) { setMessage(data.error || "No se pudo cerrar la instancia."); return; }
      setClaveCierre("");
      setCerrando(false);
      setConfirmado(false);
      await load();
      setMessage(`${data.archivadas ?? fichas.length} fichas pasaron al historial. La nueva instancia está lista.`);
    } catch { setMessage("No se pudo conectar con el servidor."); }
    finally { setBusy(false); }
  }

  const visible = useMemo(() => fichas.filter((ficha) => {
    if (estado !== "todos" && ficha.estado !== estado) return false;
    const search = `${ficha.jurado} ${ficha.comision} ${ficha.delegacion}`.toLocaleLowerCase("es-AR");
    return search.includes(query.trim().toLocaleLowerCase("es-AR"));
  }), [fichas, query, estado]);
  const finalizadas = fichas.filter((ficha) => ficha.estado === "final").length;
  const jurados = new Set(fichas.map((ficha) => ficha.jurado.trim().toLocaleLowerCase("es-AR")).filter(Boolean)).size;
  const gruposHistorial = useMemo(() => {
    const grupos = new Map<string, { clave: string; titulo: string; fichas: HistorialFicha[] }>();
    for (const ficha of historial) {
      const clave = `${ficha.instancia}|${ficha.fecha}`;
      if (!grupos.has(clave)) grupos.set(clave, { clave, titulo: `${ficha.instancia_nombre} · ${ficha.fecha}`, fichas: [] });
      grupos.get(clave)!.fichas.push(ficha);
    }
    return [...grupos.values()];
  }, [historial]);

  return <div className="coord-page"><div className="coord-shell">
    <div className="coord-top"><span>CATAMARCA GLOBAL · MODELO ONU</span><a href="/modelo-onu/evaluacion/">Formulario del jurado</a></div>
    <header className="coord-header"><span className="eval-kicker">Acceso de coordinación</span><h1>Fichas de evaluación</h1><p>Consulta de todas las fichas recibidas en la base de datos.</p></header>
    {access === "loading" && <p className="coord-panel" role="status">Cargando fichas…</p>}
    {access === "error" && <div className="coord-panel"><p role="alert">{message}</p><button className="coord-secondary" type="button" onClick={() => { setAccess("loading"); void load(); }}>Reintentar</button></div>}
    {access === "login" && <form className="coord-panel coord-login" onSubmit={(event) => void login(event)}><h2>Ingresar a coordinación</h2><p>La clave permite consultar las evaluaciones y cerrar instancias. El jurado no necesita clave para completar el formulario.</p><label>Clave de coordinación<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label><button className="coord-primary" type="submit" disabled={busy}>{busy ? "Ingresando…" : "Ingresar"}</button>{message && <p className="coord-error" role="alert">{message}</p>}</form>}
    {access === "ready" && <>
      <p className="coord-instance">Instancia activa: <strong>{instancia?.nombre}</strong> · desde {instancia?.iniciada?.slice(0, 10)}</p>
      <div className="coord-overview"><div><strong>{fichas.length}</strong><span>Fichas recibidas</span></div><div><strong>{finalizadas}</strong><span>Finalizadas</span></div><div><strong>{jurados}</strong><span>Jurados</span></div></div>
      <section className="coord-panel"><div className="coord-toolbar"><div><h2>Evaluaciones actuales</h2><p>{visible.length} de {fichas.length} fichas visibles</p></div><div className="coord-toolbar-actions"><button className="coord-secondary" type="button" onClick={() => void load()}>Actualizar</button><button className="coord-secondary" type="button" onClick={() => exportCsv(fichas, "evaluaciones-modelo-onu")} disabled={!fichas.length}>Descargar CSV</button><button className="coord-text" type="button" onClick={() => void logout()}>Salir</button></div></div>{message && <p className="coord-error" role="status">{message}</p>}
        <div className="coord-filters"><label>Buscar<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Jurado, comisión o delegación" /></label><label>Estado<select value={estado} onChange={(event) => setEstado(event.target.value)}><option value="todos">Todos</option><option value="final">Finalizadas</option><option value="borrador">Borradores</option></select></label></div>
        {visible.length ? <div className="coord-list">{visible.map((ficha) => <FichaItem ficha={ficha} key={ficha.id} />)}</div> : <p className="coord-empty">No hay fichas que coincidan con los filtros.</p>}
      </section>
      <section className="coord-panel coord-cycle"><h2>Cerrar esta instancia</h2><p>Las {fichas.length} fichas actuales pasarán al historial y el formulario comenzará una instancia nueva con el contador en cero. Verificá que los jurados no tengan fichas pendientes de sincronizar antes de hacerlo.</p>
        {!cerrando ? <button className="coord-secondary" type="button" onClick={() => { setNombreArchivo(instancia?.nombre || "Demostración"); setNombreNueva("Evaluación del Modelo ONU"); setCerrando(true); setMessage(""); }}>Cerrar y empezar otra</button> : <form className="coord-close-form" onSubmit={(event) => void cerrarInstancia(event)}><label>Nombre de esta instancia en el historial<input value={nombreArchivo} maxLength={120} onChange={(event) => setNombreArchivo(event.target.value)} required /></label><label>Nombre de la nueva instancia<input value={nombreNueva} maxLength={120} onChange={(event) => setNombreNueva(event.target.value)} required /></label><label>Confirmá con la clave de coordinación<input type="password" autoComplete="current-password" value={claveCierre} onChange={(event) => setClaveCierre(event.target.value)} required /></label><label className="coord-check"><input type="checkbox" checked={confirmado} onChange={(event) => setConfirmado(event.target.checked)} required /><span>Confirmo que quiero archivar {fichas.length} fichas y comenzar de cero.</span></label><div className="coord-close-actions"><button className="coord-primary" type="submit" disabled={busy || !confirmado}>{busy ? "Archivando…" : "Archivar y empezar"}</button><button className="coord-text" type="button" onClick={() => { setCerrando(false); setClaveCierre(""); setMessage(""); }}>Cancelar</button></div></form>}
      </section>
      <section className="coord-panel coord-history"><div className="coord-toolbar"><div><h2>Historial por día</h2><p>{historial.length} fichas de instancias cerradas</p></div><button className="coord-secondary" type="button" onClick={() => exportCsv(historial, "historial-modelo-onu", true)} disabled={!historial.length}>Descargar historial CSV</button></div>
        {gruposHistorial.length ? <div className="coord-history-groups">{gruposHistorial.map((grupo) => <details key={grupo.clave} className="coord-history-group"><summary><strong>{grupo.titulo}</strong><span>{grupo.fichas.length} ficha{grupo.fichas.length === 1 ? "" : "s"}</span></summary><div className="coord-list">{grupo.fichas.map((ficha) => <FichaItem ficha={ficha} key={`${ficha.instancia}-${ficha.id}`} />)}</div></details>)}</div> : <p className="coord-empty">Todavía no hay instancias archivadas.</p>}
      </section>
    </>}
  </div></div>;
}
