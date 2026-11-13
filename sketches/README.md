# Sketches del curso

Programas completos, uno por carpeta. Cada carpeta trae dos versiones del
mismo programa:

- `<nombre>.bloquino`: el proyecto de Bloquino, con el circuito de la sesión y
  los bloques. Es el que usa el curso: en Bloquino, «Abrir» y elegir el
  archivo; después «Iniciar simulación» o «Cargar a la placa». Lo genera
  `herramientas/bloques/` (no editarlo a mano).
- `<nombre>.ino`: el mismo programa escrito en C++, para el Arduino IDE (que
  exige que cada `.ino` viva en una carpeta con su mismo nombre). Algunos se
  apartan un poco de su versión en bloques; el comentario inicial de
  `herramientas/bloques/sesion-NN.js` dice en qué.

- `sesion-02/` — `blink`: el LED de la placa. Reto: `corazon`.
- `sesion-03/` — `semaforo`: tres LEDs por turnos. Reto: `ola`, `alarma` y
  `auto_fantastico`.
- `sesion-04/` — el botón, entre el pin y GND con `INPUT_PULLUP` (sin
  resistencia; apretado = `LOW`), como en todo el curso: `espia` (monitor serie), `boton` (LED que obedece)
  y `contador` (el experimento del rebote). Reto: `luz_fija`.
- `sesion-05/` — el buzzer: `estrellita` (con las tres notas de tarea),
  `sirena`, `timbre` y `cancion` (usa la librería BuzzerMusic, ver abajo).
  Reto: `piano` y `piano_melodias`.
- `sesion-06/` — el servo: `servo`, `barrido`, `perilla` y `barrera` (el
  proyecto de la sesión). Reto: `saludo`, `saludo_boton` y `saludo_perilla`.
  Los `.ino` usan la librería Servo, que se instala desde el gestor de
  librerías del IDE (en Bloquino ya viene).
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

Bloquino ya trae las librerías del kit (Servo, DHT, BuzzerMusic): esto es solo
para los `.ino` en el Arduino IDE.

En `librerias/` viven las librerías propias del curso. Para instalarlas:
copiar la carpeta (por ejemplo `librerias/BuzzerMusic`) dentro de
`Documentos/Arduino/libraries/` y volver a abrir el IDE.

- `BuzzerMusic` — canciones listas para el buzzer (Mario Bros, Star Wars,
  Cumpleaños feliz, Himno de la Alegría). Su README explica cómo agregar más.

