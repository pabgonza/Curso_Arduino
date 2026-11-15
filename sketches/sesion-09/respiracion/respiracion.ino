// Sesion 9 - La respiracion
// LED RGB de anodo comun: la patita larga a 5V; R al pin 6, G al pin 5, B al pin 3,
// cada color con su resistencia de 220 ohm. Respira en rojo.

void setup() {
}

void loop() {
  for (int b = 0; b <= 255; b++) {    // inhala: sube el brillo
    color(b, 0, 0);
    delay(5);
  }
  for (int b = 255; b >= 0; b--) {    // exhala: lo baja
    color(b, 0, 0);
    delay(5);
  }
}

// la de la receta: tres numeros de 0 a 255
void color(int r, int g, int b) {
  analogWrite(6, 255 - r);   // al reves: 255 - r prende r
  analogWrite(5, 255 - g);
  analogWrite(3, 255 - b);
}
