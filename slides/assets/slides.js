/* Motor de navegación de slides — sin dependencias.
   Uso: cada slide es un <section class="slide">. El script crea la barra
   de navegación, maneja teclado (flechas, espacio, Home/End, F = pantalla
   completa) y guarda la posición en el hash de la URL. */

(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  if (!slides.length) return;

  const nav = document.createElement("nav");
  nav.className = "nav-slides";
  nav.setAttribute("aria-label", "Navegación de slides");
  nav.innerHTML = `
    <button class="flecha" data-ir="-1" aria-label="Anterior">◀</button>
    <div class="puntos"></div>
    <span class="contador"></span>
    <button class="flecha" data-ir="1" aria-label="Siguiente">▶</button>`;
  document.body.appendChild(nav);

  const puntos = nav.querySelector(".puntos");
  slides.forEach((_, i) => {
    const p = document.createElement("button");
    p.className = "punto";
    p.setAttribute("aria-label", "Ir a la slide " + (i + 1));
    p.addEventListener("click", () => ir(i));
    puntos.appendChild(p);
  });
  const contador = nav.querySelector(".contador");
  nav.querySelectorAll("[data-ir]").forEach(b =>
    b.addEventListener("click", () => mover(+b.dataset.ir)));

  let actual = -1;

  function ir(n) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    if (n === actual) return;
    if (actual >= 0) slides[actual].classList.remove("activa");
    actual = n;
    slides[actual].classList.add("activa");
    puntos.querySelectorAll(".punto").forEach((p, i) =>
      p.classList.toggle("actual", i === actual));
    contador.textContent = (actual + 1) + " / " + slides.length;
    history.replaceState(null, "", "#" + (actual + 1));
    document.dispatchEvent(new CustomEvent("slide", { detail: { n: actual } }));
  }
  function mover(d) { ir(actual + d); }

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    switch (e.key) {
      case "ArrowRight": case "PageDown": case " ": mover(1); e.preventDefault(); break;
      case "ArrowLeft": case "PageUp": mover(-1); e.preventDefault(); break;
      case "Home": ir(0); break;
      case "End": ir(slides.length - 1); break;
      case "f": case "F":
        document.fullscreenElement
          ? document.exitFullscreen()
          : document.documentElement.requestFullscreen();
        break;
    }
  });

  // gestos táctiles simples
  let x0 = null;
  addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) mover(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });

  ir((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();

/* Checklists de pasos (.check): clic o Enter/espacio marcan el paso.
   Los botones "?" (.sm) dentro del texto no marcan. */
addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".check").forEach(c => {
    c.addEventListener("click", e => { if (e.target.closest(".sm")) return; c.classList.toggle("hecho"); });
    c.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { c.classList.toggle("hecho"); e.preventDefault(); }
    });
  });
});

/* "¿Saber más?": popups opcionales que no cortan el flujo de la clase.
   Uso: saberMas({ ide: { t: "IDE", d: "Texto…" } }) y en el HTML
   <button class="sm" data-sm="ide">?</button> (o .sm-grande). */
function saberMas(defs) {
  const dlg = document.createElement("dialog");
  dlg.className = "saber-mas";
  dlg.innerHTML = `<h3></h3><div class="sm-cuerpo"></div>
    <button class="cerrar">¡Entendido! 👍</button>`;
  document.body.appendChild(dlg);
  dlg.querySelector(".cerrar").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  document.querySelectorAll("[data-sm]").forEach(b =>
    b.addEventListener("click", () => {
      const def = defs[b.dataset.sm];
      if (!def) return;
      dlg.querySelector("h3").textContent = def.t;
      dlg.querySelector(".sm-cuerpo").innerHTML = def.d;
      dlg.showModal();
      dlg.scrollTop = 0;   // el foco en "¡Entendido!" deja los popups largos a media altura
    }));
}

/* Protoboard genérica para popups y diagramas: la MISMA matriz que la de los
   tutoriales de armado (protoboardArmado): 16 columnas cada 26 px, rieles de
   energía con su línea y su fila de hoyitos POR CADA polo, canal central y
   5+5 filas. Tamaño fijo 460×340; o = {x, y}.
   Centros útiles (relativos): columnas x+28+c·26; hoyitos riel superior
   + y+26 y − y+44; filas superiores y+88…y+152 (paso 16); canal y+162…y+184
   (centro y+173); filas inferiores y+194…y+258; riel inferior − y+298 y
   + y+316 (líneas − y+286 y + y+328). */
