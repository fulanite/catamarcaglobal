"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { criterios, puntajeTotal, type Puntajes } from "@/data/evaluacion";
import { delegaciones } from "@/data/delegaciones";
import { calcularResultados, jurados, type FichaGuardada } from "@/data/resultados-evaluacion";
import { descargarActa } from "@/components/actaEvaluacion";

type Ficha = FichaGuardada;
type HistorialFicha = Ficha & { instancia: string; instancia_nombre: string; archivado: string };
type Instancia = { instancia: string; nombre: string; iniciada: string };
type Borrador = { id: string | null; jurado: string; fecha: string; comision: string; delegacion: string; puntajes: Puntajes; fortaleza: string; observacion: string; candidata: boolean | null };

type ApiResponse = { ok?: boolean; fichas?: Ficha[]; historial?: HistorialFicha[]; instancia?: Instancia; archivadas?: number; id?: string; error?: string };
const endpoint = "/api/evaluaciones-admin.php";
const formatter = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });
const niveles = ["Inicial", "En desarrollo", "Logrado", "Destacado"];

function nuevoBorrador(): Borrador {
  return { id: null, jurado: "", fecha: new Date().toLocaleDateString("en-CA"), comision: "Asamblea General", delegacion: "", puntajes: {}, fortaleza: "", observacion: "", candidata: null };
}

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

