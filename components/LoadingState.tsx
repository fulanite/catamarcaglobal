export function LoadingState({ label = "Cargando contenido" }: { label?: string }) {
  return (
    <div className="state-message" role="status" aria-live="polite">
      <span className="state-dot" aria-hidden />
      {label}
    </div>
  );
}
