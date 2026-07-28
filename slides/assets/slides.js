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
    }));
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
