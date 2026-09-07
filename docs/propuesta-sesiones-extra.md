# Propuesta: sesiones nuevas con lo que trae el kit

> Estado: PROPUESTA para discutir (07-sep-2026). Nada de esto está construido.
> Parte de la lista de `kit-materiales.md`: el curso de 10 sesiones usa solo
> una parte del kit, y sobran sensores y actuadores muy aprovechables.

## Criterio para separar básico de avanzado

**Básico** si cumple casi todo esto:

- Se lee o se maneja con las órdenes que los niños ya conocen
  (`digitalRead`, `analogRead`, `digitalWrite`, `analogWrite`, `tone`) o con
  una librería de una sola llamada, como el servo.
- Se conecta con 2 a 4 cables, sin soldar.
- El resultado se ve o se oye al instante (un LED, un sonido, un movimiento).
- No trae matemáticas ni conceptos de programación nuevos de peso: como mucho
  un concepto nuevo por sesión, igual que en las 10 primeras.

**Avanzado** si necesita protocolos de comunicación (I2C, SPI), librerías con
muchos pasos, más de 6 cables, matemáticas (ángulos, aceleraciones), o tiene
un tema de seguridad (el relé).

## Clasificación de lo que sobra en el kit

### Básicos

| Componente | Cómo se usa | Cables | Idea gancho |
|---|---|---|---|
| Fotorresistencia LDR (×3) | `analogRead` con una resistencia de 10 kΩ (divisor, igual que la perilla) | 3 | Luz que se prende sola de noche; theremin de luz |
| Sensor de sonido KY-038 | `digitalRead` (salida D0, con su tornillito de ajuste) o `analogRead` (A0) | 3-4 | Aplaude y se prende la luz; vúmetro de LEDs |
| Sensor de movimiento PIR HC-SR501 | `digitalRead`: HIGH cuando algo se mueve | 3 | Detector de fantasmas; alarma de pieza |
| Sensor de inclinación tilt (×2) | `digitalRead` igual que un botón (con `INPUT_PULLUP`) | 2 | Dado que se agita; alarma "no me muevas" |
| Sensor de nivel de agua | `analogRead` | 3 | Avisa cuando el vaso se llena; planta sedienta |
| Sensor de temperatura LM35 | `analogRead` → grados con una cuenta (`* 0.488`) | 3 | Comparar con el DHT11: dos termómetros |
| Joystick | 2 × `analogRead` + un botón | 5 | Mover el servo como brazo; juego de reflejos con LEDs |
| Buzzer activo | `digitalWrite`: suena solo, un tono fijo | 2 | Timbre simple, alarma que no necesita `tone` |
| Control remoto infrarrojo + receptor | librería IRremote: cada tecla manda un número | 3 | Prender luces y mover el servo desde el sillón |
| Motor DC pequeño | `digitalWrite`/`analogWrite` a través de un transistor (no va directo al pin) | 4 + transistor | Ventilador que gira más rápido con la perilla |

Los dos últimos son "básicos con asterisco": el control remoto necesita una
librería y aprender a leer los códigos por el monitor serie; el motor necesita
un transistor y un diodo (revisar si los 5 componentes negros del kit son
eso). Ambos son muy motivantes para los niños.

### Avanzados

| Componente | Por qué es avanzado | Idea gancho |
|---|---|---|
| Pantalla LCD 1602 (sin I2C) | 6 cables de datos + potenciómetro de contraste + librería LiquidCrystal | Mostrar la temperatura o la distancia en pantalla |
| Teclado matricial 4×4 | 8 cables, librería Keypad, manejar textos | Caja fuerte con clave que abre la barrera |
| Lector RFID RC522 | Protocolo SPI, 7 cables, librería MFRC522, hay que soldar los pines | Tarjeta mágica que abre la puerta |
| Matriz de LEDs 8×8 + 74HC595 | 16 pines o registro de desplazamiento, mapas de bits | Caritas y animaciones |
| Display 7 segmentos de 4 dígitos | Multiplexado: hay que refrescar los dígitos muy rápido | Cronómetro, marcador |
| Display 7 segmentos de 1 dígito | 8 cables, tabla de segmentos por número (arreglos) | Dado electrónico con número |
| Motor paso a paso 28BYJ-48 + ULN2003 | Librería Stepper, 4 pines + 5V, concepto de pasos | Reloj de manecillas, giradiscos |
| Reloj DS1302 | Librería, poner la hora, fechas | Despertador |
| Acelerómetro MPU6050 | I2C, librería, matemáticas de ángulos | Nivel de burbuja, control con la mano |
| Relé 5 V | Seguridad: nunca con 220 V en el curso | Solo demo del profe con carga de 12 V |

