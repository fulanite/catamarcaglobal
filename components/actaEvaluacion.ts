import { calcularResultados, jurados, type FichaGuardada } from "@/data/resultados-evaluacion";

function numero(valor: number | null | undefined) {
  return valor === null || valor === undefined ? "-" : valor.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function logoBase64(): Promise<string | null> {
  try {
    const response = await fetch("/brand/logo-catamarca-global.png");
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  } catch { return null; }
}

export async function descargarActa(nombre: string, iniciada: string, fichas: FichaGuardada[]) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const resultados = calcularResultados(fichas);
  const completa = resultados.every((fila) => fila.cantidad === jurados.length);
  const logo = await logoBase64();
  if (logo) doc.addImage(logo, "PNG", 14, 12, 43, 15);
  doc.setTextColor(40, 16, 95);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text(completa ? "ACTA FINAL DE RESULTADOS" : "ACTA PRELIMINAR DE RESULTADOS", 14, 36);
  doc.setFontSize(10);
  doc.text("Modelo de Naciones Unidas · Catamarca Global", 14, 43);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(55, 55, 65);
  doc.setFontSize(9);
  doc.text(`Instancia: ${nombre}`, 14, 50);
  doc.text(`Inicio: ${iniciada.slice(0, 10)}    Emisión: ${new Date().toLocaleString("es-AR")}`, 14, 55);

  const widths = [10, 43, 20, 20, 21, 20, 24, 24];
  const headers = ["N°", "Delegación", ...jurados, "Suma", "Promedio"];
  const startX = 14;
  let y = 62;
  doc.setFillColor(40, 16, 95);
  doc.rect(startX, y, 182, 9, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.2);
  let x = startX;
  headers.forEach((header, index) => {
    doc.text(header, x + 2, y + 5.8);
    x += widths[index];
  });
  y += 9;
  doc.setFontSize(8);
  resultados.forEach((fila, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(248, 245, 251);
      doc.rect(startX, y, 182, 8, "F");
    }
    doc.setTextColor(45, 34, 60);
    doc.setFont("helvetica", index < 3 && fila.promedio !== null ? "bold" : "normal");
    const valores = [fila.promedio === null ? "-" : String(index + 1), fila.delegacion,
      ...jurados.map((jurado) => numero(fila.porJurado[jurado])), numero(fila.promedio === null ? null : fila.suma), numero(fila.promedio)];
    let cellX = startX;
    valores.forEach((valor, column) => {
      doc.text(valor, cellX + 2, y + 5.2);
      cellX += widths[column];
    });
    y += 8;
  });

  doc.setTextColor(65, 55, 75);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  y += 8;
  doc.text("Orden: promedio de los puntajes finales disponibles de cada jurado (sobre 100).", 14, y);
  doc.text("Suma: total de los puntajes cargados. Cada criterio se pondera según la Ficha A.", 14, y + 5);
  if (!completa) {
    const pendientes = resultados.filter((fila) => fila.cantidad < jurados.length).length;
    doc.setTextColor(163, 38, 66);
    doc.setFont("helvetica", "bold");
    doc.text(`Acta preliminar: ${pendientes} delegación${pendientes === 1 ? "" : "es"} con evaluaciones pendientes.`, 14, y + 12);
  }
  doc.setDrawColor(160, 145, 180);
  doc.line(14, 272, 86, 272);
  doc.line(124, 272, 196, 272);
  doc.setTextColor(80, 70, 90);
  doc.setFont("helvetica", "normal");
  doc.text("Coordinación", 14, 278);
  doc.text("Firma y aclaración", 124, 278);
  doc.setFontSize(7);
  doc.text("Catamarca Global · Acta generada desde el sistema de evaluación", 14, 289);
  const archivo = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "modelo-onu";
  doc.save(`acta-${archivo}.pdf`);
}
