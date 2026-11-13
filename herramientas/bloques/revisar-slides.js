// Revisión de una sesión de slides con Playwright (como dice CLAUDE.md): a
// 1280×720 activa cada slide, mide el desborde, busca imágenes rotas y saca
// una captura por slide. Correr con browser_run_code_unsafe tras poner SESION.
async (page) => {
  const SESION = '02';
  const SALIDA = 'D:/Second_Brain/Personal/Proyectos/Plataforma_Arduino_Bloques/repo/.playwright-mcp/slides-' + SESION + '/';
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(`http://localhost:8123/slides/sesion-${SESION}.html`);
  await page.waitForTimeout(1500);
  const n = await page.evaluate(() => document.querySelectorAll('.slide').length);
  const R = { slides: n, desbordes: [], rotas: [], errores: [] };
  page.on('pageerror', (e) => R.errores.push(String(e.message).slice(0, 200)));
  for (let i = 0; i < n; i++) {
    await page.evaluate((i) => { document.querySelectorAll('.slide').forEach((s, j) => s.classList.toggle('activa', i === j)); }, i);
    await page.waitForTimeout(2000);
    const d = await page.evaluate((i) => { const s = document.querySelectorAll('.slide')[i]; return s.scrollHeight - s.clientHeight; }, i);
    if (d > 4) R.desbordes.push(`${i + 1}: ${d}px`);
    await page.screenshot({ path: `${SALIDA}${String(i + 1).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 70 });
  }
  R.rotas = await page.evaluate(() => [...document.images].filter((im) => im.complete && !im.naturalWidth).map((im) => im.getAttribute('src')));
  // Imágenes dentro de los popups (HTML en cadenas): se prueban cargándolas.
  R.rotasPopups = await page.evaluate(async () => {
    const srcs = [...document.documentElement.innerHTML.matchAll(/src=['"](\.\.\/recursos\/[^'"]+)['"]/g)].map((m) => m[1]);
    const malas = [];
    for (const s of new Set(srcs)) { const ok = await new Promise((r) => { const im = new Image(); im.onload = () => r(true); im.onerror = () => r(false); im.src = s; }); if (!ok) malas.push(s); }
    return malas;
  });
  R.sinCodigo = await page.evaluate(() => [...document.querySelectorAll('[data-sm^="sesion-"]')].map((b) => b.dataset.sm).filter((k) => !window.CODIGO?.[k]));
  return R;
}
