# Temario — 10 sesiones de 90 min

> Estado: PROPUESTA v2 en discusión (reestructurada tras feedback).
> Cada sesión sigue el ciclo: mini-teoría (5-10 min) → práctica guiada (20-30 min)
> → reto/juego → quiz de tarjetas → cierre. Todos los circuitos tienen versión
> en simulador (Tinkercad) y en hardware real, con los mismos pines.

## Patrones transversales

- **"¿Saber más?"**: siglas (IDE, USB, COM, LED…), definiciones y el
  "cómo funciona por dentro" de cada componente viven en popups opcionales
  que no interrumpen el flujo de la presentación. Nada se asume sabido.
- **Andamiaje progresivo** (bloques → código):
  - S2-S4: bloques y código C++ generado, lado a lado (Tinkercad Blocks+Text).
  - S5-S7: código como protagonista, "copiar y modificar"; bloques solo de apoyo.
  - S8-S10: solo código.
- **Cada componente nuevo** trae su mini-sección "¿Cómo funciona por dentro?"
  (corta, tipo popup o slide opcional al final).

## Sesión 1 — ¿Qué es Arduino? 🤖 *(sin hardware)*
**Objetivo**: entender qué es un microcontrolador y conocer la historia de Arduino.
- ¿Dónde se esconden los "cerebritos"? (lavadora, microondas, ascensor, drones…).
- Paralelos: computador (cerebro grande, muchas tareas) vs Arduino (cerebrito,
  una misión que repite por siempre) vs robot (sentir → pensar → actuar).
- **Historia lúdica**: la escuela de inventores de Ivrea (Italia, 2005), el
  problema de las placas caras, el bar del rey Arduino que dio el nombre, y la
  "receta secreta" que decidieron regalar al mundo (filosofía open source).
- Quiz: tarjetas de la historia + "¿tiene un cerebrito?" (objetos cotidianos).

## Sesión 2 — El taller del programador 🛠️
**Objetivo**: entender qué es un IDE, dejar todo instalado y hacer el primer Blink.
- ¿Qué es un IDE? (siglas explicadas: el taller donde se escribe, revisa y envía).
- Paso a paso desde cero: instalar el IDE, conectar el USB, drivers, elegir
  placa y puerto COM (con popups "¿Saber más?": USB, puerto, driver, sketch).
- Primer programa con bloques en Tinkercad + el código que generan.
- **Práctica**: Blink en simulador → subir el Blink real a la placa.
- **Reto**: hacer que el LED "lata como un corazón".

## Sesión 3 — Electricidad y protoboard 💧⚡
**Objetivo**: electrónica muy básica con la analogía del agua, y dominar la protoboard.
- La electricidad como agua: voltaje = presión, corriente = caudal,
  resistencia = tubería angosta; el circuito debe ser un "circuito cerrado".
- La protoboard por dentro: cómo se conectan sus agujeritos (filas y rieles).
- LED + resistencia ("el casco del LED"): primer circuito propio.
- **Proyecto**: semáforo de 3 LEDs.
- **Reto**: coreografía de luces o dado electrónico.

## Sesión 4 — Sentir y actuar 🕹️
**Objetivo**: panorama general de sensores y actuadores + primera entrada digital.
- **Sensores** = sentidos (ver, oír, tocar…) / **Actuadores** = músculos
  (moverse, sonar, iluminar). Ejemplos reales: puerta del supermercado,
  timbre, termómetro de la farmacia, aspersor del jardín.
- **Quiz interactivo**: aparece un objeto → ¿sensor o actuador?
- El botón: nuestro primer sensor. `digitalRead` y el condicional `if`.
- **Proyecto**: interruptor de luz propio; luz que solo alumbra si aprietas.

## Sesión 5 — Música con el buzzer 🎵
**Objetivo**: generar sonidos y combinarlos con el botón.
- Buzzer pasivo, `tone()`, notas musicales ("¿Cómo funciona por dentro?": la
  membrana que vibra).
- **Práctica**: sirena de policía, melodía simple.
- **Proyecto**: mini piano (2-3 botones = 2-3 notas) o caja de ruidos.

## Sesión 6 — El servo: cosas que se mueven 🦾
**Objetivo**: mover un servo y conocer las entradas analógicas.
- Servo SG90, librería `Servo`, ángulos 0-180°.
- Potenciómetro: `analogRead`, "la perilla mágica" que controla el ángulo.
- **Práctica**: barrido del servo; controlarlo con la perilla.
- **Proyecto**: barrera que se abre con botón (anticipo del paso a nivel).

## Sesión 7 — Sensor de distancia: el murciélago 🦇
**Objetivo**: medir distancias con ultrasonido y reaccionar a ellas.
- Cómo "ve" un murciélago; HC-SR04 y el eco.
- Medir distancia y usarla en condiciones (`if` distancia < X).
- **Práctica**: alarma de intrusos (LED + buzzer si algo se acerca).
- **Proyecto estrella**: 🚲 **sensor de retroceso para bicicleta** — pita más
  rápido cuanto más cerca está la pared (como los autos de verdad).

## Sesión 8 — Termómetro y sensores del mundo 🌡️
**Objetivo**: leer temperatura y mostrar información de distintas formas.
- Sensor de temperatura (TMP36 o DHT11), monitor serie ("el Arduino nos habla").
- Umbrales: frío/templado/caluroso con LEDs de colores.
- **Proyecto**: termómetro semáforo + experimentos (mano, hielo en bolsa).

## Sesión 9 — Colores locos: LED RGB 🌈
**Objetivo**: mezclar colores con PWM y jugar con luces.
- LED RGB, mezcla de colores, `analogWrite` (PWM = "medio encendido").
- **Práctica**: lámpara mezcladora de colores (con potenciómetros).
- **Proyecto**: lámpara de humor que cambia de color sola o con la distancia
  de la mano (reusa HC-SR04). Demo del profe: aro NeoPixel.

## Sesión 10 — Gran proyecto final: el paso a nivel 🚂
**Objetivo**: integrar todo en un proyecto completo.
- 🚧 **Paso a nivel de tren**: el HC-SR04 detecta el autito que se acerca →
  LEDs rojos parpadean + buzzer de aviso → espera unos segundos → el servo
  levanta la barrera y se enciende la luz verde.
- Trabajo en parejas con guía por etapas; decoración libre del montaje.
- Cierre: demo a las familias + diploma + qué sigue (curso 2: ¡robots!).

## Versión comprimida (si solo hay 8 sesiones)

- S1 + S2 se fusionan (historia en 25 min + IDE y Blink en 60 min).
- S4 + S5 se fusionan (panorama sensores/actuadores en 25 min + botón y buzzer).

## Mapa de componentes por sesión

| Sesión | Componentes nuevos | Reusa |
|--------|-------------------|-------|
| 1 | — (solo historia y conceptos) | — |
| 2 | Placa UNO, cable USB, LED integrado | — |
| 3 | Protoboard, LEDs, resistencias | — |
| 4 | Botón | LEDs |
| 5 | Buzzer pasivo | Botón |
| 6 | Servo SG90, potenciómetro | Botón |
| 7 | HC-SR04 | LED, buzzer |
| 8 | TMP36/DHT11 | LEDs |
| 9 | LED RGB (demo: NeoPixel) | Potenciómetro, HC-SR04 |
| 10 | — (integración) | HC-SR04, servo, LEDs, buzzer |

Todos los componentes están incluidos en el Elegoo UNO R3 Super Starter Kit
y son simulables en Tinkercad Circuits.
