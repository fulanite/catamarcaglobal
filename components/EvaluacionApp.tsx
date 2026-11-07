"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { criterios, puntajeTotal, type Puntajes } from "@/data/evaluacion";
import { delegaciones } from "@/data/delegaciones";

type Ficha = {
  id: string; token: string; jurado: string; fecha: string; comision: string; delegacion: string;
  puntajes: Puntajes; fortaleza: string; observacion: string; candidata: boolean | null;
  estado: "borrador" | "final"; pendiente: boolean; actualizado?: string;
};
const storageKey = "cata-modelo-onu-evaluaciones-v3";
const activeKey = "cata-modelo-onu-instancia-v3";
const api = "/api/evaluaciones.php";
const niveles = ["Inicial", "En desarrollo", "Logrado", "Destacado"];
class InstanciaAnterior extends Error {}

function leerLocal(instancia: string): Ficha[] {
  try {
    const data = JSON.parse(localStorage.getItem(`${storageKey}-${instancia}`) || "[]");
    return Array.isArray(data) ? data.filter((item) => item && typeof item.id === "string" && typeof item.token === "string") : [];
  } catch { return []; }
}
function nuevaFicha(): Ficha {
  return { id: crypto.randomUUID(), token: crypto.randomUUID(), jurado: "", fecha: new Date().toLocaleDateString("en-CA"), comision: "", delegacion: "", puntajes: {}, fortaleza: "", observacion: "", candidata: null, estado: "borrador", pendiente: true };
}
async function guardarRemoto(ficha: Ficha, instancia: string): Promise<string> {
  const response = await fetch(api, { method: "PUT", credentials: "same-origin", cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...ficha, instancia }) });
  const data = await response.json().catch(() => ({})) as { ok?: boolean; error?: string; actualizado?: string };
  if (response.status === 409) throw new InstanciaAnterior(data.error || "Se inició una nueva instancia.");
  if (!response.ok) throw new Error(data.error || `Error ${response.status}`);
  if (data.ok !== true) throw new Error("La base de datos no está conectada en esta vista previa.");
  return data.actualizado || "";
}

