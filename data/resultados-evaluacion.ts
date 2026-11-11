import { delegaciones } from "@/data/delegaciones";

export const jurados = ["Carmen", "Eugenia", "Ana Laura", "Marina"] as const;
export type Jurado = (typeof jurados)[number];

export type FichaGuardada = {
  id: string;
  jurado: string;
  fecha: string;
  comision: string;
  delegacion: string;
  puntajes: Record<string, number>;
  puntaje: number | null;
  fortaleza: string;
  observacion: string;
  candidata: boolean | null;
  estado: "borrador" | "final";
  creado: string;
  actualizado: string;
};

export type ResultadoDelegacion = {
  delegacion: string;
  porJurado: Partial<Record<Jurado, number>>;
  cantidad: number;
  suma: number;
  promedio: number | null;
};

export function calcularResultados(fichas: FichaGuardada[]): ResultadoDelegacion[] {
  const ultimas = new Map<string, FichaGuardada>();
  for (const ficha of fichas) {
    if (ficha.estado !== "final" || ficha.puntaje === null || !delegaciones.some((pais) => pais === ficha.delegacion) || !jurados.some((jurado) => jurado === ficha.jurado)) continue;
    const clave = `${ficha.delegacion}\u0000${ficha.jurado}`;
    const anterior = ultimas.get(clave);
    if (!anterior || ficha.actualizado > anterior.actualizado) ultimas.set(clave, ficha);
  }
  return delegaciones.map((delegacion) => {
    const porJurado: Partial<Record<Jurado, number>> = {};
    for (const jurado of jurados) {
      const ficha = ultimas.get(`${delegacion}\u0000${jurado}`);
      if (ficha) porJurado[jurado] = ficha.puntaje!;
    }
    const valores = Object.values(porJurado);
    const suma = valores.reduce((total, valor) => total + valor, 0);
    return { delegacion, porJurado, cantidad: valores.length, suma, promedio: valores.length ? suma / valores.length : null };
  }).sort((a, b) => (b.promedio ?? -1) - (a.promedio ?? -1) || a.delegacion.localeCompare(b.delegacion, "es"));
}