## Propuesta de sesiones extra (curso 2), básicas primero

Cada una sigue la misma receta de las sesiones 1-10: un componente nuevo,
mini-teoría con analogía, práctica guiada, proyecto con checklist y popups
`p-circuito` / `p-codigo`, reto por niveles y quiz. Un concepto de
programación nuevo como máximo.

| # | Sesión | Componente nuevo | Reusa | Concepto nuevo | Proyecto |
|---|---|---|---|---|---|
| 11 | La luz: el ojito de gato 🔆 | LDR | LED, buzzer | El divisor de voltaje (por qué va la 10 kΩ); calibrar un umbral mirando el monitor serie | Luz nocturna automática; theremin de luz como reto |
| 12 | El oído: aplausos y ruido 👏 | Sensor de sonido | LEDs, LED RGB | Detectar un evento corto (el aplauso) y "recordarlo" con una variable de estado | Luz que se prende y apaga con aplausos; vúmetro |
| 13 | El detective: movimiento 🕵️ | PIR + tilt | Buzzer, LEDs | `INPUT_PULLUP` (botón sin resistencia); la espera de calentamiento del PIR | Alarma de pieza con PIR; dado que se agita con el tilt |
| 14 | El control remoto 📺 | Receptor IR + control | LED RGB, servo | Leer códigos por el monitor serie; `switch`/`case` como "menú de opciones" | Tele de juguete: cada tecla un color, flechas mueven el servo |
| 15 | El joystick y el motor 🕹️ | Joystick, motor DC con transistor | Servo, LEDs | El transistor como "grifo grande" para el motor | Brazo o ventilador que sigue el joystick |
| 16 | Agua y calor 💧🌡️ | Nivel de agua, LM35 | DHT11, buzzer | Comparar dos sensores; promedio de varias lecturas | Planta sedienta que avisa; termómetro doble |

Después, si hay ganas, el curso 3 con los avanzados en este orden (de menos a
más cableado): motor paso a paso → display 1 dígito → LCD → teclado (caja
fuerte) → RFID → matriz 8×8 → MPU6050. El relé queda como demo del profe.

## Cuidados de hardware que hay que anotar en las slides

- **LDR**: siempre con la resistencia de 10 kΩ al GND; el valor cambia mucho
  entre salas, por eso la calibración con el monitor serie es parte de la clase.
- **PIR**: tarda 30-60 segundos en "despertar" al conectarlo y tiene dos
  tornillitos (sensibilidad y tiempo); si no se avisa, los niños creen que
  está roto.
- **Sensor de sonido**: el tornillito de ajuste es sensible; conviene marcar
  la posición buena con un plumón.
- **Nivel de agua**: no dejarlo conectado dentro del agua mucho rato, se
  corroe. Alimentarlo desde un pin digital y prenderlo solo para medir.
- **Control remoto**: necesita pila CR2025 (no viene). El receptor VS1838B se
  conecta con 5V, GND y señal; la librería IRremote 4.x cambió la forma de
  leer los códigos, fijar la versión.
- **Motor DC**: nunca directo al pin; transistor + diodo de protección. Con
  pilas aparte si el motor tironea el USB.
- **Relé**: solo con cargas de bajo voltaje (12 V máximo) y solo el profe.