export function EvaluacionApp() {
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [sincronizando, setSincronizando] = useState(false);
  const [instancia, setInstancia] = useState<string | null>(null);
  const [instanciaNombre, setInstanciaNombre] = useState("");
  const fichasRef = useRef<Ficha[]>([]);
  const instanciaRef = useRef<string | null>(null);
  const syncRef = useRef(false);
  const ficha = fichas.find((item) => item.id === seleccion) || null;
  const criteriosCompletos = ficha ? criterios.filter((item) => ficha.puntajes[item.id]).length : 0;
  const pendientes = fichas.filter((item) => item.pendiente && item.jurado.trim()).length;

  const actualizarLista = useCallback((lista: Ficha[]) => {
    fichasRef.current = lista;
    setFichas(lista);
    if (instanciaRef.current) localStorage.setItem(`${storageKey}-${instanciaRef.current}`, JSON.stringify(lista));
  }, []);

  const cargarInstancia = useCallback(async () => {
    const anterior = localStorage.getItem(activeKey);
    let actual = anterior;
    let nombre = "Instancia guardada en este dispositivo";
    try {
      const response = await fetch(api, { cache: "no-store", credentials: "same-origin" });
      const data = await response.json() as { instancia?: string; nombre?: string; error?: string };
      if (!response.ok || !data.instancia) throw new Error(data.error || "No se pudo consultar la instancia.");
      actual = data.instancia;
      nombre = data.nombre || "Evaluación actual";
      localStorage.setItem(activeKey, actual);
      setMensaje("");
    } catch {
      if (!actual) {
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
          actual = "demo-local";
          nombre = "Vista previa local";
        } else {
          setMensaje("Conectate a internet para iniciar la evaluación.");
          return;
        }
      }
      setMensaje(actual === "demo-local" ? "Vista previa local: las fichas quedan en este navegador." : "Sin conexión. Las fichas se guardarán en este dispositivo hasta volver a conectarte.");
    }
    if (instanciaRef.current === actual) {
      setInstanciaNombre(nombre);
      return;
    }
    instanciaRef.current = actual;
    setInstancia(actual);
    setInstanciaNombre(nombre);
    const locales = leerLocal(actual);
    fichasRef.current = locales;
    setFichas(locales);
    setSeleccion(null);
    if (locales.some((item) => item.pendiente)) window.dispatchEvent(new Event("online"));
  }, []);

  const sincronizar = useCallback(async () => {
    if (syncRef.current || !navigator.onLine || !instanciaRef.current || instanciaRef.current === "demo-local") return;
    syncRef.current = true;
    setSincronizando(true);
    let exito = false;
    let guardadas = 0;
    try {
      for (const item of fichasRef.current.filter((row) => row.pendiente && row.jurado.trim())) {
        const actualizado = await guardarRemoto(item, instanciaRef.current);
        actualizarLista(fichasRef.current.map((row) => row.id === item.id && row === item ? { ...row, pendiente: false, actualizado } : row));
        guardadas += 1;
      }
      if (guardadas) setMensaje("Cambios guardados.");
      exito = true;
    } catch (error) {
      if (error instanceof InstanciaAnterior) {
        await cargarInstancia();
        setMensaje("Comenzó una nueva instancia. Las fichas anteriores permanecen guardadas en este dispositivo.");
      } else setMensaje(error instanceof Error ? `Pendiente de sincronizar: ${error.message}` : "Pendiente de sincronizar.");
    } finally {
      syncRef.current = false;
      setSincronizando(false);
      if (exito && fichasRef.current.some((row) => row.pendiente && row.jurado.trim())) window.setTimeout(() => window.dispatchEvent(new Event("online")), 900);
    }
  }, [actualizarLista, cargarInstancia]);

  useEffect(() => {
    const timer = window.setTimeout(() => void cargarInstancia(), 0);
    const interval = window.setInterval(() => { if (navigator.onLine) void cargarInstancia(); }, 30000);
    return () => { window.clearTimeout(timer); window.clearInterval(interval); };
  }, [cargarInstancia]);
  useEffect(() => {
    if (!fichas.some((item) => item.pendiente && item.jurado.trim())) return;
    const timer = window.setTimeout(() => void sincronizar(), 900);
    return () => window.clearTimeout(timer);
  }, [fichas, sincronizar]);
  useEffect(() => {
    const onOnline = () => void sincronizar();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [sincronizar]);

  function editar(cambios: Partial<Ficha>) {
    if (!ficha) return;
    actualizarLista(fichasRef.current.map((item) => item.id === ficha.id ? { ...item, ...cambios, pendiente: true } : item));
    setMensaje("Guardado en este dispositivo. Sincronizando…");
  }
  function finalizar() {
    if (!ficha) return;
    if (!ficha.jurado.trim() || !ficha.delegacion.trim() || !ficha.comision.trim() || !ficha.fecha || puntajeTotal(ficha.puntajes) === null) {
      setMensaje("Completá jurado, delegación, comisión, fecha y los diez criterios antes de finalizar.");
      return;
    }
    editar({ estado: "final" });
    setMensaje("Ficha finalizada. Se sincronizará con la base de datos.");
  }

  return <div className={`eval-page ${ficha ? "eval-page--editing" : ""}`}><div className="eval-shell">
    <div className="eval-topline"><span>CATAMARCA GLOBAL · MODELO ONU</span><a href="/modelo-onu/">Volver al programa</a></div>
    <header className="eval-header"><div><span className="eval-kicker">Formulario del jurado · {instanciaNombre || "Cargando instancia"}</span><h1>Evaluación de delegaciones</h1><p>Completá una ficha por delegación. El puntaje se calcula automáticamente sobre 100.</p></div></header>
    <div className="eval-status" role="status"><span className={`eval-dot ${pendientes && instancia !== "demo-local" ? "eval-dot--pending" : ""}`} />{instancia === "demo-local" ? "Vista previa local · sin conexión a MySQL" : sincronizando ? "Sincronizando…" : pendientes ? `${pendientes} ficha${pendientes === 1 ? "" : "s"} pendiente${pendientes === 1 ? "" : "s"} de sincronizar` : "Sin cambios pendientes"}</div>
    {!instancia ? <section className="eval-home"><p>{mensaje || "Cargando instancia…"}</p><button className="eval-primary" type="button" onClick={() => void cargarInstancia()}>Reintentar</button></section> : !ficha ? <section className="eval-home"><div className="eval-home-head"><div><h2>Fichas de este dispositivo</h2><p>Podés retomar un borrador desde este teléfono. La coordinación recopila las fichas en la base de datos.</p></div><button className="eval-primary" type="button" onClick={() => { const nueva = nuevaFicha(); actualizarLista([nueva, ...fichasRef.current]); setSeleccion(nueva.id); }}>+ Nueva evaluación</button></div>
      {fichas.length ? <div className="eval-list">{fichas.map((item) => <button className="eval-list-item" key={item.id} type="button" onClick={() => setSeleccion(item.id)}><span><strong>{item.delegacion || "Delegación sin nombre"}</strong><small>{item.comision || "Comisión pendiente"} · {item.jurado || "Jurado pendiente"} · {item.fecha}</small></span><span className="eval-list-score">{puntajeTotal(item.puntajes)?.toLocaleString("es-AR", { maximumFractionDigits: 2 }) ?? "—"}<small>{item.estado === "final" ? "Final" : "Borrador"}{item.pendiente ? " · Pendiente" : ""}</small></span></button>)}</div> : <p className="eval-empty">Todavía no hay fichas en este dispositivo. Creá una para empezar.</p>}
    </section> : <>
      <button className="eval-back" type="button" onClick={() => setSeleccion(null)}>← Fichas de este dispositivo</button>
      <div className="eval-form-head"><div><span className="eval-kicker">Ficha A · {ficha.estado === "final" ? "Finalizada" : "Borrador"}</span><h2>{ficha.delegacion || "Nueva delegación"}</h2></div><div className="eval-total"><strong>{puntajeTotal(ficha.puntajes)?.toLocaleString("es-AR", { maximumFractionDigits: 2 }) ?? "—"}</strong><span>/ 100</span></div></div>
      <div className="eval-fields"><label>Nombre del jurado<input value={ficha.jurado} maxLength={80} autoComplete="name" onChange={(e) => editar({ jurado: e.target.value })} placeholder="Tu nombre y apellido" /></label><label>Delegación<select value={ficha.delegacion} onChange={(e) => editar({ delegacion: e.target.value })}><option value="">Seleccioná una delegación</option>{ficha.delegacion && !delegaciones.some((nombre) => nombre === ficha.delegacion) && <option value={ficha.delegacion} disabled>{ficha.delegacion} (selección anterior)</option>}{delegaciones.map((nombre) => <option key={nombre} value={nombre}>{nombre}</option>)}</select></label><label>Comisión<input value={ficha.comision} maxLength={120} onChange={(e) => editar({ comision: e.target.value })} placeholder="Ej.: Asamblea General" /></label><label>Fecha<input type="date" value={ficha.fecha} onChange={(e) => editar({ fecha: e.target.value })} /></label></div>
      <div className="eval-criteria">{criterios.map((criterio, index) => <fieldset className="eval-card" key={criterio.id}><legend><span className="eval-card-num">{String(index + 1).padStart(2, "0")}</span><span>{criterio.nombre}</span><em>{criterio.peso} %</em></legend><p>{criterio.ayuda}</p><div className="eval-options" role="radiogroup" aria-label={criterio.nombre}>{niveles.map((nivel, i) => { const valor = (i + 1) as 1 | 2 | 3 | 4; return <label key={valor} className={ficha.puntajes[criterio.id] === valor ? "is-selected" : ""}><input type="radio" name={criterio.id} checked={ficha.puntajes[criterio.id] === valor} onChange={() => editar({ puntajes: { ...ficha.puntajes, [criterio.id]: valor } })} /><strong>{valor}</strong><span>{nivel}</span></label>; })}</div></fieldset>)}</div>
      <section className="eval-notes"><h3>Observaciones del jurado</h3><label>Fortaleza principal<textarea rows={2} maxLength={1000} value={ficha.fortaleza} onChange={(e) => editar({ fortaleza: e.target.value })} /></label><label>Observación relevante<textarea rows={3} maxLength={2000} value={ficha.observacion} onChange={(e) => editar({ observacion: e.target.value })} /></label><fieldset><legend>¿Candidata a mejor delegación?</legend><div className="eval-choice"><label><input type="radio" name="candidata" checked={ficha.candidata === true} onChange={() => editar({ candidata: true })} /> Sí</label><label><input type="radio" name="candidata" checked={ficha.candidata === false} onChange={() => editar({ candidata: false })} /> No</label></div></fieldset></section>
      <p className="eval-inclusive">Evaluá competencias, no estilos comunicacionales ni recursos económicos. Los apoyos autorizados no reducen el puntaje. En Comisión Redactora, considerá los aportes efectivos y las oportunidades de participación.</p>
      <div className="eval-actions"><button className="eval-primary" type="button" onClick={finalizar}>{ficha.estado === "final" ? "Guardar ficha final" : "Finalizar evaluación"}</button><button className="eval-secondary" type="button" onClick={() => setSeleccion(null)}>Volver a mis fichas</button></div>
      <div className="eval-progress" aria-label="Progreso de la evaluación"><div className="eval-progress__inner"><div className="eval-progress__heading"><span>{criteriosCompletos} de 10 criterios completos</span><strong>{criteriosCompletos * 10} %</strong></div><div className="eval-progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={10} aria-valuenow={criteriosCompletos} aria-label="Criterios completos"><i style={{ width: `${criteriosCompletos * 10}%` }} /></div></div></div>
    </>}
    {mensaje && <p className="eval-message" role="status">{mensaje}</p>}
  </div></div>;
}
