// Capturas de Bloquino para el tutorial de la sesión 2 (recursos/img/pantallazos/bq-*.jpg).
// Se arma y corre como una sesión: node armar.mjs 02-pantallazos (no usa guardar);
// las capturas quedan en curso-bloques/02-pantallazos y se copian a mano.
const foto = (n) => page.screenshot({ path: SALIDA + n + '.jpg', type: 'jpeg', quality: 82 });
const codigo = async (abierto) => {
  if ((await page.locator('.bq-programa').count() > 0) !== abierto) await page.getByRole('button', { name: 'Código', exact: true }).click();
  await espera(1500);
};
await nuevo();
await page.setViewportSize({ width: 1280, height: 720 });
await limpiar();
await foto('bq-pagina');
await programar([alIniciar(porSiempre(led('HIGH', 13), esperarB(1), led('LOW', 13), esperarB(1)))]);
await codigo(true);
await foto('bq-blink');
await page.getByRole('tab', { name: 'Bloques + Texto' }).click();
await espera(1200);
await foto('bq-bloques-texto');
await page.getByRole('tab', { name: 'Bloques', exact: true }).click();
await codigo(false);
await page.getByRole('button', { name: 'Iniciar simulación' }).click();
await page.getByRole('button', { name: 'Detener simulación' }).waitFor({ timeout: 60000 });
for (let i = 0; i < 40 && !(await page.evaluate(() => !!document.querySelector('wokwi-arduino-uno').led13)); i++) await espera(50);
await foto('bq-simulando');
await detener();
// Carga a una placa simulada dentro de la página (habla como el bootloader).
await page.evaluate(() => {
  const flash = new Uint8Array(32768).fill(0xff);
  let salida, entrada, direccion = 0;
  const decir = (bytes) => { try { salida.enqueue(bytes); } catch { /* cerrado */ } };
  const ok = (datos = []) => decir(Uint8Array.from([0x14, ...datos, 0x10]));
  const puerto = {
    async open({ baudRate }) {
      entrada = [];
      this.readable = new ReadableStream({ start: (c) => { salida = c; } });
      this.writable = new WritableStream({ write: async (trozo) => {
        if (baudRate !== 115200) return;
        entrada.push(...trozo);
        for (;;) {
          const [orden, a, b] = entrada;
          const largo = orden === 0x55 ? 4 : orden === 0x74 ? 5 : orden === 0x64 ? 5 + ((a << 8) | b) : 2;
          if (entrada.length < largo) return;
          const cuerpo = entrada.splice(0, largo);
          if (orden === 0x64) await new Promise((r) => setTimeout(r, 250));
          if (orden === 0x75) ok([0x1e, 0x95, 0x0f]);
          else if (orden === 0x74) ok([...flash.subarray(direccion, direccion + ((a << 8) | b))]);
          else {
            if (orden === 0x55) direccion = (a | (b << 8)) * 2;
            if (orden === 0x64) flash.set(cuerpo.slice(4, -1), direccion);
            ok();
          }
        }
      } });
    },
    async setSignals() {},
    async close() {},
  };
  Object.defineProperty(navigator, 'serial', { configurable: true, value: { getPorts: async () => [puerto], addEventListener() {} } });
});
await page.getByRole('button', { name: 'Cargar a la placa' }).click();
const fase = () => page.evaluate(() => document.querySelector('.bq-carga')?.className.split('bq-carga-')[1] ?? '');
for (let t = 0; t < 600 && (await fase()) !== 'grabando'; t++) await espera(50);
await espera(300);
await foto('bq-cargando');
for (let t = 0; t < 1200 && !['lista', 'error'].includes(await fase()); t++) await espera(50);
R.carga = await fase();
await foto('bq-lista');
