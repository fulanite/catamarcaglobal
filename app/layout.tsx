import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/data/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Catamarca Global | Conectamos Catamarca con el mundo",
    template: "%s | Catamarca Global",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: siteConfig.name,
    title: "Catamarca Global",
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Catamarca Global - Conectamos Catamarca con el mundo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catamarca Global",
    description: siteConfig.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={`${montserrat.variable} ${inter.variable}`}>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.legalName,
              url: siteConfig.url,
              logo: `${siteConfig.url}/brand/logo-catamarca-global.png`,
              description: siteConfig.description,
              sameAs: siteConfig.contact.socials.map((social) => social.href),
              address: {
                "@type": "PostalAddress",
                addressLocality: "Catamarca",
                addressCountry: "AR",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
