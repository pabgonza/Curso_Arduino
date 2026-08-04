# Kits de Arduino para el curso — investigación de mercado

Fecha de la investigación: agosto de 2026.
Documento de referencia interna (no es material para los niños).

Tipo de cambio usado para las conversiones USD→CLP: ~925 CLP/USD (dólar observado, agosto 2026). Los precios de AliExpress fluctúan con cupones y ofertas del vendedor; los de tiendas chilenas pueden cambiar sin aviso. **Todos los precios son referenciales, hay que confirmarlos antes de comprar.**

## Componentes que necesita el curso (10 sesiones)

Arduino UNO (o clon) + cable USB, protoboard, cables jumper (M-M y M-H), LEDs rojo/verde/amarillo, LED RGB (sesión 9), resistencias 220 Ω y 10 kΩ, pulsadores, buzzer pasivo, servo SG90, potenciómetro, sensor ultrasónico HC-SR04, sensor de temperatura DHT11.

Los dos componentes que casi ningún kit "genérico" trae son el **HC-SR04** y el **DHT11**. Ese es el filtro real a la hora de elegir kit.

## Tabla comparativa

| Kit | Tienda / plataforma | Precio aprox. | Cobertura | Link |
|---|---|---|---|---|
| LAFVIN Super Starter Kit UNO R3 | AliExpress (tienda LAFVIN) | US$ 29–36 (≈ CLP 27.000–33.000) + envío/aduana | **Completa**: UNO R3, protoboard, jumpers, LEDs de colores + RGB, resistencias (incl. 220 Ω y 10 kΩ, set de 10 valores), pulsadores, buzzer activo y pasivo, servo SG90, potenciómetro (10 kΩ), DHT11, sensor ultrasónico. Falta solo verificar cantidad exacta de jumpers M-H. | [aliexpress.com/item/32865507121.html](https://www.aliexpress.com/item/32865507121.html) |
| ELEGOO UNO R3 "Most Complete" Starter Kit | AliExpress / tienda oficial ELEGOO | US$ 50–57 (≈ CLP 46.000–53.000) + envío/aduana | **Completa**: UNO R3, protoboard, jumpers, LEDs + módulo RGB, resistencias variadas, pulsadores, buzzer activo y pasivo, servo SG90, potenciómetro, DHT11, sensor ultrasónico (confirmado). Más caro que LAFVIN con cobertura equivalente. | [aliexpress.us/item/3256806395344800.html](https://www.aliexpress.us/item/3256806395344800.html) |
| ELEGOO UNO "Project Super Starter Kit" (básico) | AliExpress | US$ 30–37 (≈ CLP 28.000–34.000) | **Incompleta** — ojo, es un kit distinto al anterior aunque el nombre es parecido: NO trae DHT11 ni HC-SR04. Solo mencionarlo como advertencia de que hay que fijarse bien en el nombre exacto del kit ELEGOO. | [aliexpress.com/item/1005006633278883.html](https://www.aliexpress.com/item/1005006633278883.html) |
| Kit Arduino Uno R3 Starter (RFID + stepper) | Makers Chile | CLP 46.791 (10% dcto. de 51.990) — **sin stock al momento de revisar** | Parcial: UNO, protoboard, jumpers, LEDs, buzzer, servo, potenciómetro, resistencias, pulsadores, módulo RGB. Sin confirmar HC-SR04 ni DHT11 explícitamente (la ficha menciona "módulo de temperatura" y "módulo de prueba de agua" sin precisar modelo — **verificar con el vendedor antes de comprar**). | [makerschile.cl](https://makerschile.cl/producto/kit-arduino-uno-r3-starter-con-caja-rfid-stepper-motor/) |
| Arduino Uno Kit Starter (RFID + stepper) | afel.cl | CLP 30.000 | Parcial, buena cobertura por precio: UNO compatible, protoboard, jumpers, LEDs + RGB, resistencias (220/1k/10k), pulsadores, buzzer activo/pasivo, servo SG90, potenciómetro (100k), DHT11. **Falta HC-SR04** (no aparece en la lista de sensores del kit). | [afel.cl](https://afel.cl/products/arduino-uno-kit-starter-rfid-stepper-motor) |
| MCI Arduino UNO Kit Avanzado | MCI Electronics | CLP 61.990 | Parcial: UNO, 2 protoboards, jumpers, resistencias, pulsadores, buzzer, servo SG90. **Falta LED RGB, HC-SR04 y DHT11** (trae LM35 en su lugar, no es lo mismo). | [mcielectronics.cl](https://mcielectronics.cl/shop/product/mci-arduino-uno-kit-avanzado-mci-electronics-22640/) |
| Arduino Starter Kit oficial en español (K030007) | MCI Electronics / Arduino.cl | CLP 179.990 | Kit oficial de Arduino, buena calidad pero caro. Trae RGB, servo, potenciómetro, resistencias 220/10k, pulsadores, buzzer. **Falta HC-SR04 y DHT11** (trae TMP36 en su lugar). No se justifica el sobreprecio para este curso ya que igual faltan 2 sensores clave. | [mcielectronics.cl](https://mcielectronics.cl/shop/product/arduino-starter-kit-en-espanol-arduino-10836/) |
| Kit de 45 Sensores para Arduino | MCI Electronics | CLP 26.990 | Solo sensores/módulos (**no trae placa Arduino, protoboard, resistencias ni servo/potenciómetro por separado**). Sí confirma HC-SR04 y DHT11. Útil como complemento (ver "por piezas" abajo), no como kit único. | [mcielectronics.cl](https://mcielectronics.cl/shop/product/kit-de-45-sensores-para-arduino-mci-electronics-25502/) |
| Kit de 37 Sensores para Arduino | Altronics.cl / Arduino.cl | No se pudo confirmar precio (Altronics devolvió error 403, Arduino.cl 404 al revisar) — estimado CLP 15.000–25.000 por comparación con kits similares | Solo sensores/módulos, sin placa. Suele incluir HC-SR04 y DHT11 (patrón estándar de estos kits "37 en 1"), pero no se pudo verificar el listado exacto en esta pasada. | [altronics.cl/kit-37-sensores](https://altronics.cl/kit-37-sensores) |

Nota sobre Victronics.cl: el catálogo público solo mostró placas y shields sueltos, sin kits armados con sensores — para un kit habría que consultar directo al vendedor (ventas@victronics.cl).

## Recomendación

**Mejor precio/cobertura: LAFVIN Super Starter Kit UNO R3 (AliExpress, ~US$ 29–36 / CLP 27.000–33.000).** Es el único que junta, en una sola compra, todos los componentes de las 10 sesiones —incluido el HC-SR04 y el DHT11, que son los que casi siempre faltan— a un precio más bajo que las alternativas chilenas equivalentes. La contra es el tiempo de envío (2–5 semanas típico desde China) y que hay que revisar la reputación del vendedor.

**Si el presupuesto es mínimo y se necesita comprar en Chile (sin esperar envío internacional): afel.cl a CLP 30.000.** Es el más barato con cobertura casi completa a nivel local — solo falta agregar un HC-SR04 suelto (se consigue en Chile por CLP 2.000–4.000 en cualquier tienda de electrónica o en el mismo MercadoLibre.cl), quedando igual bajo los CLP 35.000 en total y con entrega rápida.

**Si el presupuesto no es problema y se prefiere calidad/soporte oficial:** ELEGOO "Most Complete" Starter Kit (AliExpress, ~US$ 50–57) — mismo nivel de cobertura que LAFVIN pero de una marca más reconocida, a mayor precio.

**Kits a evitar para este curso** (aunque aparezcan baratos o "oficiales"): el kit oficial Arduino en español (CLP 179.990) y el MCI Kit Avanzado (CLP 61.990) — ninguno trae HC-SR04 ni DHT11, así que igual habría que comprarlos aparte, perdiendo la ventaja de precio del kit.

## Plan B: armar el kit por piezas sueltas

Opción para cuando se necesitan varios kits (curso con varios niños) y conviene comprar por volumen.

**Combinando Chile (rapidez) + AliExpress (precio):**
- Placa UNO compatible + cable USB: CLP 8.000 (afel.cl) o US$ 3–5 en AliExpress
- Kit de 45 sensores MCI (incluye HC-SR04 y DHT11 entre otros 43 módulos): CLP 26.990
- Protoboard + set de jumpers M-M/M-H: CLP 4.000–6.000
- Set resistencias (220 Ω y 10 kΩ, entre otros valores): CLP 2.000–3.000
- Pack de pulsadores: CLP 1.500–2.500
- Buzzer pasivo: CLP 1.000–1.500 (si no viene aceptable en el kit de sensores)
- Servo SG90: CLP 3.000–5.000
- Potenciómetro: CLP 500–1.000
- LEDs de colores + LED RGB: CLP 2.000–3.000

Total estimado combinando MCI + piezas locales: **CLP 49.000–57.000** por set — más caro que un kit LAFVIN completo, así que esta ruta solo conviene si ya se tiene el kit de 45 sensores o se necesita entrega inmediata.

**Todo por piezas en AliExpress** (más barato en teoría, pero requiere comprar a 8–9 vendedores distintos y esperar varios envíos separados):
- Placa UNO clon: US$ 3–5
- Protoboard + jumpers: US$ 2–3
- Set de LEDs + RGB: US$ 1–2
- Set de resistencias: US$ 1–2
- Pack de pulsadores: US$ 1
- Buzzer pasivo: US$ 0,5–1
- Servo SG90: US$ 1,5–2,5
- Potenciómetro: US$ 0,3–0,5
- HC-SR04: US$ 1–1,5
- DHT11: US$ 1,5–2,5

Total estimado: **US$ 13–20 (≈ CLP 12.000–18.500)** por set, antes de envío — el más barato en el papel, pero logísticamente pesado (múltiples paquetes, semanas de espera, riesgo de que algún vendedor no despache). Recomendable solo si se compran muchas unidades y hay tiempo de sobra antes del curso.

## Notas finales

- Todos los precios son referenciales y pueden variar; confirmar antes de comprar, especialmente en AliExpress donde el precio final depende de cupones y del vendedor específico.
- Antes de comprar cualquier kit "económico", revisar la ficha de producto línea por línea buscando explícitamente "HC-SR04" y "DHT11" (o "temperature and humidity sensor") — es el filtro que descarta a la mayoría de los kits baratos.
- No se pudo obtener precio de Altronics.cl (bloqueó el acceso automatizado con error 403) ni confirmar el listado completo del "Kit de 37 Sensores" en Arduino.cl (página no encontrada al momento de la revisión); conviene revisarlos manualmente si se quiere comparar con MCI.
