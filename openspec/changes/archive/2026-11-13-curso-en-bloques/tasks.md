# Tasks

## 1. Generador

- [x] 1.1 `herramientas/bloques/`: lista de programas por sesión (bloques como JSON) y el guion que, en Bloquino, arma el circuito de la sesión, carga cada programa, lo simula, captura los bloques y guarda `.bloquino` y C++.
- [x] 1.2 Programas de las sesiones 2 a 9 (41), cada uno equivalente a su `.ino`. Diferencias (también en el comentario inicial de cada `sesion-NN.js`):
  - Las notas son un menú de 14 frecuencias (do4 a si5) y «tocar nota» se apaga sola: `sirena` y alarmas usan 659 Hz en vez de 660; `piano` toca 0,1 s mientras se aprieta; `theremin` toca 4 notas por tramos de 15 cm; `fiebre` y `fiebre_aviso` tocan 1 s.
  - La perilla de Bloquino va de 0 a 100 (`perilla`, `saludo_perilla`); `rueda_perilla` lee el pin analógico (0-1023) con «asignar».
  - «contar» solo sube: las vueltas usan `180 − ángulo` o `255 − brillo`.
  - Las variables de bloques son decimales: el `contador` muestra «1.00, 2.00…».
  - El sensor de distancia da cm con decimales y 400 sin eco: `lampara_humor` queda azul sin mano delante.
  - `estacionamiento` usa «si / si no» anidados en vez de `&&`; `luz_fija` enciende o apaga en cada rama (el bloque de LED no recibe una variable).
  - Sin funciones propias: la rueda de colores va completa en cada programa de la sesión 9.
- [x] 1.3 Correrlo: `recursos/img/bloques/sesion-NN/*.png` y `sketches/sesion-NN/*/*.bloquino`. Los 41 simulan; los circuitos se asientan sin avisos. El HC-SR04 se asienta con `sensorEn` (sus cuadros de pin quedan corridos del dibujo en Bloquino y la ayuda del recorrido no lo asienta).

## 2. Estilos y ayudas

- [x] 2.1 `slides.css`: imagen de bloques (`img.bloques`, `.bloques-caja` para los altos) y bloque en línea con los colores de cada categoría (`.bloque`).
- [x] 2.2 `slides.js`: `data-sm="sesion-NN/<nombre>"` abre el C++ de `codigo.js`; los `[data-sm]` funcionan también dentro de popups.

## 3. Sesiones

- [x] 3.1 Sesión 2: Bloquino en vez del IDE (taller, entrar, la página, primer programa con capturas), Blink y corazón en bloques, deslizador con bloque, Tinkercad fuera; capturas del IDE y de Tinkercad borradas.
- [x] 3.2 Sesión 3.
- [x] 3.3 Sesión 4.
- [x] 3.4 Sesión 5.
- [x] 3.5 Sesión 6 (se quitó la slide de instalar librerías).
- [x] 3.6 Sesión 7.
- [x] 3.7 Sesión 8.
- [x] 3.8 Sesión 9.
- [x] 3.9 `index.html`. Las sesiones 0 y 1 no nombran el IDE ni Tinkercad: sin cambios.

## 4. Documentos

- [x] 4.1 README, `docs/temario.md`, `docs/decisiones.md` (decisiones 10 y 11), `sketches/README.md`, `CLAUDE.md` y `herramientas/bloques/README.md`.

## 5. Verificación

- [x] 5.1 Playwright a 1280×720 en las sesiones 0 a 9: desborde ≤ 4 px en todas las slides, sin imágenes rotas (también en popups), sin errores de JS, todo «Ver el código» con su C++, popups dentro de popups probados en la sesión 2, y ninguna mención a Tinkercad ni al Arduino IDE.
