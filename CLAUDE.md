# Curso de Arduino para niños: convenciones del repo

Estructura y propósito en [README.md](README.md). Diagramas de circuito: seguir siempre la skill `.claude/skills/diagramas-circuito/SKILL.md`.

## Cada sesión
- Una slide por tema; siglas y "cómo funciona por dentro" en popups `¿Saber más?` (`saberMas()` de `slides/assets/slides.js`)
- Proyecto con checklist `.check` y al menos los popups `p-circuito` y `p-codigo`; quiz de tarjetas al final
- Todo programa mostrado tiene su sketch completo en `sketches/sesion-NN/<nombre>/<nombre>.ino`
- Nueva sesión: agregarla a `slides/index.html`

## Editar slides
- Comentarios `<!-- n · Título -->` numerados: renumerar tras insertar o mover slides
- `saberMas()` solo enlaza los `[data-sm]` presentes al cargar: no funciona dentro de HTML generado por JS
- Hotspots `.hot` sobre dibujos de placa: `left/top` en % del SVG 560×400, centrados con `translate(-50%,-50%)`
- Textos que no deben cortarse (p. ej. `USB‑SERIAL`): guion no separable U+2011

## Verificar
- `npx -y http-server -p 8123 -s -c-1` desde la raíz; slides en http://localhost:8123/slides/
- Playwright a 1280×720: activar cada slide moviendo `.activa`; desborde = `scrollHeight-clientHeight > 4`; revisar imágenes rotas
- Probar los interactivos (hotspots, tutoriales paso a paso, popups) además de mirar la captura

## Imágenes, GIF y video
- Todo medio nuevo: crédito visible en la slide + entrada en `recursos/img/CREDITOS.md`; fotos preferentemente de Wikimedia Commons
- MakerWorld responde 403 a fetch directo: leer licencia y URLs con un navegador; los GIF están en `makerworld.bblmw.com/.../design/*.gif` (sin `?x-oss-process`)
- GIF recortados con ffmpeg (palettegen/paletteuse), meta 1-2 MB cada uno

## Publicación y commits
- GitHub Pages publica automáticamente cada push a `main` (https://pabgonza.github.io/Curso_Arduino/slides/): el repo es público, avisar de licencias restrictivas (MakerWorld exclusiva, NC/ND)
- Commit solo al terminar una sección o cuando Pablo lo pida; mensajes en español, autor Pablo Gonzalez, sin referencias a IA
