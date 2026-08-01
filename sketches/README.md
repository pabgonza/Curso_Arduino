# Sketches del curso

Programas completos y listos para subir, uno por carpeta (el Arduino IDE exige
que cada `.ino` viva en una carpeta con su mismo nombre).

Para usarlos: abrir el `.ino` con el Arduino IDE, conectar el Arduino por USB
y apretar ➡ (Subir). El pin de cada componente viene comentado al inicio del
archivo.

- `sesion-02/` — `blink`: el LED de la placa.
- `sesion-03/` — `semaforo`: tres LEDs por turnos.
- `sesion-04/` — el botón: `espia` (monitor serie), `boton` (LED que obedece)
  y `contador` (el experimento del rebote).
- `sesion-05/` — el buzzer: `estrellita` (con las tres notas de tarea),
  `sirena`, `timbre` y `cancion` (usa la librería BuzzerMusic, ver abajo).
- `sesion-06/` — el servo: `servo`, `barrido` y `perilla` (usa la librería
  Servo, que ya viene con el IDE).
- `sesion-07/` — el murciélago HC-SR04: `murcielago`, `alarma` y `retroceso`.
- `sesion-08/` — el DHT11: `termometro` y `semaforo_termico` (necesitan la
  librería "DHT sensor library" de Adafruit, del gestor de librerías).

## Librerías

En `librerias/` viven las librerías propias del curso. Para instalarlas:
copiar la carpeta (por ejemplo `librerias/BuzzerMusic`) dentro de
`Documentos/Arduino/libraries/` y volver a abrir el IDE.

- `BuzzerMusic` — canciones listas para el buzzer (Mario Bros, Star Wars,
  Cumpleaños feliz, Himno de la Alegría). Su README explica cómo agregar más.

