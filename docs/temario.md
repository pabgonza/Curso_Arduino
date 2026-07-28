# Temario propuesto — 8 sesiones de 90 min

> Estado: PROPUESTA en discusión.
> Cada sesión sigue el ciclo: mini-teoría (5-10 min) → práctica guiada (20-30 min)
> → reto/juego → cierre. Todos los circuitos tienen versión en simulador
> (Tinkercad) y en hardware real, con los mismos pines.

## Sesión 1 — ¡Hola Arduino! 🚀
**Objetivo**: conectar el Arduino, dejar el IDE funcionando y hacer parpadear el primer LED.
- Qué es un microcontrolador ("un cerebrito que sigue instrucciones").
- Instalar/configurar Arduino IDE, conectar la placa, elegir puerto.
- Anatomía de un sketch: `setup()` y `loop()`.
- **Práctica**: Blink con el LED integrado (pin 13) → cambiar velocidades.
- **Reto**: hacer que el LED "lata como un corazón" (patrón irregular).

## Sesión 2 — Semáforo de LEDs 🚦
**Objetivo**: controlar varias salidas digitales y usar la protoboard.
- Protoboard, resistencias ("el LED necesita su casco"), circuito básico.
- `digitalWrite`, `delay`, varios pines a la vez.
- **Práctica**: 3 LEDs → semáforo completo.
- **Proyecto**: dado electrónico o coreografía de luces.

## Sesión 3 — Música con el buzzer 🎵
**Objetivo**: generar sonidos y leer un botón (primera entrada).
- Buzzer pasivo, `tone()`, notas musicales.
- Botón como entrada digital: `digitalRead`, condicional `if`.
- **Práctica**: sirena de policía, melodía simple.
- **Proyecto**: mini piano (2-3 botones = 2-3 notas) o caja de ruidos.

## Sesión 4 — El servo: cosas que se mueven 🦾
**Objetivo**: mover un servo y conocer las entradas analógicas.
- Servo SG90, librería `Servo`, ángulos 0-180°.
- Potenciómetro: `analogRead`, "la perilla mágica" que controla el ángulo.
- **Práctica**: barrido del servo de lado a lado; controlarlo con la perilla.
- **Proyecto**: barrera que se abre con botón (anticipo del paso a nivel).

## Sesión 5 — Sensor de distancia: el murciélago 🦇
**Objetivo**: medir distancias con ultrasonido y reaccionar a ellas.
- Cómo "ve" un murciélago; HC-SR04 y el eco.
- Medir distancia y usarla en condiciones (`if` distancia < X).
- **Práctica**: alarma de intrusos (LED + buzzer si algo se acerca).
- **Proyecto estrella**: 🚲 **sensor de retroceso para bicicleta** — pita más
  rápido cuanto más cerca está la pared (como los autos de verdad).

## Sesión 6 — Termómetro y sensores del mundo 🌡️
**Objetivo**: leer temperatura y mostrar información de distintas formas.
- Sensor de temperatura (TMP36 o DHT11), monitor serie ("el Arduino nos habla").
- Umbrales: frío/templado/caluroso con LEDs de colores.
- **Proyecto**: termómetro semáforo + experimentos (mano, hielo en bolsa).

## Sesión 7 — Colores locos: LED RGB 🌈
**Objetivo**: mezclar colores con PWM y jugar con luces.
- LED RGB, mezcla de colores, `analogWrite` (PWM = "medio encendido").
- **Práctica**: lámpara mezcladora de colores (con potenciómetros).
- **Proyecto**: lámpara de humor que cambia de color sola o con la distancia
  de la mano (reusa HC-SR04). Demo del profe: aro NeoPixel.

## Sesión 8 — Gran proyecto final: el paso a nivel 🚂
**Objetivo**: integrar todo en un proyecto completo.
- 🚧 **Paso a nivel de tren**: el HC-SR04 detecta el autito que se acerca →
  LEDs rojos parpadean + buzzer de aviso → espera unos segundos → el servo
  levanta la barrera y se enciende la luz verde.
- Trabajo en parejas con guía por etapas; decoración libre del montaje.
- Cierre: demo a las familias + diploma + qué sigue (curso 2: ¡robots!).

## Mapa de componentes por sesión

| Sesión | Componentes nuevos | Reusa |
|--------|-------------------|-------|
| 1 | Placa UNO, cable USB, LED integrado | — |
| 2 | Protoboard, LEDs, resistencias | — |
| 3 | Buzzer pasivo, botón | LED |
| 4 | Servo SG90, potenciómetro | Botón |
| 5 | HC-SR04 | LED, buzzer |
| 6 | TMP36/DHT11 | LEDs |
| 7 | LED RGB (demo: NeoPixel) | Potenciómetro, HC-SR04 |
| 8 | — (integración) | HC-SR04, servo, LEDs, buzzer |

Todos los componentes están incluidos en el Elegoo UNO R3 Super Starter Kit
y son simulables en Tinkercad Circuits.
