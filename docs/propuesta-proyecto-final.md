# Propuesta: un proyecto final con efecto "guau"

> Estado: PROPUESTA para discutir con Cristian (08-sep-2026). Nada de esto está
> construido. Sale de la conversación sobre partir el curso presentando el
> proyecto final como meta, en vez de la barrera de la sesión 10.

## Qué se acordó antes de investigar

- El proyecto se presenta en la sesión 1 y cada sesión aporta una pieza. Reemplaza
  la barrera de la S10 y se agregan 2 o 3 sesiones de armado y pruebas, una de
  ellas en terreno.
- Un solo proyecto para todo el curso, con variantes por nivel.
- Presupuesto: hasta 100.000 CLP por grupo además del kit.
- Se acepta un ESP32 (o similar) al final, preconfigurado por el profe como
  "caja negra". Los niños siguen programando el UNO.
- El profe trae la estructura mecánica difícil; los niños arman la electrónica,
  el programa y lo que sea pegar, atornillar y decorar.
- Hay padres en las pruebas. Los niños se pueden mojar y meter al lago.
- Curso en primavera o verano (en Frutillar llueve casi 2000 mm al año, pero
  entre diciembre y febrero baja mucho; el lago llega a 16-18 °C en enero).
- Si "aprovechar el lugar" choca con "reutilizar lo aprendido", gana el guau,
  con al menos la mitad de los componentes del curso reutilizados.

## Qué sabe hacer un niño al terminar las 10 sesiones

LED, pulsador, semáforo, `tone()` y melodías, perilla con `analogRead`,
servo, sensor de distancia HC-SR04, DHT11 con `if`, LED RGB con `analogWrite`,
`for`, funciones propias y monitor serie. Cualquier proyecto final debería
poder descomponerse en esas piezas.

## Los candidatos

Puntaje de 1 a 5. "Reúso" es qué parte de lo aprendido en el curso se usa de
verdad en el proyecto.

| # | Proyecto | Guau | Reúso | Costo extra | Riesgo | Terreno | Armado (sesiones) |
|---|---|---|---|---|---|---|---|
| A | Cohete de agua con cápsula, paracaídas y estación de lanzamiento | 5 | 5 | 40-70 k | medio | pradera | 3 |
| B | Rover explorador con cámara en vivo al teléfono | 4 | 4 | 45-60 k | bajo | pradera, bosque | 2-3 |
| C | Lancha con cámara y sensores del lago | 4 | 3 | 60-90 k | medio | lago | 3 |
| D | Submarino con cable (tipo SeaPerch) | 5 | 2 | 80-120 k | medio-alto | lago | 4 |
| E | Cápsula de volantín con sensores y cámara | 3 | 3 | 30-50 k | bajo | pradera con viento | 2 |
| F | Boya meteorológica del lago con datos al teléfono | 2 | 4 | 40-60 k | bajo | lago | 2 |

### A. Cohete de agua con cápsula, paracaídas y estación de lanzamiento

Es la idea de Cristian, y salió la mejor de la comparación. Tiene dos partes
electrónicas, y eso es justo lo que la hace encajar en el curso: **la estación
de tierra la programan los niños en el UNO** y **la cápsula que vuela lleva el
ESP32** que arma el profe.

**Estación de lanzamiento (Arduino UNO, lo que saben los niños):**

- Pulsador de "armar" y pulsador de "lanzar" (S2-S3).
- Cuenta regresiva 10..0 en el display de 7 segmentos de 4 dígitos del kit, con
  pitidos del buzzer que se aceleran (S4-S5, con `for`).
- Semáforo de estado: rojo despresurizado, amarillo cargando, verde listo (S3).
- El servo tira del gatillo del lanzador y suelta el cohete (S6).
- Opcional: el HC-SR04 apuntando hacia arriba confirma que el cohete ya salió
  (S7), y el LED RGB celebra con el modo fiesta de la S9.

**Cápsula (ESP32, caja negra del profe):**

- Va en una botella cortada encima del cuerpo principal, unida con un acople
  "tornado tube" (así se arma la mayoría de los cohetes modulares).
