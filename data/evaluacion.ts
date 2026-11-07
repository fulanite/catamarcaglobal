export const criterios = [
  { id: "negociacion", nombre: "Negociación y consensos", peso: 18, ayuda: "Busca aliados, escucha, negocia y construye acuerdos." },
  { id: "preparacion", nombre: "Preparación e investigación", peso: 14, ayuda: "Conoce el Estado, la problemática, su contexto y alianzas." },
  { id: "representacion", nombre: "Representación del Estado", peso: 14, ayuda: "Defiende la posición e intereses del país asignado." },
  { id: "argumentacion", nombre: "Argumentación", peso: 14, ayuda: "Fundamenta posiciones y responde con coherencia." },
  { id: "comunicacion", nombre: "Comunicación diplomática", peso: 10, ayuda: "Comunica con claridad, pertinencia y respeto." },
  { id: "procedimiento", nombre: "Procedimiento parlamentario", peso: 10, ayuda: "Aplica adecuadamente las reglas y los tiempos del Modelo." },
  { id: "equipo", nombre: "Trabajo en equipo", peso: 9, ayuda: "Distribuye roles, coopera y coordina la delegación." },
  { id: "resolucion", nombre: "Aporte a la resolución", peso: 5, ayuda: "Propone soluciones pertinentes y viables." },
  { id: "vestimenta", nombre: "Presentación y originalidad en vestimenta", peso: 3, ayuda: "Pertinencia y creatividad, sin valorar el costo económico." },
  { id: "redactora", nombre: "Participación en la Comisión Redactora", peso: 3, ayuda: "Contribuciones efectivas; considerar los cupos y oportunidades de participación." },
] as const;

export type CriterioId = (typeof criterios)[number]["id"];
export type Puntajes = Partial<Record<CriterioId, 1 | 2 | 3 | 4>>;

export function puntajeTotal(puntajes: Puntajes): number | null {
  if (criterios.some((criterio) => !puntajes[criterio.id])) return null;
  return criterios.reduce((total, criterio) => total + (puntajes[criterio.id]! / 4) * criterio.peso, 0);
}
