// Sesion 9 - Reto: la lampara respira en tu color
// LED RGB de anodo comun: la patita larga a 5V; R al pin 6, G al pin 5, B al pin 3,
// cada color con su resistencia de 220 ohm. Se prende al reves: 0 = a todo, 255 = apagado.
// La receta del morado es (150, 0, 255): map escala cada ingrediente segun el brillo.

void setup() {
}

void loop() {
  for (int b = 0; b <= 255; b++) {        // inhala
    color(map(b, 0, 255, 0, 150), 0, b);  // morado, de apagado a todo
    delay(5);
  }
  for (int b = 255; b >= 0; b--) {        // exhala
    color(map(b, 0, 255, 0, 150), 0, b);
    delay(5);
  }
}

void color(int r, int g, int b) {
  analogWrite(6, 255 - r);   // al reves: 255 - r prende r
  analogWrite(5, 255 - g);
  analogWrite(3, 255 - b);
}
