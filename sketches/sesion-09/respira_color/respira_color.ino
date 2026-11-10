// Sesion 9 - Reto: la lampara respira en tu color
// Modulo LED RGB: R al pin 3, G al pin 5, B al pin 6, - a GND.
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
  analogWrite(3, r);
  analogWrite(5, g);
  analogWrite(6, b);
}
