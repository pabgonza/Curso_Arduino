---
name: diagramas-circuito
description: Convenciones para dibujar los diagramas de circuito de los popups "p-circuito" del curso (protoboard, componentes, cables, colores). Usar SIEMPRE al crear o editar un diagrama de circuito en las slides.
---

# Diagramas de circuito del curso

Reglas para los diagramas SVG de los popups `p-circuito` (proyectos de cada
sesión) y cualquier otro esquema de conexión. Consolidadas con Pablo el
04-ago-2026.

## Componentes: siempre con los helpers de slides.js

Nunca dibujar a mano lo que ya existe en `slides/assets/slides.js`:

- `arduinoSVG({x, y, pads})` — placa con pads etiquetados. `padY(i)` da el
  centro vertical del pad i; `right` el borde derecho (los cables salen de ahí).
- `protoboardSVG({x, y})` — tablero para popups, tamaño fijo 460×340: la
  MISMA matriz que `protoboardArmado` (los rieles llevan su línea Y su fila
  de hoyitos POR CADA polo — nunca una sola fila compartida). Centros
  (relativos a y): riel superior + y+26 y − y+44; filas superiores
  y+88…y+152 (paso 16); canal y+162…y+184 (centro y+173); filas inferiores
  y+194…y+258; riel inferior − y+298 y + y+316. Columnas: x+28 + c·26
  (16 columnas). Con el tablero típico en (150,30): filas sup. 118…182,
  canal centro 203, filas inf. 224…288, riel − inferior 328. LED estándar:
  `ledSVG(col+13, 232, 328)`; botón: `botonSVG(colCentro, 203)`.
- `ledSVG(cx, cy, rielY, color, borde)` — LED estilo Tinkercad: patita +
  (ánodo) a la izquierda, **lado plano y patita − a la derecha**, rótulos +/−,
  y su 220 Ω (rojo-rojo-café) bajando al riel −. `cx = columna + 13`,
  `cy = centroDeFila − 40`.
- `botonSVG(cx, cy)` — pulsador a caballito del canal; `cy = centro del canal`.
  Patitas en `cx ± 26`. Las patitas de un mismo lado (izq/der) son el mismo
  nodo: el 5V puede entrar por la columna izquierda en cualquier mitad.
- `resistencia10kSVG(x, y)` — 10 kΩ vertical (café-negro-naranjo).
- `circuitoBotonLedSVG(etiqBoton, etiqLed)` — el circuito completo botón+LED
  compartido por S4 y S6.

## Reglas de montaje

1. **Las patitas calzan en los hoyitos.** Todo componente y todo extremo de
   cable termina en el centro de un hoyito real (columna × fila).
2. **Todo va montado en la protoboard.** Los sensores se dibujan "parados" con
   sus patitas en una fila (estilo Fritzing: el cuerpo tapa los rieles si hace
   falta); nada flota con cables al aire. Excepción: el servo, que trae su
   conector de fábrica.
3. **Cablear por columnas.** El cable del Arduino llega a un hoyito de la
   **misma columna** que la patita que alimenta (la columna es el nodo). Si
   varios cables llegan a columnas vecinas, escalonar las filas de llegada.
4. **GND se junta en el riel −** (LEDs vía su 220 Ω, sensores con un cablecito,
   y un solo cable de vuelta al Arduino).

## Reglas de cables

5. **Ni cruces ni pasadas por encima de componentes.** Se logra ordenando los
   pads del Arduino: como los cables salen todos por la derecha, el orden
   vertical de pads debe coincidir con el orden de "altura de ruta" — el pad
   más alto lleva la ruta más alta/lejana y las demás anidan debajo. El orden
   de los pads del diagrama NO tiene que imitar la placa real.
6. **Posiciones fijas: 5V siempre SEGUNDO y GND siempre ÚLTIMO.** (Se evaluó
   5V primero: imposible en S5, donde el arco del pin 8 debe ir por encima de
   todo; y 5V penúltimo: imposible en S7/S8, donde alimenta sensores en filas
   altas y cruzaría al subir. "Segundo" funciona en todos.)
7. **Colores: rojo SOLO para 5V, negro (#37474F, el "negro" del curso) SOLO
   para GND.** Señales con otros colores, distintos entre sí en un mismo
   diagrama: azul #4C7CFF, naranjo #FB8C00, ámbar #E8A33D, morado #AB47BC,
   verde #46B450, amarillo #F5B301. (Los cables de fábrica del servo son la
   excepción física: café=GND, rojo=5V, naranjo=señal.)

## Verificación

Tras editar un diagrama: servidor node en :8123 + Playwright a 1280×720,
abrir el popup con un click real, screenshot y revisarlo con ojo de humano
(cruces, patitas fuera de hoyito, textos tapados). Auditar desbordes de la
sesión completa (`scrollHeight - clientHeight > 4` por slide).
