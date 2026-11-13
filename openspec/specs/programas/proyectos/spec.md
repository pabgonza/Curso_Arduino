# proyectos Specification

## Purpose

Cada programa del curso se puede abrir en Bloquino ya armado, y un generador lo mantiene al día.


## Requirements

### Requirement: Un proyecto Bloquino por programa
Cada programa mostrado SHALL tener `sketches/sesion-NN/<nombre>/<nombre>.bloquino` con el circuito de la sesión y sus bloques, que se abre con «Abrir» en Bloquino y simula sin cambios. El `.ino` SHALL seguir junto a él.

#### Scenario: Abrir el proyecto de una slide
- **WHEN** se abre en Bloquino el `.bloquino` de un programa y se pulsa Iniciar simulación
- **THEN** el circuito aparece armado y el programa hace lo que dice la slide

### Requirement: Generador de proyectos e imágenes
El repositorio SHALL traer un generador que, a partir de la lista de programas por sesión, arma cada proyecto en Bloquino, lo simula, captura la imagen de sus bloques y guarda el `.bloquino`.

#### Scenario: Cambia un programa
- **WHEN** se edita un programa en la lista y se corre el generador
- **THEN** quedan al día su `.bloquino`, su imagen y el C++ del popup
