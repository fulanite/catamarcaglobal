-- Ejecutar una vez sobre la base que ya contiene la tabla evaluaciones.
CREATE TABLE IF NOT EXISTS evaluacion_control (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  instancia CHAR(36) NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  iniciada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT IGNORE INTO evaluacion_control (id, instancia, nombre)
VALUES (1, UUID(), 'Demostración');

CREATE TABLE IF NOT EXISTS evaluaciones_historial (
  instancia CHAR(36) NOT NULL,
  instancia_nombre VARCHAR(120) NOT NULL,
  archivado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id CHAR(36) NOT NULL,
  jurado VARCHAR(80) NOT NULL,
  fecha DATE NOT NULL,
  comision VARCHAR(120) NOT NULL,
  delegacion VARCHAR(120) NOT NULL,
  puntajes JSON NOT NULL,
  puntaje DECIMAL(6,2) NULL,
  fortaleza TEXT NOT NULL,
  observacion TEXT NOT NULL,
  candidata TINYINT(1) NULL,
  estado ENUM('borrador','final') NOT NULL,
  creado TIMESTAMP NOT NULL,
  actualizado TIMESTAMP NOT NULL,
  PRIMARY KEY (instancia, id),
  INDEX idx_historial_fecha (fecha, archivado),
  INDEX idx_historial_instancia (instancia, fecha)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