- Barómetro BMP280 para detectar el apogeo: cuando la altura empieza a bajar,
  un servo suelta un elástico y la ojiva se despega, sale el paracaídas. Es el
  mecanismo del proyecto abierto ESP-Controlled-Rocket y del Triton.
- Buzzer que pita durante la bajada, para encontrar el cohete en el pasto.
- Nivel 2: ESP32-CAM grabando video a la microSD durante el vuelo (Triton lo
  hace a 640×480, 20 fps). Ver el video del descenso en la clase siguiente es
  el momento guau más barato del proyecto.
- Nivel 3: telemetría en vivo. El ESP32 levanta su propia WiFi y los teléfonos
  ven la altura y la aceleración en una página web. Con cámara en vivo el
  alcance queda en 30-50 m y el cohete sube 50-80 m, así que **el streaming en
  vivo durante el vuelo no es realista**; sí lo es la telemetría de números y
  el video grabado a la SD.

**Números que importan:**

| Dato | Valor |
|---|---|
| Altura con botella de 2 L, 60 psi, 1/3 de agua | 60-80 m |
| Presión máxima segura | 60 psi (las botellas reventan cerca de 120) |
| Área libre recomendada | 30 m por lado |
| Distancia de la gente al lanzar | mínimo 5 m, cordel para el gatillo |
| Peso que aguanta la cápsula sin arruinar el vuelo | 100-150 g |

**Costo extra estimado por grupo (CLP):**

| Ítem | Aprox. |
|---|---|
| Lanzador comercial con manómetro y gatillo (o hecho en PVC con válvula de bicicleta) | 25-40 k |
| Bomba de bicicleta con manómetro | 10-15 k |
| ESP32 o ESP32-CAM con base programadora | 11-18 k |
| BMP280 | 3-5 k |
| Servo extra, batería LiPo o pilas, elástico, tela para paracaídas, acoples | 8-12 k |
| Botellas, cinta, cartón para aletas | reciclado |

Un lanzador puede ser compartido por todo el curso, así el costo por grupo baja.

**Riesgos y mitigación:** solo aire y agua, nunca más de 60 psi, manómetro a la
vista, todos detrás de la línea, gatillo por cordel de 5 m, y un adulto a cargo
de la bomba. Si la cápsula falla, el cohete cae de 60 m con la ojiva puesta:
por eso la cápsula va acolchada y nunca se lanza hacia la gente. Con lluvia se
suspende; en primavera-verano casi siempre hay un día seco en la semana.

**Variantes por nivel:**

1. Solo estación de tierra con cuenta regresiva y servo. El paracaídas se
   suelta solo por la ojiva floja (método sin electrónica: la ojiva se cae en
   el apogeo). Ya es un lanzamiento con cuenta regresiva y funciona siempre.
2. Cápsula con BMP280 y servo: paracaídas en el momento justo, buzzer
   localizador.
3. Cápsula con cámara grabando o telemetría en vivo a los teléfonos.

Hay un concurso de cohetes de agua para familias en Chile (Telescopios Chile,
en octubre, alrededor de la Noche de Observación Lunar). Puede ser una meta
externa para el curso.

### B. Rover explorador con cámara en vivo

Un carro de dos motores con una ESP32-CAM encima. Desde el teléfono se ve lo
que ve el robot y se maneja con cuatro botones en una página web. Hay
tutoriales completos (Random Nerd Tutorials) y kits de chasis en Chile por
25-37 k con driver L298N incluido.

- **Qué programan los niños en el UNO:** el HC-SR04 que frena antes de chocar
  (S7), el semáforo de estado, el buzzer que "habla" y el brazo con servo que
  recoge cosas (S6). El ESP32-CAM va aparte y solo maneja los motores y la
  cámara; ambos se comunican con un cable de señal o el UNO controla los
  motores y la CAM solo transmite.
- **Guau:** ver el bosque desde la pantalla como si fueras un explorador de
  Marte. Se puede hacer una carrera de obstáculos con la vista de la cámara.