function FichaItem({ ficha, onEdit, onDelete }: { ficha: Ficha; onEdit?: (ficha: Ficha) => void; onDelete?: (ficha: Ficha) => void }) {
  return <details className="coord-ficha"><summary><span className="coord-ficha-main"><strong>{ficha.delegacion || "Delegación pendiente"}</strong><small>{ficha.comision || "Comisión pendiente"} · {ficha.jurado} · {ficha.fecha}</small></span><span className="coord-ficha-end"><strong>{ficha.puntaje === null ? "—" : formatter.format(ficha.puntaje)} <small>/ 100</small></strong><em className={ficha.estado === "final" ? "coord-final" : "coord-draft"}>{ficha.estado === "final" ? "Final" : "Borrador"}</em></span></summary><div className="coord-detail"><div className="coord-detail-grid">{criterios.map((criterio) => <div key={criterio.id}><span>{criterio.nombre} <small>({criterio.peso} %)</small></span><strong>{ficha.puntajes[criterio.id] ?? "—"} / 4</strong></div>)}</div><div className="coord-detail-notes"><p><strong>Fortaleza:</strong> {ficha.fortaleza || "Sin observación"}</p><p><strong>Observación:</strong> {ficha.observacion || "Sin observación"}</p><p><strong>Candidata a mejor delegación:</strong> {ficha.candidata === null ? "Sin marcar" : ficha.candidata ? "Sí" : "No"}</p><small>Última actualización: {ficha.actualizado}</small></div>{onEdit && <div className="coord-item-actions"><button className="coord-secondary" type="button" onClick={() => onEdit(ficha)}>Editar ficha</button><button className="coord-text" type="button" onClick={() => onDelete?.(ficha)}>Eliminar</button></div>}</div></details>;
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
  const [mostrarCambio, setMostrarCambio] = useState(false);
  const [claveActual, setClaveActual] = useState("");
  const [claveNueva, setClaveNueva] = useState("");
  const [claveConfirmacion, setClaveConfirmacion] = useState("");
  const [claveError, setClaveError] = useState("");
  const [borrador, setBorrador] = useState<Borrador>(() => nuevoBorrador());
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [formError, setFormError] = useState("");
  const [actaBusy, setActaBusy] = useState(false);

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
      setMostrarCambio(false);
      setClaveActual("");
      setClaveNueva("");
      setClaveConfirmacion("");
    } catch {
      setMessage("No se pudo cerrar la sesión. Probá nuevamente.");
    }
  }

  function editarFicha(ficha: Ficha) {
    setBorrador({ id: ficha.id, jurado: ficha.jurado, fecha: ficha.fecha, comision: ficha.comision, delegacion: ficha.delegacion, puntajes: ficha.puntajes as Puntajes, fortaleza: ficha.fortaleza, observacion: ficha.observacion, candidata: ficha.candidata });
    setFormError("");
    setFormularioAbierto(true);
    window.setTimeout(() => document.getElementById("carga-evaluacion")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  async function guardarFicha(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!instancia || busy) return;
    if (puntajeTotal(borrador.puntajes) === null) { setFormError("Completá los diez criterios antes de guardar."); return; }
    setBusy(true);
    setFormError("");
    try {
      const { status, data } = await request("POST", { action: "guardar_ficha", instancia: instancia.instancia, ...borrador });
      if (status !== 200 || data.ok !== true) { setFormError(data.error || "No se pudo guardar la ficha."); return; }
      await load();
      setBorrador(nuevoBorrador());
      setFormularioAbierto(false);
      setMessage("Resultado guardado en la base de datos.");
    } catch { setFormError("No se pudo conectar con el servidor."); }
    finally { setBusy(false); }
  }

  async function eliminarFicha(ficha: Ficha) {
    if (!instancia || busy || !window.confirm(`¿Eliminar la ficha de ${ficha.jurado} para ${ficha.delegacion}?`)) return;
    setBusy(true);
    try {
      const { status, data } = await request("POST", { action: "eliminar_ficha", instancia: instancia.instancia, id: ficha.id });
      if (status !== 200 || data.ok !== true) { setMessage(data.error || "No se pudo eliminar la ficha."); return; }
      await load();
      setMessage("Ficha eliminada.");
    } catch { setMessage("No se pudo conectar con el servidor."); }
    finally { setBusy(false); }
  }

  async function generarActa(nombre: string, iniciada: string, lista: Ficha[]) {
    if (actaBusy) return;
    setActaBusy(true);
    try { await descargarActa(nombre, iniciada, lista); }
    catch { setMessage("No se pudo generar el PDF. Probá nuevamente."); }
    finally { setActaBusy(false); }
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

  async function cambiarClave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (claveNueva !== claveConfirmacion) { setClaveError("Las dos versiones de la nueva clave no coinciden."); return; }
    setBusy(true);
    setClaveError("");
    try {
      const { status, data } = await request("POST", { action: "cambiar_clave", actual: claveActual, nueva: claveNueva, confirmacion: claveConfirmacion });
      if (status !== 200 || data.ok !== true) { setClaveError(data.error || "No se pudo cambiar la clave."); return; }
      setClaveActual("");
      setClaveNueva("");
      setClaveConfirmacion("");
      setMostrarCambio(false);
      setFichas([]);
      setHistorial([]);
      setInstancia(null);
      setAccess("login");
      setMessage("Clave actualizada. Ingresá con la nueva clave.");
    } catch { setClaveError("No se pudo conectar con el servidor."); }
    finally { setBusy(false); }
  }

  const visible = useMemo(() => fichas.filter((ficha) => {
    if (estado !== "todos" && ficha.estado !== estado) return false;
    const search = `${ficha.jurado} ${ficha.comision} ${ficha.delegacion}`.toLocaleLowerCase("es-AR");
    return search.includes(query.trim().toLocaleLowerCase("es-AR"));
  }), [fichas, query, estado]);
  const resultados = useMemo(() => calcularResultados(fichas), [fichas]);
  const evaluacionesCargadas = resultados.reduce((total, fila) => total + fila.cantidad, 0);
  const completa = resultados.every((fila) => fila.cantidad === jurados.length);
  const criteriosCompletos = criterios.filter((criterio) => borrador.puntajes[criterio.id]).length;
  const puntajeBorrador = puntajeTotal(borrador.puntajes);
  const gruposHistorial = useMemo(() => {
    const grupos = new Map<string, { clave: string; titulo: string; iniciada: string; fichas: HistorialFicha[] }>();
    for (const ficha of historial) {
      const clave = ficha.instancia;
      if (!grupos.has(clave)) grupos.set(clave, { clave, titulo: ficha.instancia_nombre, iniciada: ficha.fecha, fichas: [] });
      grupos.get(clave)!.fichas.push(ficha);
    }
    return [...grupos.values()];
  }, [historial]);

  return <div className="coord-page"><div className="coord-shell">
    <div className="coord-top"><span>CATAMARCA GLOBAL · MODELO ONU</span><a href="/modelo-onu/">Volver al programa</a></div>
    <header className="coord-header"><span className="eval-kicker">Acceso de coordinación</span><h1>Resultados de evaluación</h1><p>Cargá las planillas físicas, seguí los promedios y generá el acta de cada instancia.</p></header>
    {access === "loading" && <p className="coord-panel" role="status">Cargando fichas…</p>}
    {access === "error" && <div className="coord-panel"><p role="alert">{message}</p><button className="coord-secondary" type="button" onClick={() => { setAccess("loading"); void load(); }}>Reintentar</button></div>}
    {access === "login" && <form className="coord-panel coord-login" onSubmit={(event) => void login(event)}><h2>Ingresar a coordinación</h2><p>Desde acá se cargan las planillas, se consultan los resultados y se administran las instancias.</p><label>Clave de coordinación<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label><button className="coord-primary" type="submit" disabled={busy}>{busy ? "Ingresando…" : "Ingresar"}</button>{message && <p className={message.startsWith("Clave actualizada") ? "coord-notice" : "coord-error"} role="status">{message}</p>}</form>}
    {access === "ready" && <>
      <p className="coord-instance">Instancia activa: <strong>{instancia?.nombre}</strong> · desde {instancia?.iniciada?.slice(0, 10)}</p>
      <div className="coord-overview"><div><strong>{evaluacionesCargadas}</strong><span>Resultados cargados</span></div><div><strong>{resultados.filter((fila) => fila.cantidad > 0).length}</strong><span>Delegaciones evaluadas</span></div><div><strong>{resultados.filter((fila) => fila.cantidad === jurados.length).length}/{delegaciones.length}</strong><span>Delegaciones completas</span></div></div>
      <section className="coord-panel" aria-labelledby="resultados-heading">
        <div className="coord-toolbar"><div><h2 id="resultados-heading">Resultados por delegación</h2><p>Ordenados por promedio. Cada jurado aporta una ficha por delegación.</p></div><div className="coord-toolbar-actions"><button className="coord-primary coord-toolbar-primary" type="button" onClick={() => { setBorrador(nuevoBorrador()); setFormError(""); setFormularioAbierto(true); document.getElementById("carga-evaluacion")?.scrollIntoView({ behavior: "smooth" }); }}>+ Cargar planilla</button><button className="coord-secondary" type="button" onClick={() => void generarActa(instancia!.nombre, instancia!.iniciada, fichas)} disabled={!evaluacionesCargadas || actaBusy}>{actaBusy ? "Generando…" : completa ? "Generar acta final PDF" : "Ver acta preliminar PDF"}</button></div></div>
        {!completa && <p className="coord-pending">Faltan {delegaciones.length * jurados.length - evaluacionesCargadas} evaluaciones para completar las {delegaciones.length} delegaciones con los cuatro jurados. El PDF se marca como preliminar hasta entonces.</p>}
        <div className="coord-table-wrap"><table className="coord-results"><thead><tr><th scope="col">#</th><th scope="col">Delegación</th>{jurados.map((jurado) => <th scope="col" key={jurado}>{jurado}</th>)}<th scope="col">Suma</th><th scope="col">Promedio</th><th scope="col">Cargadas</th></tr></thead><tbody>{resultados.map((fila, index) => <tr key={fila.delegacion}><td>{fila.promedio === null ? "—" : index + 1}</td><th scope="row">{fila.delegacion}</th>{jurados.map((jurado) => <td key={jurado}>{fila.porJurado[jurado] === undefined ? "—" : formatter.format(fila.porJurado[jurado])}</td>)}<td>{fila.cantidad ? formatter.format(fila.suma) : "—"}</td><td><strong>{fila.promedio === null ? "—" : formatter.format(fila.promedio)}</strong></td><td>{fila.cantidad}/{jurados.length}</td></tr>)}</tbody></table></div>
      </section>
      <section id="carga-evaluacion" className="coord-panel coord-entry" aria-labelledby="carga-heading"><div className="coord-toolbar"><div><h2 id="carga-heading">{borrador.id ? "Editar resultado" : "Cargar planilla física"}</h2><p>Seleccioná el jurado y la delegación; el puntaje se calcula sobre 100.</p></div>{!formularioAbierto && <button className="coord-secondary" type="button" onClick={() => setFormularioAbierto(true)}>Abrir formulario</button>}</div>
        {formularioAbierto && <form onSubmit={(event) => void guardarFicha(event)}>
          <div className="eval-fields"><label>Jurado<select value={borrador.jurado} onChange={(event) => setBorrador((actual) => ({ ...actual, jurado: event.target.value }))} required><option value="">Seleccioná un jurado</option>{jurados.map((jurado) => <option key={jurado} value={jurado}>{jurado}</option>)}</select></label><label>Delegación<select value={borrador.delegacion} onChange={(event) => setBorrador((actual) => ({ ...actual, delegacion: event.target.value }))} required><option value="">Seleccioná una delegación</option>{delegaciones.map((pais) => <option key={pais} value={pais}>{pais}</option>)}</select></label><label>Comisión<input value={borrador.comision} maxLength={120} onChange={(event) => setBorrador((actual) => ({ ...actual, comision: event.target.value }))} required /></label><label>Fecha<input type="date" value={borrador.fecha} onChange={(event) => setBorrador((actual) => ({ ...actual, fecha: event.target.value }))} required /></label></div>
          {fichas.some((ficha) => ficha.id !== borrador.id && ficha.jurado === borrador.jurado && ficha.delegacion === borrador.delegacion) && <p className="coord-pending">Ya hay una ficha para esta combinación. Buscala abajo y editá la existente.</p>}
          <div className="coord-entry-head"><strong>{criteriosCompletos} de {criterios.length} criterios</strong><strong>{puntajeBorrador === null ? "—" : formatter.format(puntajeBorrador)} / 100</strong></div>
          <div className="eval-criteria">{criterios.map((criterio, index) => <fieldset className="eval-card" key={criterio.id}><legend><span className="eval-card-num">{String(index + 1).padStart(2, "0")}</span><span>{criterio.nombre}</span><em>{criterio.peso} %</em></legend><p>{criterio.ayuda}</p><div className="eval-options" role="radiogroup" aria-label={criterio.nombre}>{niveles.map((nivel, i) => { const valor = (i + 1) as 1 | 2 | 3 | 4; return <label key={valor} className={borrador.puntajes[criterio.id] === valor ? "is-selected" : ""}><input type="radio" name={criterio.id} checked={borrador.puntajes[criterio.id] === valor} onChange={() => setBorrador((actual) => ({ ...actual, puntajes: { ...actual.puntajes, [criterio.id]: valor } }))} /><strong>{valor}</strong><span>{nivel}</span></label>; })}</div></fieldset>)}</div>
          <div className="eval-notes"><h3>Observaciones de la planilla</h3><label>Fortaleza principal<textarea rows={2} maxLength={1000} value={borrador.fortaleza} onChange={(event) => setBorrador((actual) => ({ ...actual, fortaleza: event.target.value }))} /></label><label>Observación relevante<textarea rows={3} maxLength={2000} value={borrador.observacion} onChange={(event) => setBorrador((actual) => ({ ...actual, observacion: event.target.value }))} /></label><fieldset><legend>¿Candidata a mejor delegación?</legend><div className="eval-choice"><label><input type="radio" name="candidata-coord" checked={borrador.candidata === true} onChange={() => setBorrador((actual) => ({ ...actual, candidata: true }))} /> Sí</label><label><input type="radio" name="candidata-coord" checked={borrador.candidata === false} onChange={() => setBorrador((actual) => ({ ...actual, candidata: false }))} /> No</label></div></fieldset></div>
          {formError && <p className="coord-error" role="alert">{formError}</p>}
          <div className="coord-entry-actions"><button className="coord-primary" type="submit" disabled={busy}>{busy ? "Guardando…" : borrador.id ? "Guardar cambios" : "Guardar resultado"}</button><button className="coord-text" type="button" onClick={() => { setBorrador(nuevoBorrador()); setFormularioAbierto(false); setFormError(""); }}>Cancelar</button></div>
        </form>}
      </section>
      <section className="coord-panel"><div className="coord-toolbar"><div><h2>Planillas cargadas</h2><p>{visible.length} de {fichas.length} fichas visibles</p></div><div className="coord-toolbar-actions"><button className="coord-secondary" type="button" onClick={() => void load()}>Actualizar</button><button className="coord-secondary" type="button" onClick={() => exportCsv(fichas, "evaluaciones-modelo-onu")} disabled={!fichas.length}>Descargar CSV</button><button className="coord-text" type="button" onClick={() => void logout()}>Salir</button></div></div>{message && <p className="coord-notice" role="status">{message}</p>}
        <div className="coord-filters"><label>Buscar<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Jurado, comisión o delegación" /></label><label>Estado<select value={estado} onChange={(event) => setEstado(event.target.value)}><option value="todos">Todos</option><option value="final">Finalizadas</option><option value="borrador">Borradores</option></select></label></div>
        {visible.length ? <div className="coord-list">{visible.map((ficha) => <FichaItem ficha={ficha} key={ficha.id} onEdit={editarFicha} onDelete={(item) => void eliminarFicha(item)} />)}</div> : <p className="coord-empty">No hay fichas que coincidan con los filtros.</p>}
      </section>
      <section className="coord-panel coord-cycle"><h2>Cerrar esta instancia</h2><p>Las {fichas.length} fichas actuales pasarán al historial y comenzará una instancia nueva. Podrás volver a descargar el acta de la instancia cerrada.</p>
        {!cerrando ? <button className="coord-secondary" type="button" onClick={() => { setNombreArchivo(instancia?.nombre || "Demostración"); setNombreNueva("Evaluación del Modelo ONU"); setCerrando(true); setMessage(""); }}>Cerrar y empezar otra</button> : <form className="coord-close-form" onSubmit={(event) => void cerrarInstancia(event)}><label>Nombre de esta instancia en el historial<input value={nombreArchivo} maxLength={120} onChange={(event) => setNombreArchivo(event.target.value)} required /></label><label>Nombre de la nueva instancia<input value={nombreNueva} maxLength={120} onChange={(event) => setNombreNueva(event.target.value)} required /></label><label>Confirmá con la clave de coordinación<input type="password" autoComplete="current-password" value={claveCierre} onChange={(event) => setClaveCierre(event.target.value)} required /></label><label className="coord-check"><input type="checkbox" checked={confirmado} onChange={(event) => setConfirmado(event.target.checked)} required /><span>Confirmo que quiero archivar {fichas.length} fichas y comenzar de cero.</span></label><div className="coord-close-actions"><button className="coord-primary" type="submit" disabled={busy || !confirmado}>{busy ? "Archivando…" : "Archivar y empezar"}</button><button className="coord-text" type="button" onClick={() => { setCerrando(false); setClaveCierre(""); setMessage(""); }}>Cancelar</button></div></form>}
      </section>
      <section className="coord-panel coord-history"><div className="coord-toolbar"><div><h2>Historial de instancias</h2><p>{historial.length} fichas archivadas</p></div><button className="coord-secondary" type="button" onClick={() => exportCsv(historial, "historial-modelo-onu", true)} disabled={!historial.length}>Descargar historial CSV</button></div>
        {gruposHistorial.length ? <div className="coord-history-groups">{gruposHistorial.map((grupo) => <details key={grupo.clave} className="coord-history-group"><summary><strong>{grupo.titulo}</strong><span>{grupo.fichas.length} ficha{grupo.fichas.length === 1 ? "" : "s"}</span></summary><div className="coord-history-body"><button className="coord-secondary" type="button" onClick={() => void generarActa(grupo.titulo, grupo.iniciada, grupo.fichas)} disabled={actaBusy}>Descargar acta PDF</button><div className="coord-list">{grupo.fichas.map((ficha) => <FichaItem ficha={ficha} key={`${ficha.instancia}-${ficha.id}`} />)}</div></div></details>)}</div> : <p className="coord-empty">Todavía no hay instancias archivadas.</p>}
      </section>
      <section className="coord-panel coord-cycle"><h2>Clave de coordinación</h2><p>Podés usar una frase que recuerdes fácilmente. Debe tener al menos 16 caracteres; las palabras y los espacios cuentan.</p>
        {!mostrarCambio ? <button className="coord-secondary" type="button" onClick={() => { setMostrarCambio(true); setClaveError(""); }}>Cambiar clave</button> : <form className="coord-close-form" onSubmit={(event) => void cambiarClave(event)}><label>Clave actual<input type="password" autoComplete="current-password" value={claveActual} onChange={(event) => setClaveActual(event.target.value)} required /></label><label>Nueva clave<input type="password" autoComplete="new-password" minLength={16} value={claveNueva} onChange={(event) => setClaveNueva(event.target.value)} required /></label><label>Repetí la nueva clave<input type="password" autoComplete="new-password" minLength={16} value={claveConfirmacion} onChange={(event) => setClaveConfirmacion(event.target.value)} required /></label>{claveError && <p className="coord-error" role="alert">{claveError}</p>}<div className="coord-close-actions"><button className="coord-primary" type="submit" disabled={busy}>{busy ? "Guardando…" : "Guardar nueva clave"}</button><button className="coord-text" type="button" onClick={() => { setMostrarCambio(false); setClaveActual(""); setClaveNueva(""); setClaveConfirmacion(""); setClaveError(""); }}>Cancelar</button></div></form>}
      </section>
    </>}
  </div></div>;
}
