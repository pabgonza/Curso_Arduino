# Curso de Arduino para niños: convenciones del repo

Estructura y propósito en [README.md](README.md). Diagramas de circuito: seguir siempre la skill `.claude/skills/diagramas-circuito/SKILL.md`.

## Cada sesión
- Una slide por tema; siglas y "cómo funciona por dentro" en popups `¿Saber más?` (`saberMas()` de `slides/assets/slides.js`)
- Proyecto con checklist `.check` y al menos los popups `p-circuito` y `p-codigo`; quiz de tarjetas al final
- El curso se hace en Bloquino (`../Plataforma_Arduino_Bloques`): nada de Arduino IDE ni Tinkercad como herramienta
- Todo programa mostrado se ve como bloques (`<img class="bloques">`, o `.bloques-caja` si es alto) con su botón «Ver el código» (`data-sm="sesion-NN/<nombre>"`, C++ de `slides/assets/codigo.js`); tiene `.bloquino` y `.ino` en `sketches/sesion-NN/<nombre>/`
- Programa nuevo o cambiado: editarlo en `herramientas/bloques/sesion-NN.js` y regenerar (ver su README); nunca editar a mano los `.bloquino`, las imágenes de `recursos/img/bloques/` ni `codigo.js`
- Bloque suelto en el texto o un interactivo: `<span class="bloque">esperar <span class="valor">1</span> segundos</span>` (variantes por categoría en `slides.css`)
- Botones: siempre entre el pin y GND sin resistencia (`INPUT_PULLUP`, apretado = `LOW`), igual que en Bloquino; se explica en la S4 (popup `pullup`) y se repasa en la S5
- Reto: botón `.sm-grande` con el popup `reto-sol` (aviso `.aviso` de intentarlo primero + solución por nivel; desde el nivel 2 solo lo que cambia) y un sketch por nivel
- Slide 2 «Lo que ya sabemos» (`.fila.repaso`, desde la sesión 3): tarjeta con los conceptos de la sesión anterior + tarjeta «De antes, para hoy». Solo conceptos (sensor/actuador, voltaje/corriente/resistencia, `if`/`for`/variables) y para qué sirve cada componente; nada de pasos de armado ni de los proyectos hechos
- Nueva sesión: agregarla a `slides/index.html`

## Editar slides
- Comentarios `<!-- n · Título -->` numerados: renumerar tras insertar o mover slides
- `saberMas()` solo enlaza los `[data-sm]` presentes al cargar: no funciona dentro de HTML generado por JS
- Hotspots `.hot` sobre dibujos de placa: `left/top` en % del SVG 560×400, centrados con `translate(-50%,-50%)`
- Textos que no deben cortarse (p. ej. `USB‑SERIAL`): guion no separable U+2011

## Verificar
- `python -m http.server 8123 --bind 127.0.0.1` desde la raíz (no instala nada; `npx -y http-server` sí); slides en http://localhost:8123/slides/
- El circuito y el código de cada sesión coinciden con Bloquino (`../Plataforma_Arduino_Bloques`): al cambiar uno, revisar el otro
- Playwright a 1280×720: activar cada slide moviendo `.activa`; desborde = `scrollHeight-clientHeight > 4`; revisar imágenes rotas
- Probar los interactivos (hotspots, tutoriales paso a paso, popups) además de mirar la captura
- Capturas: esperar ~2 s tras cargar la slide (animación de entrada); si no, sale vacía
- Cambios visuales: enviar las capturas a Pablo para revisarlas antes del commit

## Imágenes, GIF y video
- Todo medio nuevo: crédito visible en la slide + entrada en `recursos/img/CREDITOS.md`; fotos preferentemente de Wikimedia Commons
- MakerWorld responde 403 a fetch directo: leer licencia y URLs con un navegador; los GIF están en `makerworld.bblmw.com/.../design/*.gif` (sin `?x-oss-process`)
- GIF recortados con ffmpeg (palettegen/paletteuse), meta 1-2 MB cada uno

## Publicación y commits
- GitHub Pages publica automáticamente cada push a `main` (https://pabgonza.github.io/Curso_Arduino/slides/): el repo es público, avisar de licencias restrictivas (MakerWorld exclusiva, NC/ND)
- Commit solo al terminar una sección o cuando Pablo lo pida; mensajes en español, autor Pablo Gonzalez, sin referencias a IA
