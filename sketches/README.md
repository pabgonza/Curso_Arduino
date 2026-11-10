# Sketches del curso

Programas completos y listos para subir, uno por carpeta (el Arduino IDE exige
que cada `.ino` viva en una carpeta con su mismo nombre).

Para usarlos: abrir el `.ino` con el Arduino IDE, conectar el Arduino por USB
y apretar ➡ (Subir). El pin de cada componente viene comentado al inicio del
archivo.

- `sesion-02/` — `blink`: el LED de la placa. Reto: `corazon`.
- `sesion-03/` — `semaforo`: tres LEDs por turnos. Reto: `ola`, `alarma` y
  `auto_fantastico`.
- `sesion-04/` — el botón: `espia` (monitor serie), `boton` (LED que obedece)
  y `contador` (el experimento del rebote). Reto: `luz_fija`.
- `sesion-05/` — el buzzer: `estrellita` (con las tres notas de tarea),
  `sirena`, `timbre` y `cancion` (usa la librería BuzzerMusic, ver abajo).
  Reto: `piano` y `piano_melodias`. Desde esta sesión los botones van con
  `INPUT_PULLUP` (entre el pin y GND, sin resistencia; apretado = `LOW`).
- `sesion-06/` — el servo: `servo`, `barrido`, `perilla` y `barrera` (el
  proyecto de la sesión). Reto: `saludo`, `saludo_boton` y `saludo_perilla`.
  Usan la librería Servo, que se instala desde el gestor de librerías del IDE
  (icono de libros), como muestra la última slide de la sesión 6.
- `sesion-07/` — el murciélago HC-SR04: `murcielago`, `alarma` y `retroceso`.
  Reto: `estacionamiento`, `estacionamiento_pito` y `theremin`.
- `sesion-08/` — el DHT11: `termometro` y `semaforo_termico` (necesitan la
  librería "DHT sensor library" de Adafruit, del gestor de librerías). Reto:
  `fiebre`, `fiebre_aviso` y `record`.
- `sesion-09/` — el LED RGB: `mezcla` (recetas de colores), `respiracion`
  (brillo con analogWrite), `rueda_perilla` (arcoíris con el potenciómetro) y
  `lampara_humor` (el proyecto: el color según la distancia del HC-SR04).
  Reto: `respira_color`, `fiesta` y `arcoiris`.

## Librerías

En `librerias/` viven las librerías propias del curso. Para instalarlas:
copiar la carpeta (por ejemplo `librerias/BuzzerMusic`) dentro de
`Documentos/Arduino/libraries/` y volver a abrir el IDE.

- `BuzzerMusic` — canciones listas para el buzzer (Mario Bros, Star Wars,
  Cumpleaños feliz, Himno de la Alegría). Su README explica cómo agregar más.

