# Evaluación Modelo ONU en Hostinger

La página `/modelo-onu/evaluacion/` usa archivos estáticos del sitio y la API PHP `/api/evaluaciones.php`. Las fichas se guardan en MariaDB/MySQL. Coordinación consulta todas las fichas en `/modelo-onu/evaluacion/coordinacion/`, mediante `/api/evaluaciones-admin.php`. La base y las claves nunca deben quedar dentro de `public_html` ni en Git.

## Preparación

1. En hPanel, abrir **Sitios web → Administrar → Bases de datos → Administración** y crear una base y su usuario. Guardar nombre, usuario, contraseña y servidor.
2. Abrir phpMyAdmin de esa base e importar `evaluaciones.sql` y luego `evaluaciones-instancias.sql`. Si la tabla `evaluaciones` ya existe, importar solamente `evaluaciones-instancias.sql` para habilitar demostraciones e historial.
3. Elegir una clave fuerte y exclusiva para coordinación (mínimo 16 caracteres). En un equipo con PHP CLI, ejecutar `php hostinger/generar-hash-admin.php`; escribir la clave cuando el programa la pida y copiar **solo el hash** resultante. No escribir la clave en un comando ni guardarla en Git.
4. Copiar `cata-evaluacion-config.example.php` como `cata-evaluacion-config.php` en la carpeta **superior a `public_html`**, y completar el usuario y la contraseña de la base y `admin_password_hash`. Para una web PHP alojada en Hostinger, usar `localhost` como host; el servidor `127.0.0.1:3306` que muestra phpMyAdmin no necesariamente es la dirección que debe usar la web. El archivo de ejemplo no contiene secretos válidos. Si Hostinger despliega desde GitHub, esta ubicación evita que el despliegue sobrescriba el archivo privado.
5. Ejecutar `npm ci` y `npm run build` en el proyecto. Subir **el contenido** de `out/` a `public_html`, incluidos `api/evaluaciones.php` y `api/evaluaciones-admin.php`. Si se usa la rama estática de GitHub, confirmar que Hostinger efectivamente desplegó el commit nuevo; subir el código a GitHub por sí solo no prueba que esté publicado. Comprobar que Hostinger ejecute PHP y que el dominio use HTTPS.
6. Abrir `/modelo-onu/evaluacion/`, crear una ficha de prueba con el nombre del jurado y esperar a que indique **Sin cambios pendientes**. Abrir `/modelo-onu/evaluacion/coordinacion/`, ingresar con la clave de coordinación y confirmar que aparece la ficha, sus diez criterios y el puntaje. Descargar el CSV de prueba y verificarlo. Borrar la ficha de prueba desde phpMyAdmin antes de la jornada si corresponde.

Si el dominio sigue sirviendo el sitio desde otro proveedor, la API PHP de Hostinger no estará en el mismo origen. En ese caso hay que mover la versión estática a Hostinger o definir una ruta proxy antes de usar la app.

## Operación

- No hay cuentas ni claves de jurado. Cada ficha incluye el nombre que escribe la persona. El dispositivo conserva sus propias fichas y una clave técnica aleatoria para poder editarlas; esa clave no se pide al jurado.
- La ficha se guarda localmente al editar y se sincroniza con la base cuando hay conexión. El indicador superior confirma el estado. Antes de cerrar el día, verificar **Sin cambios pendientes**.
- El resultado se calcula solo cuando los diez criterios tienen calificación: suma de `(calificación / 4) × peso`.
- Una ficha final necesita delegación, comisión, fecha y diez criterios. Las observaciones y la candidatura son opcionales.
- El selector contiene 18 delegaciones: las 16 de las credenciales de 49 alumnos más Afganistán y Ucrania, incorporadas en los carteles y banderines posteriores. Para actualizarlo, editar `data/delegaciones.ts` y la lista de validación de `public/api/evaluaciones.php`, y recompilar antes de subir el sitio.
- Hacer un respaldo de la base antes y después de la jornada. Se puede exportar un CSV desde phpMyAdmin; no reemplaza el respaldo.
- Los datos locales del navegador son solo una reserva temporal. No borrar datos del navegador mientras haya fichas pendientes. Una ficha guardada solo puede reabrirse desde el mismo navegador; coordinación puede revisar todas las recibidas en su panel o en phpMyAdmin.
- En coordinación, **Cerrar y empezar otra** mueve las fichas actuales al historial y crea una instancia nueva con el contador en cero. El historial se agrupa por fecha de evaluación y nombre de instancia, y se puede descargar en CSV.
- Antes de cerrar una instancia, comprobar que los teléfonos indiquen **Sin cambios pendientes**. Las fichas que aún no llegaron a MySQL no pueden archivarse. El servidor rechaza los envíos de una instancia anterior; el teléfono conserva sus fichas anteriores separadas de la nueva instancia.

Sin autenticación, cualquier persona que acceda al formulario puede enviar una ficha nueva. El listado completo y el CSV requieren la clave de coordinación; esa clave se verifica en PHP y no se incluye en la web. La sesión de coordinación vence a las 8 horas. La contraseña debe compartirse solo con quienes coordinan y conviene cambiarla después de la jornada. El formulario público admite envíos sin cuenta: coordinación debe revisar las fichas recibidas antes de usar resultados.

La guía plantea además una posible combinación 70 % delegación y 30 % contribuciones individuales, pero no define una ficha individual. Esta versión implementa únicamente la Ficha A de delegaciones y no calcula premios ni rankings automáticamente.