function protoboardSVG(o) {
  const colX = c => o.x + 28 + c * 26;
  const hoyo = (cx, cy) => `<rect x='${cx - 5}' y='${cy - 5}' width='10' height='10' rx='2' fill='#E9EDEC' stroke='#C2CBCA' stroke-width='2'/>`;
  const fila = cy => { let f = ""; for (let c = 0; c < 16; c++) f += hoyo(colX(c), cy); return f; };
  const linea = (yl, color) => `<line x1='${o.x + 18}' y1='${yl}' x2='${o.x + 442}' y2='${yl}' stroke='${color}' stroke-width='3'/>`;
  const signo = (yl, t, color) => `<text x='${o.x + 10}' y='${yl + 4}' font-size='12' fill='${color}' text-anchor='middle' font-family='monospace'>${t}</text>`;
  let s = `<rect x='${o.x}' y='${o.y}' width='460' height='340' rx='10' fill='#FAFAFA' stroke='#D8DEDD' stroke-width='3'/>`;
  s += `<rect x='${o.x}' y='${o.y + 162}' width='460' height='22' fill='#EFF2F1'/>`;
  s += linea(o.y + 14, "#E84855") + signo(o.y + 14, "+", "#E84855") + fila(o.y + 26);
  s += fila(o.y + 44) + linea(o.y + 56, "#37474F") + signo(o.y + 56, "−", "#37474F");
  for (let f = 0; f < 5; f++) s += fila(o.y + 88 + f * 16);
  for (let f = 0; f < 5; f++) s += fila(o.y + 194 + f * 16);
  s += linea(o.y + 286, "#37474F") + signo(o.y + 286, "−", "#37474F") + fila(o.y + 298);
  s += fila(o.y + 316) + linea(o.y + 328, "#E84855") + signo(o.y + 328, "+", "#E84855");
  return s;
}

/* Piezas sueltas para los diagramas de circuito de los popups de proyecto.
   Todas retornan strings SVG en las coordenadas del viewBox receptor. */

/* Placa Arduino esquemática: caja teal con pads etiquetados.
   o = {x, y, pads: ["5V", "pin 2", …]}. Retorna {svg, padY(i), right}. */
function arduinoSVG(o) {
  const alto = 50 + o.pads.length * 48;
  let s = `<rect x='${o.x}' y='${o.y}' width='120' height='${alto}' rx='12' fill='#00878F'/>` +
    `<text x='${o.x + 60}' y='${o.y + 27}' text-anchor='middle' fill='#fff' font-family='monospace' font-size='14'>ARDUINO</text>`;
  o.pads.forEach((p, i) => {
    const y = o.y + 40 + i * 48;
    s += `<rect x='${o.x + 8}' y='${y}' width='104' height='24' rx='4' fill='#143642'/>` +
      `<text x='${o.x + 60}' y='${y + 17}' text-anchor='middle' fill='#fff' font-family='monospace' font-size='13'>${p}</text>`;
  });
  return { svg: s, padY: i => o.y + 52 + i * 48, right: o.x + 122 };
}

/* LED en la protoboard, estilo Tinkercad: patita + (ánodo) a la izquierda,
   lado plano y patita − (cátodo) a la derecha, con su resistencia de 220 Ω
   (rojo-rojo-café) bajando al riel −. cx debe ser columna + 13 para que las
   dos patitas caigan en columnas vecinas; las puntas quedan en cy+40, así
   que usa cy = centroDeFila − 40. rielY = centro de los hoyitos del riel −. */
