# Handoff para Codex: web de Catamarca Global

Fecha de corte: 2026-08-04

Este archivo es para que otro Codex pueda continuar el proyecto en otra computadora sin tener que reconstruir todo el contexto.

## Contexto rapido

- La web esta en `site/`. La carpeta madre contiene documentos fuente institucionales en `.docx`, `.pdf` y `.xlsx`.
- `site/` es el repositorio Git real. La carpeta madre no es un repo Git.
- Rama actual: `main`.
- Ultimo commit registrado: `aa020e4 Build Catamarca Global institutional site`.
- Estado local al crear este handoff: `git status --short` limpio dentro de `site/`.
- Stack: Next.js App Router, React 19, TypeScript, CSS global, Tailwind/PostCSS, Vinext/Vite y Cloudflare Workers/Sites.
- Version de Node requerida por `package.json`: `>=22.12.0`.

## Primeros pasos en otra compu

Abrir una terminal dentro de `site/` y correr:

```bash
npm ci
npm run dev
```

Para variables de entorno:

```bash
# macOS/Linux
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
```

Variables actuales sugeridas:

```bash
NEXT_PUBLIC_SITE_URL=https://catamarca-global.example
SITE_CONTACT_EMAIL=
FORM_ENDPOINT=
```

Antes de publicar o entregar cambios:

```bash
npm run lint
npm run build
npm test
```

## Comandos utiles

- `npm run dev`: levanta el sitio en modo desarrollo con Vinext.
- `npm run lint`: ejecuta ESLint.
- `npm run build`: compila el sitio.
- `npm test`: corre build y luego `tests/rendered-html.test.mjs`.
- `npm run db:generate`: genera migraciones Drizzle si se toca esquema de base de datos.

## Mapa del proyecto

- `app/`: rutas principales del sitio.
- `app/page.tsx`: home.
- `app/quienes-somos/page.tsx`: presentacion institucional.
- `app/identidad/page.tsx`: mision, vision, valores y objetivos.
- `app/areas/page.tsx`: vocalias y areas de trabajo.
- `app/proyectos/page.tsx`: explorador de proyectos.
- `app/modelo-onu/page.tsx`: pagina especifica de Modelo ONU.
- `app/equipo/page.tsx`: comision directiva y vocalias.
- `app/novedades/page.tsx`: novedades editables.
- `app/alianzas/page.tsx`: alianzas institucionales.
- `app/sumate/page.tsx`: participacion y voluntariado.
- `app/contacto/page.tsx`: contacto.
- `components/`: header, menu movil, cards, botones, formularios, CTA, estados e iconos.
- `data/`: contenido institucional editable separado de la UI.
- `public/brand/`: logos y recursos de marca.
- `tests/`: pruebas de HTML renderizado.
- `.openai/hosting.json`: configuracion de OpenAI Sites.

## Archivos de contenido

Editar primero estos archivos cuando el cambio sea de texto o informacion institucional:

- `data/site.ts`: configuracion general, mision, vision, objetivos, contacto, opciones de participacion y alianzas editables.
- `data/team.ts`: miembros de Comision Directiva y vocalias.
- `data/areas.ts`: responsables, funciones y lineas de accion por vocalia.
- `data/projects.ts`: proyectos, estados, categorias, filtros y notas editables.
- `data/news.ts`: novedades.
- `data/values.ts`: valores institucionales.

Leer tambien:

- `README.md`: instalacion, estructura y notas operativas.
- `CONTENT_GUIDE.md`: reglas de redaccion y criterio para no inventar datos.
- `DESIGN_SYSTEM.md`: paleta, tipografias, componentes y responsive.

## Fuentes institucionales en la carpeta madre

La carpeta superior incluye material que sirve como fuente de contenido:

- Carpeta de mision, vision, valores y objetivos.
- `ORGANIGRAMA/Organigrama.docx`
- Carpeta de voluntariado.
- Carpeta de pasantias.
- Carpeta de minutas de reuniones.
- `Proyectos a Futuro_.docx`
- `MODELO ONU/` con reglamentos, capacitaciones, Gantt y guias.
- `logo catamarca global.png`

Si el shell muestra mal los acentos de rutas en Windows, listar nombres exactos con `rg --files` desde la carpeta madre.

Usar estos documentos como referencia, pero no publicar nombres, fechas, cargos, sedes, cifras, alianzas o resultados sin confirmacion explicita.

## Pendientes detectados

- Completar correo institucional, redes y dominio final.
- Definir o conectar el envio real del formulario de contacto. Hoy valida datos en cliente, pero `FORM_ENDPOINT` esta vacio.
- Reemplazar novedades placeholder en `data/news.ts` por actividades confirmadas.
- Completar o confirmar estados de proyectos en `data/projects.ts`.
- Agregar fotos reales autorizadas de equipo solo cuando existan. No generar rostros para personas reales.
- Revisar textos finales con Catamarca Global antes de publicar.
- Configurar `NEXT_PUBLIC_SITE_URL` con el dominio real antes del despliegue.

## Despliegue

El proyecto tiene `.openai/hosting.json` con:

```json
{
  "project_id": "appgprj_6a676ae8b33c8191962da170d428bc55",
  "d1": null,
  "r2": null
}
```

Si se usa OpenAI Sites, reutilizar ese `project_id`. No crear otro proyecto de hosting para esta misma web salvo indicacion explicita.

Antes de desplegar:

1. Correr `npm run lint`.
2. Correr `npm run build`.
3. Correr `npm test`.
4. Revisar placeholders en `data/news.ts`, `data/projects.ts` y `data/site.ts`.
5. Definir `NEXT_PUBLIC_SITE_URL`.

## Reglas para el proximo Codex

- Trabajar desde `site/`.
- Antes de editar, correr `git status --short`.
- Leer `README.md`, `CONTENT_GUIDE.md` y `DESIGN_SYSTEM.md`.
- Mantener tono institucional, claro, cercano y en espanol de Argentina.
- No inventar informacion publica. Usar `Contenido editable`, `Fecha editable`, `En preparacion` o `Proximamente` cuando falten datos.
- Preferir cambios en `data/` cuando el pedido sea de contenido.
- Mantener componentes reutilizables y seguir los patrones existentes.
- No tocar `.openai/hosting.json` salvo que el usuario pida hosting o despliegue.
- Mantener los archivos en UTF-8.
