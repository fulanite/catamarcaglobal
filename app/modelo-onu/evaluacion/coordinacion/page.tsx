import type { Metadata } from "next";
import { CoordinacionEvaluaciones } from "@/components/CoordinacionEvaluaciones";
import "./coordinacion.css";

export const metadata: Metadata = {
  title: "Coordinación de evaluaciones · Modelo ONU",
  description: "Consulta de las fichas del jurado del Modelo ONU.",
  robots: { index: false, follow: false },
};

export default function CoordinacionPage() {
  return <CoordinacionEvaluaciones />;
}
