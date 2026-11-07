import type { Metadata } from "next";
import { CountdownTimer } from "@/components/CountdownTimer";
import "./timer.css";

export const metadata: Metadata = {
  title: "Timer para el Modelo ONU",
  description: "Cuenta regresiva configurable para proyectar durante el Modelo ONU de Catamarca Global.",
  robots: { index: false, follow: false },
};

export default function TimerPage() {
  return <CountdownTimer />;
}
