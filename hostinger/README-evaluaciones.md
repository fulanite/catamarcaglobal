# Evaluación Modelo ONU en Hostinger

La carga y el tablero se encuentran en `/modelo-onu/evaluacion/coordinacion/`. Solo coordinación ingresa con clave. La ruta antigua `/modelo-onu/evaluacion/` conduce a esa pantalla y `/api/evaluaciones.php` rechaza escrituras públicas. La API activa es `/api/evaluaciones-admin.php` y guarda los resultados en MySQL.

## Instalación

1. Crear la base MySQL en Hostinger. Para una instalación nueva, importar `evaluaciones.sql` y después `evaluaciones-instancias.sql`. Una instalación anterior que ya tenga ambas tablas no necesita migración.
2. Guardar `cata-evaluacion-config.php` en la carpeta superior a `public_html`, con las credenciales de MySQL y el hash de la clave de coordinación. Nunca guardar secretos en Git ni en `public_html`.
3. Ejecutar `npm ci` y `npm run build`, y publicar **el contenido** de `out/`, incluidos los dos archivos PHP de `api/`. Si se publica mediante la rama estática de GitHub, verificar que Hostinger desplegó el commit nuevo.
4. Abrir la pantalla de coordinación, entrar con la clave, cargar una planilla de prueba, verificar el tablero y descargar un acta preliminar PDF. Después, archivar la instancia de prueba para conservarla en el historial y comenzar una nueva.

## Uso

- Se carga una ficha completa por jurado y delegación. Los jurados disponibles son Carmen, Eugenia, Ana Laura y Marina. El selector contiene 19 delegaciones, incluida Turquía.
- Cada ficha usa los diez criterios de la Ficha A. El puntaje sobre 100 se calcula como suma de `(calificación / 4) × peso`.
- El tablero muestra cada puntaje individual, la suma y el promedio de los jurados con fichas completas. Se ordena por promedio descendente; una delegación sin evaluaciones queda al final.
- El PDF es **preliminar** mientras falte alguna de las cuatro evaluaciones por delegación y se llama **acta final** cuando estén completas las 19 delegaciones. Se puede volver a descargar desde el historial de la instancia.
- Las fichas se pueden corregir o eliminar desde el listado. Una combinación de jurado y delegación no admite dos fichas nuevas dentro de la misma instancia.
- **Cerrar y empezar otra** mueve las fichas actuales al historial y crea una instancia vacía. Solicita nuevamente la clave de coordinación. Descargar el PDF y respaldar la base antes de cerrar la instancia real.
- **Eliminar todo el historial** borra únicamente las fichas de instancias archivadas. Exige escribir `ELIMINAR HISTORIAL` y volver a ingresar la clave de coordinación; el servidor comprueba que la cantidad de fichas no haya cambiado. La instancia activa y sus fichas permanecen intactas. Descargar el CSV o respaldar la base antes si se necesita conservarlas.
- **Eliminar fichas activas** borra todas las evaluaciones de la instancia actual, incluidas las cargadas desde el antiguo formulario del jurado. Exige escribir `ELIMINAR EVALUACIONES` y volver a ingresar la clave. No modifica el historial archivado ni crea una instancia nueva. Descargar el CSV o respaldar la base antes si se necesitan conservar esas fichas.
- **Cambiar clave** guarda únicamente el hash en `cata-evaluacion-admin.hash`, junto al archivo de configuración y fuera de `public_html`.
