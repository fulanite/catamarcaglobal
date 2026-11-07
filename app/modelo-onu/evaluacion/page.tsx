import type { Metadata } from "next";
import { EvaluacionApp } from "@/components/EvaluacionApp";

export const metadata: Metadata = {
  title: "Evaluación del Modelo ONU",
  description: "Ficha digital para el jurado del Modelo ONU de Catamarca Global.",
  robots: { index: false, follow: false },
};

export default function EvaluacionPage() {
  return <EvaluacionApp />;
}
