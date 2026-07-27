import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-status">
      <div className="container">
        <p className="eyebrow">Página no encontrada</p>
        <h1>Este contenido todavía no está disponible</h1>
        <p>
          Podés volver al inicio o navegar por las secciones institucionales de
          Catamarca Global.
        </p>
        <Link className="btn btn-primary" href="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