function ledSVG(cx, cy, rielY, color = "#E84855", borde = "#B03744") {
  return `<line x1='${cx - 8}' y1='${cy + 10}' x2='${cx - 13}' y2='${cy + 40}' stroke='${borde}' stroke-width='4' stroke-linecap='round'/>` +
    `<line x1='${cx + 8}' y1='${cy + 10}' x2='${cx + 13}' y2='${cy + 36}' stroke='${borde}' stroke-width='4' stroke-linecap='round'/>` +
    `<line x1='${cx + 13}' y1='${cy + 36}' x2='${cx + 13}' y2='${rielY}' stroke='#9aa7ad' stroke-width='4'/>` +
    `<path d='M ${cx + 9} ${cy - 9} A 13 13 0 1 0 ${cx + 9} ${cy + 9} Z' fill='${color}' stroke='${borde}' stroke-width='3'/>` +
    `<text x='${cx - 17}' y='${cy - 14}' text-anchor='middle' font-size='12' font-weight='700' fill='#5E7480' font-family='monospace'>+</text>` +
    `<text x='${cx + 19}' y='${cy - 14}' text-anchor='middle' font-size='12' font-weight='700' fill='#5E7480' font-family='monospace'>−</text>` +
    `<rect x='${cx + 4}' y='${cy + 44}' width='18' height='32' rx='4' fill='#D7B899' stroke='#8D6E63' stroke-width='2'/>` +
    `<rect x='${cx + 4}' y='${cy + 50}' width='18' height='4' fill='#D32F2F'/>` +
    `<rect x='${cx + 4}' y='${cy + 57}' width='18' height='4' fill='#D32F2F'/>` +
    `<rect x='${cx + 4}' y='${cy + 64}' width='18' height='4' fill='#795548'/>`;
}

/* Pulsador de 4 patitas con tapa roja, centrado en (cx, cy) sobre el canal.
   Las patitas caen en cx ± 26 (columnas vecinas de a dos) y en cy ± 21:
   con cy = centro del canal (y+173) quedan justo en las filas que lo rodean
   (y+152 y y+194). Las dos patitas de un mismo lado son el mismo nodo. */
function botonSVG(cx, cy) {
  let s = `<g stroke='#B0BEC5' stroke-width='5' stroke-linecap='round'>`;
  [[-16, -15, -26, -21], [16, -15, 26, -21], [-16, 15, -26, 21], [16, 15, 26, 21]]
    .forEach(([a, b, c, d]) => s += `<line x1='${cx + a}' y1='${cy + b}' x2='${cx + c}' y2='${cy + d}'/>`);
  s += `</g><rect x='${cx - 22}' y='${cy - 18}' width='44' height='36' rx='6' fill='#2E3B41'/>` +
    `<circle cx='${cx}' cy='${cy}' r='13' fill='#E84855' stroke='#B03744' stroke-width='3'/>`;
  return s;
}

/* Resistencia de 10 kΩ vertical (café-negro-naranjo) desde (x, y). */
function resistencia10kSVG(x, y) {
  return `<rect x='${x}' y='${y}' width='18' height='34' rx='4' fill='#D7B899' stroke='#8D6E63' stroke-width='2'/>` +
    `<rect x='${x}' y='${y + 6}' width='18' height='4' fill='#8D3B0B'/>` +
    `<rect x='${x}' y='${y + 13}' width='18' height='4' fill='#000'/>` +
    `<rect x='${x}' y='${y + 20}' width='18' height='4' fill='#E8A33D'/>`;
}

/* Circuito completo botón (pin 2, con 10 kΩ) + LED (pin 13, con 220 Ω)
   compartiendo protoboard — el del proyecto de S4, reusado en S6.
   Las etiquetas nombran cada mitad del circuito. */
