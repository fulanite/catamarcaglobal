"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { banderasDelegaciones, delegaciones } from "@/data/delegaciones";

type Phase = "ready" | "normal" | "warning" | "urgent" | "done";

const presets = [
  { label: "1 min", seconds: 60 },
  { label: "2 min", seconds: 120 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
];

function formatTime(ms: number) {
  const seconds = Math.ceil(ms / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function getPhase(ms: number, started: boolean): Phase {
  if (!started) return "ready";
  if (ms <= 0) return "done";
  if (ms <= 30_000) return "urgent";
  if (ms <= 90_000) return "warning";
  return "normal";
}

export function CountdownTimer() {
  const [minutes, setMinutes] = useState("3");
  const [seconds, setSeconds] = useState("0");
  const [remainingMs, setRemainingMs] = useState(180_000);
  const [pais, setPais] = useState<(typeof delegaciones)[number] | "">("");
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notice, setNotice] = useState("");
  const stageRef = useRef<HTMLDivElement>(null);
  const deadlineRef = useRef(0);
  const remainingRef = useRef(remainingMs);
  const previousSecondRef = useRef(Math.ceil(remainingMs / 1000));
  const audioRef = useRef<AudioContext | null>(null);
  const soundRef = useRef(soundEnabled);

  const configuredSeconds = Math.max(0, Number(minutes) || 0) * 60 + Math.max(0, Number(seconds) || 0);
  const phase = getPhase(remainingMs, started);
  const bandera = pais ? `/flags/flag-${banderasDelegaciones[pais]}.svg` : null;

  useEffect(() => { soundRef.current = soundEnabled; }, [soundEnabled]);
  useEffect(() => {
    const sync = () => setIsFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);
  useEffect(() => () => { void audioRef.current?.close(); }, []);

  const playTone = useCallback((frequency: number, duration = 0.16, delay = 0) => {
    if (!soundRef.current || !audioRef.current) return;
    const audio = audioRef.current;
    if (audio.state !== "running") return;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const start = audio.currentTime + delay;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }, []);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const left = Math.max(0, deadlineRef.current - performance.now());
      const wholeSecond = Math.ceil(left / 1000);
      const previous = previousSecondRef.current;
      remainingRef.current = left;
      setRemainingMs(left);
      if (wholeSecond !== previous) {
        if (previous > 90 && wholeSecond <= 90) playTone(660, 0.22);
        if (previous > 30 && wholeSecond <= 30) {
          playTone(780, 0.18);
          playTone(780, 0.18, 0.25);
        }
        if (wholeSecond > 0 && wholeSecond <= 10) playTone(wholeSecond <= 3 ? 880 : 700, 0.12);
        if (wholeSecond === 0) {
          playTone(880, 0.32);
          playTone(660, 0.4, 0.4);
          playTone(880, 0.55, 0.9);
        }
        previousSecondRef.current = wholeSecond;
      }
      if (left === 0) setRunning(false);
    };
    tick();
    const interval = window.setInterval(tick, 100);
    return () => window.clearInterval(interval);
  }, [running, playTone]);

  async function unlockAudio() {
    if (!soundEnabled) return;
    try {
      audioRef.current ??= new AudioContext();
      if (audioRef.current.state === "suspended") await audioRef.current.resume();
    } catch {
      setSoundEnabled(false);
      setNotice("El navegador no permitió reproducir sonidos. El aviso visual sigue activo.");
    }
  }

  function setDuration(totalSeconds: number) {
    const value = Math.min(3_599_999, Math.max(0, totalSeconds));
    setMinutes(String(Math.floor(value / 60)));
    setSeconds(String(value % 60));
    const ms = value * 1000;
    remainingRef.current = ms;
    previousSecondRef.current = value;
    setRemainingMs(ms);
    setStarted(false);
    setNotice("");
  }

  function changePart(part: "minutes" | "seconds", raw: string) {
    if (!/^\d*$/.test(raw)) return;
    if (raw && Number(raw) > (part === "minutes" ? 999 : 59)) return;
    const nextMinutes = part === "minutes" ? raw : minutes;
    const nextSeconds = part === "seconds" ? raw : seconds;
    if (part === "minutes") setMinutes(raw);
    else setSeconds(raw);
    const total = (Number(nextMinutes) || 0) * 60 + (Number(nextSeconds) || 0);
    const ms = total * 1000;
    remainingRef.current = ms;
    previousSecondRef.current = total;
    setRemainingMs(ms);
    setStarted(false);
    setNotice("");
  }

  async function startPause() {
    if (running) {
      const left = Math.max(0, deadlineRef.current - performance.now());
      remainingRef.current = left;
      setRemainingMs(left);
      setRunning(false);
      return;
    }
    if (remainingRef.current <= 0) {
      if (configuredSeconds <= 0) {
        setNotice("Configurá al menos un segundo para empezar.");
        return;
      }
      remainingRef.current = configuredSeconds * 1000;
      setRemainingMs(remainingRef.current);
    }
    await unlockAudio();
    previousSecondRef.current = Math.ceil(remainingRef.current / 1000);
    deadlineRef.current = performance.now() + remainingRef.current;
    setStarted(true);
    setRunning(true);
    setNotice("");
  }

  function reset() {
    setRunning(false);
    setDuration(configuredSeconds);
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (stageRef.current) await stageRef.current.requestFullscreen();
    } catch {
      setNotice("Este navegador no permitió activar pantalla completa.");
    }
  }

  const status = phase === "done" ? "Tiempo cumplido" : running ? "Cuenta regresiva en curso" : started ? "En pausa" : "Listo para empezar";

  return <div className="timer-page">
    <section className="timer-intro" aria-labelledby="timer-heading">
      <div><span className="timer-eyebrow">Catamarca Global · Modelo ONU</span><h1 id="timer-heading">Timer para el debate</h1><p>Configurá el tiempo y proyectá la cuenta regresiva.</p></div>
      <span className="timer-intro-tag">Herramienta de proyección</span>
    </section>

    <div className="timer-layout">
      <aside className="timer-panel" aria-label="Configuración del timer">
        <h2>Configurar tiempo</h2>
        <p>Ingresá minutos y segundos, o elegí una duración rápida.</p>
        <div className="timer-fields">
          <label>Minutos<input type="number" min="0" max="999" inputMode="numeric" value={minutes} disabled={running} onChange={(event) => changePart("minutes", event.target.value)} /></label>
          <span aria-hidden="true">:</span>
          <label>Segundos<input type="number" min="0" max="59" inputMode="numeric" value={seconds} disabled={running} onChange={(event) => changePart("seconds", event.target.value)} /></label>
        </div>
        <div className="timer-presets" aria-label="Duraciones rápidas">{presets.map((preset) => <button key={preset.seconds} type="button" disabled={running} onClick={() => setDuration(preset.seconds)}>{preset.label}</button>)}</div>
        <label className="timer-country">Delegación que está hablando<select value={pais} onChange={(event) => setPais(event.target.value as (typeof delegaciones)[number] | "")}><option value="">Ninguna</option>{delegaciones.map((nombre) => <option key={nombre} value={nombre}>{nombre}</option>)}</select></label>
        <div className="timer-main-actions">
          <button className="timer-primary" type="button" onClick={() => void startPause()}>{running ? "Pausar" : started && remainingMs > 0 ? "Continuar" : "Iniciar"}</button>
          <button className="timer-secondary" type="button" onClick={reset}>Reiniciar</button>
        </div>
        <label className="timer-sound"><input type="checkbox" checked={soundEnabled} onChange={(event) => setSoundEnabled(event.target.checked)} /><span>Sonidos de aviso</span></label>
        <p className="timer-help">Aviso amarillo al llegar a 1:30, rojo a los 30 segundos y señales sonoras al acercarse al final.</p>
        {notice && <p className="timer-notice" role="status">{notice}</p>}
      </aside>

      <div ref={stageRef} className={`timer-stage timer-stage--${phase}${bandera ? " timer-stage--speaker" : ""}`} aria-label="Pantalla de proyección">
        <div className="timer-stage-top"><Image src="/brand/logo-catamarca-global.webp" alt="Catamarca Global" width={176} height={60} priority /><span>MODELO ONU</span></div>
        <div className="timer-stage-center">{bandera && <div className="timer-speaker"><Image src={bandera} alt={`Bandera de ${pais}`} width={180} height={120} unoptimized /><strong>{pais}</strong></div>}<span className="timer-stage-label">Tiempo restante</span><div className={`timer-clock ${phase === "urgent" ? "timer-clock--urgent" : ""}`} role="timer" aria-live="off">{formatTime(remainingMs)}</div><div className="timer-stage-status" aria-live="polite">{status}</div></div>
        <div className="timer-stage-actions"><button type="button" onClick={() => void startPause()}>{running ? "Pausar" : started && remainingMs > 0 ? "Continuar" : "Iniciar"}</button><button type="button" onClick={() => void toggleFullscreen()}>{isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}</button><label className="timer-stage-country">Delegación<select value={pais} onChange={(event) => setPais(event.target.value as (typeof delegaciones)[number] | "")}><option value="">Ninguna</option>{delegaciones.map((nombre) => <option key={nombre} value={nombre}>{nombre}</option>)}</select></label></div>
        <div className="timer-stage-progress" aria-hidden="true"><span style={{ width: `${configuredSeconds > 0 ? Math.max(0, Math.min(100, remainingMs / (configuredSeconds * 1000) * 100)) : 0}%` }} /></div>
      </div>
    </div>
  </div>;
}
