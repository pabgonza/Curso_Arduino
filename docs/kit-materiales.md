# Kit de materiales del curso

Kit comprado para las experiencias: "Kit De Inicio Completo Y Avanzado
Compatible Arduino Uno R3" (vendedor Milagro Store, Mercado Libre Chile).
Fuente: https://www.mercadolibre.cl/kit-de-inicio-completo-y-avanzado-compatible-arduino-uno-r3/up/MLCU2894913183

> Lista armada el 07-sep-2026 **a partir de las fotos del aviso** (el aviso no
> trae la lista en texto), corregida con el kit ya en mano: trae el HC-SR04 y
> LEDs amarillos aunque no salgan en la foto. Las cantidades son las que se ven
> en la foto de despliegue; confirmar al abrir la caja. Los ítems marcados con
> (?) no se distinguen bien en la foto.

## Placa y conexión

| Componente | Cant. | Notas |
|---|---|---|
| Placa UNO R3 compatible (CH340) | 1 | Chip USB CH340: instalar su driver en la sesión 2 |
| Cable USB A-B (azul) | 1 | |
| Protoboard 830 puntos | 1 | |
| Cables jumper macho-macho (cortos, para protoboard) | ~30 | |
| Cables jumper hembra-macho (planos, 20 cm) | ~20 | Para módulos con pines |
| Tira de pines macho 1×40 | 1 | |
| Clip para batería 9 V con plug DC | 1 | La batería no viene |

## Componentes sueltos

| Componente | Cant. | Notas |
|---|---|---|
| LED rojo 5 mm | 10 | |
| LED verde 5 mm | 10 | |
| LED azul 5 mm | 10 | |
| LED amarillo 5 mm | ? | No sale en la foto, pero viene en el kit (semáforos de S3 y S8) |
| Resistencias | ~30 | 3 valores (10 de cada); típicamente 220 Ω, 1 kΩ y 10 kΩ, confirmar con el sticker de código de colores que regalan |
| Pulsadores (tact switch) con capuchón amarillo | 5 | |
| Potenciómetro B10K con perilla | 1 | |
| Buzzer pasivo (negro) | 1 | El del curso: `tone()` |
| Buzzer activo (con etiqueta blanca) | 1 | Suena solo con 5 V, un tono fijo |
| Fotorresistencias (LDR) | 3 | |
| LED emisor infrarrojo (5 mm, negro) | 1 | |
| Receptor infrarrojo (VS1838B / TSOP, encapsulado metálico) | 1 | Se usa con el control remoto |
| Sensor de temperatura LM35DZ (3 patas, TO-92) | 1 | Analógico, 10 mV/°C |
| Sensores de inclinación (tilt, cilindro negro con bolita) | 2 | |
| Display 7 segmentos de 1 dígito | 1 | |
| Display 7 segmentos de 4 dígitos | 1 | |
| Matriz de LEDs 8×8 | 1 | |
| Circuito integrado 74HC595 (registro de desplazamiento) | 1 | Para la matriz o más LEDs |
| Componentes negros planos de 2 patas | 5 | (?) No se distinguen en la foto; probablemente diodos o transistores. Confirmar |
| Disco negro grande junto al joystick | 1 | (?) Probablemente parlante o zumbador grande. Confirmar |

## Módulos

| Módulo | Cant. | Notas |
|---|---|---|
| HC-SR04 (ultrasonido) | 1 | No sale en la foto, pero viene en el kit. Sesiones 7, 9 y 10 |
| Sensor de movimiento PIR (HC-SR501) | 1 | No sale en la foto, pero viene en el kit |
| Acelerómetro y giroscopio MPU6050 | 1 | No sale en la foto, pero viene en el kit. I2C |
| Motor DC pequeño | 1 | No sale en la foto, pero viene en el kit. Necesita transistor o driver, no va directo al pin |
| DHT11 (temperatura y humedad) en placa | 1 | El del curso, sesión 8 |
| Módulo LED RGB (KY-016) | 1 | Sesión 9 |
| Sensor de sonido con micrófono (KY-038) | 1 | Placa roja con potenciómetro de ajuste |
| Sensor de nivel de agua (placa roja con pistas) | 1 | |
| Joystick analógico (2 ejes + botón) | 1 | |
| Relé 5 V de 1 canal | 1 | Ojo: no usar con red eléctrica en el curso |
| Reloj de tiempo real DS1302 con pila | 1 | |
| Lector RFID RC522 + tarjeta + llavero | 1 | Trae sus tiras de pines para soldar |
| Teclado matricial 4×4 (16 pulsadores) | 1 | |
| Control remoto infrarrojo (21 teclas) | 1 | Pareja del receptor IR; sin pila |
| Pantalla LCD 1602 (16×2, fondo azul) | 1 | Sin módulo I2C: necesita 6 pines + potenciómetro para contraste |
| Servo SG90 con accesorios | 1 | Sesión 6 |
| Motor paso a paso 28BYJ-48 + driver ULN2003 | 1 | |

## Observaciones para el curso

- Todo lo que usa el curso viene en el kit: UNO, protoboard, LEDs (incluido
  el amarillo), resistencias, pulsadores, buzzer pasivo, servo, potenciómetro,
  HC-SR04, DHT11 y LED RGB. Solo un kit por grupo: para varios grupos en
  paralelo hacen falta varios kits.
- El sensor de temperatura del curso es el **DHT11**, y viene. También viene un
  LM35 analógico, útil para comparar en la sesión 8.
- Sin batería de 9 V ni pila para el control remoto.

## Pendientes

- Sacar fotos propias (fondo blanco, sin sombras) de los sensores del kit para
  las slides: sensor de sonido, nivel de agua, tilt, PIR, MPU6050, motor DC.
  Nombres sugeridos en `recursos/img/`: `sensor-sonido.jpg`, `nivel-agua.jpg`,
  `tilt.jpg`, `pir.jpg`, `mpu6050.jpg`, `motor-dc.jpg`. Crédito: "Foto propia".
- Confirmar al abrir la caja los ítems marcados con (?) y las cantidades.

## Ideas de experimentos con lo que sobra

- **LDR**: luz de calle que se prende sola cuando oscurece (tapar con la mano);
  theremin de luz con el buzzer.
- **IR + control remoto**: prender LEDs o mover el servo con las teclas del
  control; "canal" de TV con el display de 1 dígito.
- **Sensor de sonido**: aplaudir para prender la luz; vúmetro con los LEDs.
- **Tilt**: alarma de "no me muevas" (buzzer si inclinan la caja); dado que se
  agita.
- **Nivel de agua**: avisar cuando el vaso está lleno; planta sedienta.
- **Joystick**: mover el servo como brazo; juego de "atrapa el LED" en la
  matriz 8×8.
- **Teclado 4×4**: caja fuerte con clave (abre la barrera del servo).
- **RFID**: tarjeta mágica que abre la puerta (servo) o prende una luz.
- **LCD 1602**: mostrar la temperatura o la distancia en pantalla en vez del
  monitor serie.
- **Display 4 dígitos**: cronómetro o marcador del juego.
- **Motor paso a paso**: giradiscos o reloj de manecillas.
- **Relé**: solo con cargas de bajo voltaje (por ejemplo, prender una tira LED
  de 12 V con fuente aparte).