function circuitoBotonLedSVG(etiqBoton, etiqLed) {
  return "<svg viewBox='0 0 640 400' style='width:100%' aria-label='Botón y LED juntos en la protoboard'>"
    + arduinoSVG({ x: 6, y: 70, pads: ["pin 13", "5V", "pin 2", "GND"] }).svg
    + protoboardSVG({ x: 150, y: 30 })
    + `<text x='308' y='105' text-anchor='middle' font-size='13' fill='#5E7480' font-family='Nunito, sans-serif' font-weight='700'>${etiqBoton}</text>`
    + `<text x='503' y='105' text-anchor='middle' font-size='13' fill='#5E7480' font-family='Nunito, sans-serif' font-weight='700'>${etiqLed}</text>`
    + botonSVG(308, 203)
    + "<path d='M128 122 C 300 126, 430 170, 490 250' fill='none' stroke='#FB8C00' stroke-width='6' stroke-linecap='round'/>"
    + "<path d='M128 170 C 190 168, 240 166, 280 166' fill='none' stroke='#E84855' stroke-width='6' stroke-linecap='round'/>"
    + "<path d='M128 218 C 210 228, 290 237, 332 240' fill='none' stroke='#4C7CFF' stroke-width='6' stroke-linecap='round'/>"
    + "<line x1='334' y1='246' x2='334' y2='328' stroke='#9aa7ad' stroke-width='4'/>"
    + resistencia10kSVG(325, 254)
    + "<text x='352' y='276' font-size='12' fill='#5E7480' font-family='Nunito, sans-serif'>10 kΩ</text>"
    + ledSVG(503, 232, 328)
    + "<text x='538' y='300' font-size='12' fill='#5E7480' font-family='Nunito, sans-serif'>220 Ω</text>"
    + "<path d='M128 266 C 148 296, 160 318, 175 326' fill='none' stroke='#37474F' stroke-width='6' stroke-linecap='round'/>"
    + "</svg>";
}

/* Matriz de la protoboard de los tutoriales de armado paso a paso (S3-S5):
   agujeritos, rieles con +/−, letras de fila y números de columna.
   Rellena el <g> dado; el rect del tablero y el canal van en el HTML de cada
   slide (viewBox 620x400, tablero x150 y30 w460 h340, columnas colX = 178+c*26). */
function protoboardArmado(g) {
  const NS = "http://www.w3.org/2000/svg";
  const poner = (tag, attrs, texto) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (texto !== undefined) e.textContent = texto;
    g.appendChild(e);
  };
  const colX = c => 178 + c * 26;
  [56, 74, 118, 134, 150, 166, 182, 224, 240, 256, 272, 288, 328, 346].forEach(cy => {
    for (let c = 0; c < 16; c++)
      poner("rect", { x: colX(c) - 5, y: cy - 5, width: 10, height: 10, rx: 2, fill: "#E9EDEC", stroke: "#C2CBCA", "stroke-width": 2 });
  });
  [[44, "#E84855"], [86, "#37474F"], [316, "#37474F"], [358, "#E84855"]].forEach(([y, col]) =>
    poner("line", { x1: 168, y1: y, x2: 592, y2: y, stroke: col, "stroke-width": 3 }));
  [[160, 60, "+", "#E84855"], [160, 79, "−", "#37474F"], [160, 333, "−", "#37474F"], [160, 351, "+", "#E84855"],
   [600, 60, "+", "#E84855"], [600, 79, "−", "#37474F"], [600, 333, "−", "#37474F"], [600, 351, "+", "#E84855"]]
    .forEach(([x, y, t, col]) => poner("text", { x, y, "font-size": 12, fill: col, "text-anchor": "middle", "font-family": "monospace" }, t));
  ["J", "I", "H", "G", "F"].forEach((L, f) => poner("text", { x: 162, y: 122 + f * 16, "font-size": 11, fill: "#98A6A4", "text-anchor": "middle", "font-family": "monospace" }, L));
  ["E", "D", "C", "B", "A"].forEach((L, f) => poner("text", { x: 162, y: 228 + f * 16, "font-size": 11, fill: "#98A6A4", "text-anchor": "middle", "font-family": "monospace" }, L));
  [0, 4, 9, 14].forEach(c => poner("text", { x: colX(c), y: 104, "font-size": 11, fill: "#98A6A4", "text-anchor": "middle", "font-family": "monospace" }, c + 1));
}

/* Utilidad compartida: hace parpadear un elemento .led con tiempos dados.
   Devuelve una función para detener el parpadeo. */
function parpadear(led, msOn, msOff) {
  let vivo = true, timer;
  (function ciclo(encendido) {
    if (!vivo) return;
    led.classList.toggle("on", encendido);
    timer = setTimeout(() => ciclo(!encendido), encendido ? msOn() : msOff());
  })(true);
  return () => { vivo = false; clearTimeout(timer); led.classList.remove("on"); };
}