- **Límites:** el alcance de la WiFi de la ESP32-CAM son 30-50 m con antena
  externa; sin antena externa el video se traba. Los motores tironean la fuente:
  power bank para la CAM y pilas aparte para los motores.
- Riesgo casi nulo, se prueba en la sala si llueve.

### C. Lancha con cámara y sensores del lago

Casco de plumavit o botellas, dos motores con hélice (o bombas de achique como
en los ROV caseros), ESP32 con WiFi para manejarla desde el teléfono, y a
bordo el DHT11 para el aire y un LM35 sellado para la temperatura del agua.

- **Qué programan los niños:** las lecturas de sensores y la alarma cuando la
  temperatura del agua es muy fría, las luces de navegación, el buzzer.
- **Guau:** salir al lago con algo hecho por ellos. En verano a 16-18 °C se
  puede ir a rescatarla si se queda sin señal.
- **Límites:** impermeabilizar es lo que más falla; el alcance WiFi de 50 m en
  el agua es poco (a 60 m ya no vuelve); el viento del Llanquihue la arrastra.
  Necesita un cordel de rescate o un "modo volver" muy simple.

### D. Submarino con cable (tipo SeaPerch)

El ROV escolar del MIT: tubos de PVC, tres motores sellados y un cable hasta
un control con joysticks. Hay versiones Arduino por 100-150 USD y el kit
oficial vale 155 USD. SeaPerch II ya usa módulos Arduino UNO para sensores.

- **Guau:** máximo. Ver el fondo del lago con una cámara requiere cable (la
  WiFi no pasa por el agua), y eso agrega costo y complejidad.
- **Por qué no ganó:** reúsa poco del curso (es todo motores, puente H y
  joystick, que no vimos), el sellado de los motores es artesanal y falla, pasa
  el presupuesto si se le pone cámara, y el agua del lago a 12 °C en primavera
  no ayuda. Es un excelente **curso 2** completo, no un proyecto final de este.

### E. Cápsula de volantín con sensores y cámara

Un volantín grande levanta una cajita con ESP32-CAM sacando fotos cada pocos
segundos y un BMP280 midiendo altura, más un buzzer localizador. Es la
fotografía aérea con volantín, muy documentada, y las praderas de Frutillar
tienen viento.

- **Guau:** las fotos aéreas del grupo desde 50-100 m. Menos espectacular que
  el cohete porque no hay "momento" de lanzamiento.
- **Límites:** depende del viento del día (o hay o no hay), un volantín que
  levante 150 g cuesta 20-30 k, y el hilo de 100 m es un tema de seguridad
  con niños (guantes, lejos de cables eléctricos).
- Es una buena **plan B del cohete** para un día sin permiso de lanzar, porque
  comparte la misma cápsula (ESP32 + BMP280 + buzzer + cámara).

### F. Boya meteorológica del lago

Botella grande flotando con DHT11, LM35 en el agua, LDR y un ESP32 que manda
los datos a una página en el teléfono. Reúsa casi todo lo del curso (S7, S8) y
es lo más fácil de armar, pero **no tiene efecto guau**: los datos en una
pantalla no emocionan a un niño de 10 años. Queda como idea para una sesión
extra, no como proyecto final.

## Recomendación

**El cohete (A), con el rover (B) como alternativa si el clima o los permisos
del lugar de lanzamiento complican.**

Razones, en orden:

1. Es el único que reúsa casi todo el curso sin forzarlo: pulsadores,
   semáforo, buzzer con melodía, display, servo, HC-SR04, RGB. La estación de
   tierra se puede ir construyendo desde la sesión 3 con los mismos
   componentes de cada clase.
2. Tiene un "momento": cuenta regresiva, ruido, despegue, paracaídas. Es
   pirotecnia sin fuego.
3. Los niveles caen solos: nivel 1 funciona con lo que hay en el kit más un
   lanzador; el ESP32 es un extra que se puede dejar para las dos últimas
   sesiones.
4. El material es barato y la parte cara (lanzador, bomba) se compra una vez
   para todos los grupos.
5. Aprovecha las praderas de Frutillar y tiene un concurso nacional como meta.

