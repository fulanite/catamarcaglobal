# Catamarca Global

Sitio web institucional de Catamarca Global, construido con Next.js App Router, TypeScript, CSS global y componentes reutilizables.

## Instalación

```bash
npm ci
```

## Ejecución

```bash
npm run dev
```

## Compilación y verificación

```bash
npm run lint
npm run build
npm test
```

## Estructura

- `app/`: rutas principales del sitio.
- `components/`: header, menú móvil, tarjetas, formularios, CTA y estados.
- `data/`: contenido institucional editable separado de la interfaz.
- `public/brand/`: logo optimizado, símbolo institucional y recursos de marca.
- `tests/`: prueba de render HTML y limpieza del starter.

## Edición de contenidos

La mayor parte del contenido se modifica en `data/`:

- `data/site.ts`: configuración general, misión, visión, objetivos, contacto, participación y alianzas.
- `data/team.ts`: miembros de Comisión Directiva y vocalías.
- `data/areas.ts`: responsables, funciones y líneas de acción por vocalía.
- `data/projects.ts`: proyectos, estados, categorías y filtros.
- `data/news.ts`: novedades editables.
- `data/values.ts`: valores institucionales.

## Reemplazo del logo

Reemplazar los archivos de `public/brand/` manteniendo los nombres:

- `logo-catamarca-global.webp`
- `logo-catamarca-global.png`
- `logo-symbol.webp`
- `logo-symbol.png`

También actualizar `public/favicon.png` y `public/icon-192.png` si cambia el isotipo.

## Carga de miembros

Editar `data/team.ts`. Cuando existan fotos reales autorizadas, agregar un campo de imagen al modelo y actualizar `components/TeamCard.tsx`.

## Carga de proyectos

Editar `data/projects.ts`. Usar estados prudentes hasta confirmar información pública: `En preparación`, `Próximamente` o `Contenido editable`.

## Configuración del formulario

El formulario valida datos en cliente y está listo para conectar un canal de envío. Configurar el endpoint o servicio institucional antes de usarlo en producción.

Variables sugeridas:

- `NEXT_PUBLIC_SITE_URL`
- `SITE_CONTACT_EMAIL`
- `FORM_ENDPOINT`

## Despliegue

El proyecto incluye `.openai/hosting.json` para Sites. Antes de publicar, ejecutar lint y build, revisar contenidos editables y definir `NEXT_PUBLIC_SITE_URL` con el dominio final.
