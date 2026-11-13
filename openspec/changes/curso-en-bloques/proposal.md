# Proposal

## Why

El curso enseña con Arduino IDE y Tinkercad, y lleva a los alumnos de bloques a C++ (S2-S4 lado a lado, S8-S9 solo código). Ya existe Bloquino, la plataforma propia (`../Plataforma_Arduino_Bloques`), que cubre las sesiones con bloques, simulación y carga a la placa, en la sala y sin cuentas. Pablo decidió (2026-11-13) pasar el curso entero a Bloquino y mostrar los programas como bloques.

## What Changes

- **Herramienta**: Bloquino reemplaza a Arduino IDE y Tinkercad. La sesión 2 deja de instalar el IDE: enseña a entrar a la sala, conocer la página, simular y cargar el Blink. Las menciones a Tinkercad e IDE de las otras sesiones pasan a Bloquino.
- **Programas en bloques**: cada programa de las slides (proyectos, ejemplos y soluciones de retos) se muestra como imagen de sus bloques de Bloquino, capturada con Playwright. El C++ deja de estar a la vista y pasa a un popup «¿Saber más?» con el código que generan los bloques. Se abandona el gradiente hacia solo código.
- **Interactivos con código** (por ejemplo el deslizador de `delay`): muestran el bloque equivalente.
- **Proyectos**: cada programa suma `sketches/sesion-NN/<nombre>/<nombre>.bloquino` (circuito de la sesión + bloques), junto al `.ino`, que sigue sirviendo para el IDE.
- **Generador**: un guion que arma cada proyecto en Bloquino, lo simula, captura sus bloques y guarda el `.bloquino` y el C++ generado.
- **Documentos**: README, temario, decisiones, `CLAUDE.md` y `sketches/README.md` al día.

## Capabilities

### New Capabilities
- `herramienta/bloquino`: el curso se hace en Bloquino.
- `programas/bloques`: cómo se muestran los programas.
- `programas/proyectos`: el `.bloquino` de cada programa y su generador.

## Impact

- `slides/sesion-02.html` a `sesion-09.html`, `slides/assets/slides.css` y `slides.js`; `sesion-00` y `sesion-01` solo si nombran el IDE como herramienta del curso.
- `sketches/` (un `.bloquino` por programa), `recursos/img/bloques/`, `recursos/img/pantallazos/` (capturas de Bloquino).
- Se trabaja en la rama `bloquino`; `main` (GitHub Pages) no cambia hasta que Pablo lo apruebe.
- Fuera: la sesión 10 (no tiene slides todavía) y cambios a Bloquino.