El submarino y la lancha aprovechan el lago, que es lo distintivo del lugar,
pero reúsan menos de lo enseñado y cargan con el problema del sellado. Mi
sugerencia es guardarlos para un curso 2 de "robots de agua" que empiece por
la lancha y termine en el submarino, ya con motores y joystick enseñados.

## Cómo se reordenaría el curso alrededor del cohete

Solo un boceto para conversar; el temario detallado se arma después de elegir.

| Sesión | Se enseña | Pieza del proyecto que queda lista |
|---|---|---|
| 1 | Presentación del cohete, video de un lanzamiento, ¿qué necesita para funcionar? | Lista de "piezas del cohete" en la pared |
| 2 | Arduino, LED | LED de "estación encendida" |
| 3 | Pulsador y semáforo | Botones armar/lanzar, semáforo de estado |
| 4-5 | Buzzer, melodías, `for` | Cuenta regresiva sonora |
| 6 | Servo | Gatillo del lanzador |
| 7 | HC-SR04 | "Cohete detectado / cohete despegó" |
| 8 | DHT11 e `if` | Estación del tiempo antes de lanzar: si hay más de X de humedad, no se lanza (es broma, pero se toma la decisión con datos) |
| 9 | LED RGB | Luces de la estación, modo fiesta al despegar |
| 10 | Integración: la estación completa en un solo programa | Estación funcionando en la sala con un cohete de mentira |
| 11 | Armado del cohete y la cápsula (mecánica), paracaídas, prueba de caída desde el segundo piso | Cohete y cápsula listos |
| 12 | Día de lanzamiento en la pradera, con padres | Video, alturas, celebración |
| 13 (opcional) | Revisar el video de la cápsula y los datos, ajustar, segundo lanzamiento | Cierre |

El display de 7 segmentos de 4 dígitos no está en las 10 sesiones. Hay tres
salidas: enseñarlo en una sesión corta (es avanzado por el multiplexado), usar
la librería TM1637 si el display del kit trae ese chip (una sola llamada, se
vuelve básico), o hacer la cuenta regresiva con los LEDs y el buzzer y mostrar
el número en el monitor serie. Hay que mirar el display del kit para decidir.

## Preguntas abiertas para Cristian

- ¿Dónde se lanza? Se necesita un campo de 30 × 30 m sin cables, con permiso
  del dueño si es privado, y un plan B bajo techo (el rover, o probar solo la
  estación).
- ¿Un lanzador por curso o uno por grupo? Cambia el costo y el ritmo del día
  de lanzamiento.
- ¿Queremos apuntar al concurso de Telescopios Chile en octubre como meta
  externa, o el día de lanzamiento propio es suficiente?
- ¿Quién imprime en 3D o corta los acoples y la ojiva, o vamos con cartón,
  cinta y tornado tubes comprados?

## Fuentes consultadas

