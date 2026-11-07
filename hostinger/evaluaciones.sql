CREATE TABLE evaluaciones (
  id CHAR(36) NOT NULL PRIMARY KEY,
  token_hash CHAR(64) NOT NULL,
  jurado VARCHAR(80) NOT NULL,
  fecha DATE NOT NULL,
  comision VARCHAR(120) NOT NULL DEFAULT '',
  delegacion VARCHAR(120) NOT NULL DEFAULT '',
  puntajes JSON NOT NULL,
  puntaje DECIMAL(6,2) NULL,
  fortaleza TEXT NOT NULL,
  observacion TEXT NOT NULL,
  candidata TINYINT(1) NULL,
  estado ENUM('borrador','final') NOT NULL DEFAULT 'borrador',
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_jurado_actualizado (jurado, actualizado),
  INDEX idx_delegacion (comision, delegacion)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
