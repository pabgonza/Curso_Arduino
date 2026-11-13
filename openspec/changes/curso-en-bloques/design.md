# Design

## Contexto

- 41 sketches en `sketches/sesion-02` a `sesion-09`; unos 50 bloques `<pre>` de código en las slides (listados, soluciones de retos en popups e interactivos).
- Bloquino trae un arnés de Playwright (`../Plataforma_Arduino_Bloques/repo/scripts/recorrido/`) que arma con el mouse el circuito de cada sesión del curso (`s2.js` a `s9.js`), carga un programa de bloques como JSON y lo simula.
- Lo que usan los sketches (`digitalWrite/Read`, `delay`, `tone/noTone`, `analogWrite/Read`, `map`, `random`, `for`, `Serial`, servo, DHT11, BuzzerMusic) tiene bloque en Bloquino.

## Decisiones

1. **Imagen de bloques, no HTML de bloques.** Cada programa se muestra como PNG de su espacio de bloques en Bloquino (`recursos/img/bloques/sesion-NN/<nombre>.png`), capturado a escala fija. Es exactamente lo que el alumno verá; dibujar bloques en HTML sería una copia que se desactualiza.
2. **El C++ en un popup.** Bajo cada imagen, un botón «¿Saber más?» «Ver el código» abre el C++ que generan los bloques (el `sketch.ino` del `.bloquino`), no el `.ino` escrito a mano.
3. **Un `.bloquino` por programa, con el circuito de la sesión.** El generador arma una vez el circuito de cada sesión (reusando los guiones del recorrido) y le pone los bloques de cada programa. Si un programa de la sesión necesita una pieza más, se agrega a ese circuito.
4. **El programa en bloques hace lo mismo que el `.ino`.** Si un bloque no calza 1 a 1 (por ejemplo brillo en % en vez de 0-255), se usa el equivalente de Bloquino y se ajusta el texto de la slide. Las diferencias quedan anotadas en `tasks.md`.
5. **El generador vive en el curso** (`herramientas/bloques/`): una lista de programas por sesión (bloques como JSON con las ayudas del recorrido). Se corre con el MCP de Playwright contra el servidor de desarrollo de Bloquino copiándolo a `repo/.playwright-mcp/`, porque el MCP solo lee archivos dentro de `repo/`.
6. **Sesión 2 en Bloquino.** El tutorial del IDE (instalar, placa, puerto) se reemplaza por uno de Bloquino con capturas reales: entrar a la dirección de la sala, la página, bloques, simular, cargar a la placa (y elegir el puerto la primera vez). Los popups de siglas que siguen teniendo sentido (USB, puerto, sketch) se conservan; IDE se redefine (Bloquino es el taller).
7. **Interactivos.** Donde un interactivo muestra una línea de C++ (deslizador de `delay`, etc.), muestra el bloque equivalente con un estilo CSS que imita el de Bloquino (`.bloque` en `slides.css`), sin capturas.
8. **Verificación** como dice el `CLAUDE.md` del curso: Playwright a 1280×720, cada slide activada, desborde = `scrollHeight - clientHeight > 4`, imágenes rotas, interactivos probados, capturas a Pablo antes del commit de cada sesión.

## Riesgos

- Programas largos dan imágenes altas que desbordan la slide: se capturan en dos columnas (scripts separados lado a lado) o se reduce la escala; si aun así no caben, la imagen va en un popup y la slide muestra la parte central.
- La rama `bloquino` diverge de `main` mientras se evalúa: no se toca `main`.
