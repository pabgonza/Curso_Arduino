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

/* Protoboard genérica reutilizable: tablero con rieles de energía (líneas,
   hoyitos y signos +/−), canal central y matriz de hoyitos.
   Retorna un string SVG para incrustar en popups o diagramas.
   o = {x, y, w, h} en coordenadas del viewBox del SVG que la recibe. */
function protoboardSVG(o) {
  const colIni = o.x + 24, colFin = o.x + o.w - 24;
  const canalY = o.y + o.h / 2 - 11;
  const negroInf = o.y + o.h - 36;
  const hoyo = (cx, cy) => `<rect x='${cx - 5}' y='${cy}' width='10' height='10' rx='2' fill='#E9EDEC' stroke='#C2CBCA' stroke-width='2'/>`;
  const fila = cy => { let f = ""; for (let cx = colIni; cx <= colFin; cx += 26) f += hoyo(cx, cy); return f; };
  const riel = (yl, color, signo) =>
    `<line x1='${o.x + 16}' y1='${yl}' x2='${o.x + o.w - 16}' y2='${yl}' stroke='${color}' stroke-width='3'/>` +
    `<text x='${o.x + 7}' y='${yl + 5}' font-size='12' fill='${color}' font-family='monospace'>${signo}</text>`;
  let s = `<rect x='${o.x}' y='${o.y}' width='${o.w}' height='${o.h}' rx='10' fill='#FAFAFA' stroke='#D8DEDD' stroke-width='3'/>`;
  s += `<rect x='${o.x}' y='${canalY}' width='${o.w}' height='22' fill='#EFF2F1'/>`;
  s += riel(o.y + 22, "#E84855", "+") + fila(o.y + 26) + riel(o.y + 44, "#37474F", "−");
  for (let cy = o.y + 68; cy + 10 <= canalY - 6; cy += 18) s += fila(cy);
  for (let cy = canalY + 34; cy + 10 <= negroInf - 8; cy += 18) s += fila(cy);
  s += riel(negroInf, "#37474F", "−") + fila(negroInf + 4) + riel(o.y + o.h - 14, "#E84855", "+");
  return s;
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
