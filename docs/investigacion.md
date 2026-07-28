# Investigación: cursos de Arduino para niños (9-12 años)

Informe de investigación web (2026-07-28).

## 1. Cursos y currículos de referencia

### 1.1 Arduino Student Kit (Arduino Education, oficial)
- URL: https://www.arduino.cc/education/student-kit/
- **Público**: 11+ años (educación media, sin experiencia previa). Existe versión hispana.
- **Duración**: ~25 horas — **9 lecciones guiadas de 90 minutos + 2 proyectos abiertos**, con glosario y cuadernos de ejercicios.
- **Secuencia**: circuitos básicos (corriente, voltaje, resistencia) → programación en Arduino IDE → lógica digital → sensores/actuadores; empiezan con circuitos LED simples y avanzan hasta sensor de temperatura y control de servo. Los proyectos abiertos van al final.
- El kit individual incluye UNO R3, protoboard, multímetro, sensores y actuadores.

### 1.2 Arduino Education Starter Kit (aula, middle school)
- URL: https://www.arduino.cc/education/middle-school/
- **Público**: 11-14 años, para 8 estudiantes **en parejas** (4 estaciones). Lecciones paso a paso + guías del docente.

### 1.3 Arduino CTC 101
- URL: https://store.arduino.cc/products/arduino-ctc-101-program-self-learning
- **Público**: 13-17 años (referencia de techo, no para 9-12 directamente).
- 5 módulos × 5 lecciones de ~1 hora + 26 proyectos. Metodología 100 % basada en proyectos (ABP). Disponible en español.

### 1.4 Create & Learn — "Arduino for Kids"
- URL: https://www.create-learn.us/robotics-for-kids/arduino
- **Público**: grados 4-9 (≈9-15 años), con base previa de Scratch.
- **Formato**: online en vivo, grupos de 2-3 niños, **12 sesiones de 55 minutos** por unidad.
- **Secuencia** (3 unidades): (1) circuitos y primeros programas con **bloques**; (2) digital vs. analógico, servos y sensores, inicio de **código textual**; (3) proyectos finales (domótica, show de luces, coches inteligentes). Usa simulador; hardware físico opcional (~40 USD).

### 1.5 Udemy — "Robotics for kids and beginners with Arduino (Ages 10+)"
- URL: https://www.udemy.com/course/robotics-for-kids-and-beginners-with-arduino-ages-10/
- Patrón "ciencia primero": electricidad → componentes → microcontrolador → protoboard + código.

### 1.6 Udemy — "Arduino Programming for Kids and Beginners with Tinkercad"
- URL: https://www.udemy.com/course/arduino-programming-for-kids-and-beginners-with-tinkercad/
- Niños desde 8 años; todo sobre **Tinkercad**, sin hardware.

### 1.7 CodaKid — Arduino for Kids
- URL: https://codakid.com/directions/arduino/
- Autoguiado por niveles; el nivel intermedio (9-12) profundiza algoritmos.

### 1.8 CoderDojo — Sushi Cards de Arduino
- URL: https://github.com/lptcdojo/Sushi-Cards
- Formato club (7-17 años): **tarjetas de un concepto por tarjeta**, sesiones de ~2 h, ritmo individual. Cubren: placa e IDE, LED, potenciómetro, servo, buzzer, LDR, módulos.

### 1.9 Referencias en español
- Cerebrito Pérez: https://cerebritoperez.com/arduino-para-ninos-y-ninas/ — proyectos iniciales: semáforo, detector de intrusos, dado electrónico.
- Maletín Electrolab: https://maletinelectrolab.com/arduino-para-ninos/proyectos-de-arduino-para-ninos/

**Patrón de secuencia común**: electricidad/circuito básico → LED (blink) → varios LEDs (semáforo) → entrada digital (botón) → buzzer/sonido → entradas analógicas → servo → sensores "mágicos" (ultrasonido, temperatura) → proyecto final integrador abierto.

## 2. Buenas prácticas pedagógicas (9-12 años)