- Cohetes con Arduino y despliegue por servo:
  [Hackster, Arduino-controlled Water Rockets](https://www.hackster.io/mbagrianski/arduino-controlled-water-rockets-def8e5),
  [Instructables, Water Rocket Electronic Systems Design](https://www.instructables.com/Water-Rocket-Electronic-Systems-Design/),
  [Hackaday, ojiva con elástico y servo](https://hackaday.com/2013/11/29/nose-cone-parachute-deployment-from-a-soda-bottle-rubber-band-and-servo/),
  [Foro Arduino, Water Rocket Parachute deployment](https://forum.arduino.cc/t/water-rocket-parachute-deployment/410967).
- Cápsula con ESP32:
  [ESP-Controlled-Rocket (ESP32 + BMP280 + MPU6050, telemetría web, STL)](https://github.com/zerneo85/ESP-Controlled-Rocket),
  [Triton FC (XIAO ESP32S3 con cámara, video a SD, paracaídas automático)](https://github.com/MaelStudio/tritonFC),
  [ESP32-CAM-RocketCam](https://github.com/jameszah/ESP32-CAM-RocketCam),
  [nodebotsau water-rocket (telemetría a estación base)](https://github.com/nodebotsau/water-rocket).
- Estación de lanzamiento y cuenta regresiva:
  [Arduino Project Hub, Advanced Rocket Launch Pad](https://create.arduino.cc/projecthub/UniverseRobotics/advanced-rocket-launch-pad-46052e),
  [Arduino Blog, Launch Control System](https://blog.arduino.cc/2023/01/17/the-arduino-launch-control-system-is-a-model-rocket-enthusiasts-dream/).
- Construcción mecánica y seguridad:
  [US Water Rockets, acople tornado tube](http://www.uswaterrockets.com/construction_&_tutorials/tornado_tube/tutorial.htm),
  [US Water Rockets, ojiva](http://www.uswaterrockets.com/construction_&_tutorials/bottle_nosecone/tutorial.htm),
  [Make, Water Rocket Launcher](https://makezine.com/projects/water-rocket-launcher/),
  [ScienceToyMaker, Water Rocket Safety FAQ](https://sciencetoymaker.org/overhead-water-rocket-launcher-home/water-rocket-safety-faqs/),
  [Scouting America, Water Bottle Rockets](https://www.scouting.org/health-and-safety/safety-moments/water-bottle-rockets/),
  [Instructables, lanzador de PVC](https://www.instructables.com/PVC-Rocket-Launcher-lanzador-De-Cohete-PVC/),
  [Telescopios Chile, concurso de cohetes de agua](https://telescopioschile.cl/bases-concurso-cohetes/).
- Rover con cámara:
  [Random Nerd Tutorials, ESP32-CAM car robot](https://randomnerdtutorials.com/esp32-cam-car-robot-web-server/),
  [Random Nerd Tutorials, antena externa ESP32-CAM](https://randomnerdtutorials.com/esp32-cam-connect-external-antenna/),
  [UCLA LEMUR, alcance ESP32-CAM con y sin antena](https://uclalemur.com/blog/foray-esp-32-cam-range-check-with-and-without-antenna),
  [Rambal, kits chasis 2WD en Chile](https://rambal.com/kits-de-robotica/1198-kit-chasis-robot-dos-ruedas-y-accesorios-2wd-full-2.html).
- Lancha y submarino:
  [Science Buddies, Arduino RC boat](https://www.sciencebuddies.org/science-fair-projects/project-ideas/Robotics_p055/robotics/build-an-arduino-rc-boat),
  [Metadrop, RC boat con ESP32](https://metadrop.net/en/articles/building-rc-boat-using-esp32),
  [Arduino Blog, ROV ultra barato](https://blog.arduino.cc/2024/05/16/an-ultra-affordable-diy-underwater-rov/),
  [Arduino Blog, SeaPerch II](https://blog.arduino.cc/2025/03/19/seaperch-ii-introduces-students-to-underwater-rov-exploration/),
  [Science Buddies, Arduino ROV](https://www.sciencebuddies.org/science-fair-projects/project-ideas/Robotics_p052/robotics/arduino-underwater-ROV).
- Volantín:
  [Instructables, Let's Go Fly a Kite With an Arduino on It](https://www.instructables.com/Lets-Go-Fly-a-Kite-With-an-Arduino-on-It/),
  [Wikipedia, Kite aerial photography](https://en.wikipedia.org/wiki/Kite_aerial_photography).
- Precios y clima:
  [Makers Chile, ESP32-CAM](https://makerschile.cl/producto/esp32-cam-camara-wifi-live-arduino-nodemcu-lolin-lua-iot/),
  [Afel, ESP32-CAM-MB](https://afel.cl/products/esp32-cam-mb-development-board),
  [Afel, BMP280](https://afel.cl/products/sensor-barometrico-bmp280),
  [FrutillarHoy, clima por temporada](https://frutillarhoy.cl/frutillar/clima-frutillar-temperaturas-actividades-cada-temporada),
  [Seatemperature, agua del Llanquihue](https://seatemperature.info/es/llanquihue-temperatura-del-agua-del-mar.html).

Los precios en CLP son estimaciones de septiembre de 2026 a partir de tiendas
chilenas; MercadoLibre no se pudo consultar en detalle, confirmar antes de
comprar.
