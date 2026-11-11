import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evaluación del Modelo ONU",
  description: "Acceso al sistema de coordinación de evaluaciones del Modelo ONU.",
  robots: { index: false, follow: false },
};

export default function EvaluacionPage() {
  return <div className="coord-page"><meta httpEquiv="refresh" content="0;url=/modelo-onu/evaluacion/coordinacion/" /><p>La carga de evaluaciones se realiza desde <a href="/modelo-onu/evaluacion/coordinacion/">coordinación</a>.</p></div>;
}