- **Atención**: regla práctica de 2-5 min de atención sostenida por año de edad ([Edutopia](https://www.edutopia.org/discussion/7-ways-increase-students-attention-span)) → ~20-45 min de foco a los 9-12. Los cursos usan sesiones de 55-90 min **troceadas en ciclos cortos**: explicación 5-10 min + montaje/código 20-30 min.
- **Ratio teoría/práctica**: fuerte sesgo a práctica; "manos a la obra desde el minuto uno" con mini-teoría intercalada y aprendizaje basado en proyectos.
- **Parejas vs. individual**: la evidencia favorece **pair programming** para niños sin experiencia: mejora pensamiento computacional y autoeficacia ([ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0360131520302219), [estudio Raspberry Pi Foundation](https://www.raspberrypi.org/blog/gender-balance-in-computing-pair-programming-approach-engaging-girls/)). Los kits de aula de Arduino asumen parejas.
- **Bloques vs. C++ textual**: consenso general: bloques primero y transición a texto hacia los 10-12 años. El modo **"Blocks + Text" de Tinkercad** (muestra el C++ generado junto a los bloques) es el puente ideal. Con C++ directo, el andamiaje debe ser fuerte: copiar → modificar valores → escribir.
- **Frustración/debugging**: las primeras experiencias de depuración deben ser positivas; normalizar el error como parte del proceso y enseñar estrategias explícitas ([Raspberry Pi CERC](https://computingeducationresearch.org/debugging-a-powerful-and-dangerous-skill-to-learn/)).
- **Seguridad eléctrica**: 5 V es rango seguro. Reglas: recablear siempre **con el USB desconectado**; no superar ~500 mA del pin 5 V; **no alimentar motores desde el pin 5 V**; revisar cableado en pareja antes de energizar ([guía CMU IDeATe](https://courses.ideate.cmu.edu/16-223/f2021/text/reference/electrical-safety.html)).

## 3. Plataformas de simulación

| | **Tinkercad Circuits** | **Wokwi** | **UnoArduSim** | **SimulIDE** |
|---|---|---|---|---|
| Precio | Gratis | Gratis (uso personal) | Gratis (Windows) | Gratis, open source |
| Cuenta / edad | Cuenta Autodesk; **13+ para cuenta propia; menores de 13 vía aula del docente (Tinkercad Classrooms, excepción COPPA)** | Sin cuenta, pero ToS **solo 13+** | Sin cuenta (escritorio) | Sin cuenta (escritorio) |
| Bloques | **Sí** (Blocks, Blocks+Text, Text) | No (C++, MicroPython) | No | No |
| Embeber en HTML propio | **Sí** (`tinkercad.com/embed/<id>`) | **Sí** | No | No |
| Componentes clave | LED, RGB, buzzer, servo, ultrasonido, TMP36, LDR, LCD, motores, NeoPixel | LED, RGB, buzzer, servo, HC-SR04, DHT22, NeoPixel, displays; también ESP32 | Servos, motores, LEDs, displays | Sensores e instrumentos virtuales |

- **Tinkercad Circuits** (https://www.tinkercad.com): la opción natural para 9-12. Con "Classrooms" los niños entran con código de clase y apodo, sin email propio ([aviso COPPA](https://www.tinkercad.com/coppa-notice)).
- **Wokwi** (https://wokwi.com): simulador más potente y rápido, pero sin bloques y con ToS de 13+ ([ToS](https://wokwi.com/legal/terms)); encaja como herramienta de demostración del profesor o embebido en las presentaciones sin que el niño cree cuenta.
- **UnoArduSim** y **SimulIDE**: aptos para el docente, interfaz poco amigable para niños.

**Conclusión práctica**: Tinkercad Circuits para que los niños trabajen; Wokwi como complemento para demos (NeoPixel/ESP32) y embeds en las slides.

## 4. Kits de hardware

- **Elegoo UNO R3 Super Starter Kit** (~40-45 USD): el estándar de facto. UNO clone, protoboard, LEDs, RGB, buzzers activo y pasivo, servo SG90, HC-SR04, sensor temperatura/humedad, LCD1602, joystick, motores. Tutorial PDF de 24 lecciones. Recomendado 10+ con supervisión. Cubre **todos** los componentes del brief.
- **Elegoo UNO Basic Starter Kit** (~20 USD): opción mínima.
- **Keyestudio Super Starter Kit UNO R3** (~45-55 USD): 32 proyectos; algunos soportan programación gráfica.
- **Arduino Student Kit oficial** (~85-100 USD/puesto): con currículo y multímetro, más caro.

## 5. Proyectos lúdicos populares (de menor a mayor dificultad)

Fuentes: [Make-It](https://make-it.ai/blog/arduino-projects-with-kids), [Create & Learn](https://www.create-learn.us/blog/arduino-project-for-kids/), [JetLearn](https://www.jetlearn.com/blog/arduino-projects-for-kids-easy-fun-beginner-friendly), [Thimble](https://thimble.io/arduino-projects-for-kids/), [proyectosconarduino.com](https://proyectosconarduino.com/proyectos-de-arduino-para-ninos/), [CEAC](https://www.ceac.es/blog/ideas-de-proyectos-de-arduino-para-ninos).

1. **Blink + semáforo** — 3 LEDs en ciclo; el "hola mundo" universal.
2. **Caja de ruidos** — buzzer + botón + potenciómetro para cambiar el tono.
3. **Dado electrónico** — botón + LEDs con número aleatorio.
4. **Lámpara mezcladora de colores** — LED RGB + 3 potenciómetros, dentro de una pelota de ping-pong.
5. **Mini piano** — botones que tocan notas en el buzzer.
6. **Theremin de luz** — LDR + buzzer: el tono cambia al tapar la luz.
7. **Termómetro digital** — TMP36/DHT: LEDs de color o LCD según temperatura.
8. **Simon dice** — 4 LEDs + 4 botones + buzzer; repetir la secuencia.
9. **Buzz wire (pulso firme)** — recorrer un alambre sin tocarlo; el buzzer delata el fallo.
10. **Alarma de intrusos** — HC-SR04 + buzzer + LED: suena si algo se acerca.
11. **Theremin ultrasónico** — HC-SR04 + buzzer: la distancia de la mano controla la frecuencia.
12. **Lámpara de humor NeoPixel** — tira/aro WS2812B con patrones cambiables con botón.
13. **Cofre con cerradura secreta** — secuencia de botones + servo que abre la tapa.
14. **Monitor de planta** — humedad de suelo + LEDs/LCD que "pide agua".
15. **Robot evita-obstáculos** — chasis + motores + HC-SR04; proyecto estrella de cierre (→ curso 2).

## Hallazgos clave

1. La secuencia estándar coincide casi exactamente con el brief: LED → botón → buzzer → analógico → servo → ultrasonido → proyecto final.
2. Para 9-12 el consenso pedagógico es bloques primero con transición a C++; si se va a C++ directo, el andamiaje "copiar → modificar → escribir" es imprescindible.
3. Legalmente, Tinkercad es la única plataforma web con vía explícita para menores de 13 (aulas COPPA); Wokwi exige 13+ en sus ToS aunque no pida cuenta.
4. Ambos simuladores web se pueden embeber en páginas HTML propias (relevante para las slides interactivas).
5. El Elegoo Super Starter (~40 USD) cubre todos los componentes del brief y es el estándar de facto.
