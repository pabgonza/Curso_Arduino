# Proyectos de referencia para el proyecto final

> Links reunidos el 01-oct-2026 desde la conversación con Claude y el grupo de
> pestañas guardado "Proyectos Arduino" de Chrome. Ordenados según las ideas de
> la lección 0 (`slides/sesion-00.html`). Los GIF y videos que se usan en la
> lección están detallados en `recursos/img/CREDITOS.md`.

**Licencias:** el repo es público (GitHub Pages). "Exclusiva MakerWorld" no
permite publicar el material fuera de MakerWorld ni usarlo comercialmente; NC =
no comercial; ND = sin obras derivadas. Revisar antes de usar imágenes nuevas.

## Idea 1 · Robotitos que caminan

| Proyecto | Enlaces | Qué usa | Licencia | En la lección 0 |
|---|---|---|---|---|
| Otto DIY, robot bailarín bípedo | [MakerWorld](https://makerworld.com/es/models/1307980-otto-diy-biped-dancing-robot#profileId-1773912) · [ottodiy.com](https://www.ottodiy.com/) · videos: [qué puede hacer](https://www.youtube.com/watch?v=VD6sgTo6NOY), [bailando](https://www.youtube.com/watch?v=EWXM-Z7vduo) | 4 servos, HC-SR04, buzzer, Arduino Nano, cuerpo impreso en 3D | Diseño CC BY-SA; videos licencia estándar de YouTube | Sí (GIF `otto-baile.gif`) |
| COBOT, cuatro patas con sensor de distancia | [MakerWorld](https://makerworld.com/es/models/523448-cobot-four-servo-legs-and-distance-sensor-robot?from=search#profileId-440067) | 4 servos, HC-SR04, Arduino, cuerpo impreso en 3D | CC BY-NC-ND | Sí (GIF `cobot.gif`) |

## Idea 2 · Lámparas interactivas

| Proyecto | Enlaces | Qué usa | Licencia | En la lección 0 |
|---|---|---|---|---|
| Lámpara táctil (hongo) | [MakerWorld](https://makerworld.com/es/models/2407165-simple-touch-desk-lamp-based-on-arduino-and-ttp223?from=search#profileId-2638881) · [código](https://github.com/Keralots/LedLamp-with-touch-button) | Sensor táctil TTP223, LED con PWM (MOSFET), Arduino Pro Mini o Nano, batería 18650 | Exclusiva MakerWorld | Sí (GIF `lampara-tactil.gif`) |
| Lámpara Nautilus que reacciona al sonido | [MakerWorld](https://makerworld.com/es/models/2668498-sound-reactive-nautilus-lamp-arduino-project?from=search#profileId-2953270) · [instrucciones](https://www.starryodyssey.com/design/nautilus-lamp) | Sensor de sonido, tira de LEDs RGB, Arduino | CC BY-NC-SA | Sí (GIF `lampara-sonido.gif`) |
| Lámpara de Luna interactiva | [MakerWorld](https://makerworld.com/es/models/610495-interactive-moon-lamp-arduino-controlled-rgb?from=search#profileId-1434468) · [video](https://youtu.be/xZy_1CMyAzQ) · [código](https://github.com/cybercraftics/moon_lamp) | Sensor táctil, LDR (se prende sola al oscurecer), LEDs RGB, Arduino | Exclusiva MakerWorld | No (alternativa a las dos anteriores) |

## Idea 3 · Vehículos

| Proyecto | Enlaces | Qué usa | Licencia | En la lección 0 |
|---|---|---|---|---|
| Barco ESP32 RC | [MakerWorld](https://makerworld.com/es/models/2141050-esp32-rc-boat-easy-to-assemble-and-economical#profileId-2319230) · [código](https://github.com/omnia-makers/esp32_boat) · [artículo](https://metadrop.net/en/articles/building-rc-boat-using-esp32) | ESP32-C3, servo MG90S (timón), 2 motores con hélice, puente H L298N mini, LiPo 3,7 V, bandeja de corcho; se maneja por Bluetooth desde el teléfono | Exclusiva MakerWorld | Sí (GIF `barco.gif`) |
| Base de robot seguidor de línea | [MakerWorld](https://makerworld.com/es/models/2380578-line-tracking-robot-base#profileId-2606799) | Motores TT 1:48, sensores IR, doble puente H, 3 pilas AA; versión 2 con sensor IR de parada | CC BY-NC-SA | No (es el modelo para construirlo) |
| Seguidor de línea en pista (video) | [YouTube, desde el segundo 28](https://www.youtube.com/watch?v=vEOgWIf6vqU) | Robotracer con sensores de línea | Licencia estándar de YouTube | Sí (GIF `auto-linea.gif`) |
| Line Follower Robot using Arduino (video, hash include electronics) | [YouTube, desde el segundo 17](https://www.youtube.com/watch?v=5jh-5HGvC-I&t=17s) | Arduino, sensores IR, motores | Licencia estándar de YouTube | No (tutorial de 7 min, sirve de guía de armado) |

## Idea 4 · Cohete de agua

| Proyecto | Enlaces | Qué usa | Licencia | En la lección 0 |
|---|---|---|---|---|
| Lanzador de cohetes de agua (Marimo Labs) | [MakerWorld](https://makerworld.com/es/models/89750-water-rocket-launcher?from=search#profileId-96235) · [23 lanzamientos](https://www.youtube.com/watch?v=hjkcgdyLsX4) · [cómo armarlo](https://www.youtube.com/watch?v=sesfG4ivCT4) · [Instructables](https://www.instructables.com/Simple-3D-Printed-Water-Rocket-Launcher/) · [Printables](https://www.printables.com/model/86434-water-rocket-launcher) | Piezas impresas, tubo PVC, válvula de bicicleta, gatillo con cordel (se puede reemplazar por un servo) | CC BY-NC-SA | Sí (GIF `cohete-lanzador.gif`) |
| Cohete de agua (Jason's Studio) | [MakerWorld](https://makerworld.com/es/models/2579259-water-rocket?from=search#profileId-2844502) | Lanzador impreso que se conecta a una bomba de aire | Exclusiva MakerWorld | No (su GIF era muy corto) |
| Kit de cohete de botella con lanzador (SmittyPrints) | [MakerWorld](https://makerworld.com/es/models/1500537-bottle-rocket-kit-with-launcher#profileId-1569694) | Piezas impresas, botella de agua con gas, cinta aislante, bomba de bicicleta | Exclusiva MakerWorld | No |
| StratoRocket Mini, cohete con paracaídas (video, StratoFins) | [YouTube, desde el segundo 29](https://www.youtube.com/watch?v=H4-hzaNt1gg) | Kit de cohete de agua con sistema de recuperación | Licencia estándar de YouTube | Sí (GIF `cohete-paracaidas.gif`) |

## Idea 5 · Mini proyectos

| Video | Enlace | Contenido | En la lección 0 |
|---|---|---|---|
| Top 10 Arduino Projects (Robotos) | [Short](https://www.youtube.com/shorts/cmAWM1hZ5mk) | 10 inventos de cartón: comida para mascota, auto por teléfono, casa inteligente, agua automática, basurero que separa, bidón, escalera con luces, riego, techo que se cierra si llueve, puerta automática | Sí (video completo) |
| Automatic Car Parking System (EAZYTRONIC) | [Short](https://www.youtube.com/shorts/sITKkMyOJb0) | Estacionamiento con barrera | Sí (seg. 0-5) |
| Rock Paper Scissors (EAZYTRONIC) | [Short](https://www.youtube.com/shorts/Nbjpv2-yjCY) | Piedra, papel o tijera contra el Arduino | Sí (seg. 0-7) |
| Top 10 Arduino Projects, otro (Robotos) | [Short](https://www.youtube.com/shorts/NpOHTf-7u8M) | Otra recopilación de 1 minuto | No |

Todos son licencia estándar de YouTube.

## Ideas de la propuesta inicial que quedaron fuera de la lección 0

Rover con cámara ESP32-CAM, lancha y submarino: ver
[propuesta-proyecto-final.md](propuesta-proyecto-final.md).
