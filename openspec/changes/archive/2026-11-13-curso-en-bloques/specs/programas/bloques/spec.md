## ADDED Requirements

### Requirement: Programas como bloques
Todo programa mostrado en una slide o en un popup (proyecto, ejemplo o solución de reto) SHALL verse como la imagen de sus bloques en Bloquino. El C++ SHALL quedar disponible en un popup «¿Saber más?», con el código que generan esos bloques.

#### Scenario: Slide de proyecto
- **WHEN** una slide presenta el programa de un proyecto
- **THEN** muestra la imagen de sus bloques, entera y legible a 1280×720, y un «Ver el código» que abre el C++

#### Scenario: Solución de un reto
- **WHEN** el alumno abre la solución de un reto
- **THEN** el popup muestra los bloques de cada nivel, no texto en C++

### Requirement: Interactivos con bloques
Los interactivos que enseñan una instrucción SHALL mostrarla como bloque, con el mismo texto que el bloque de Bloquino.

#### Scenario: Deslizador del parpadeo
- **WHEN** el alumno mueve el deslizador de velocidad de la sesión 2
- **THEN** cambia el número dentro de un bloque «esperar … segundos»
