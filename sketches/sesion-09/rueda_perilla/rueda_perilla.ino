// Sesion 9 - La rueda de colores con la perilla
// Perilla: orillas a 5V y GND, la del medio a A0.
// Modulo LED RGB: R al pin 3, G al pin 5, B al pin 6, - a GND.

void setup() {
}

void loop() {
  int pos = analogRead(A0) / 4;   // de 0-1023 a 0-255
  rueda(pos);
}

void color(int r, int g, int b) {
  analogWrite(3, r);
  analogWrite(5, g);
  analogWrite(6, b);
}

// una vuelta al arcoiris en tres tramos: pos de 0 a 255
void rueda(int pos) {
  if (pos < 85) {                       // rojo -> verde
    color(255 - pos * 3, pos * 3, 0);
  } else if (pos < 170) {               // verde -> azul
    pos = pos - 85;
    color(0, 255 - pos * 3, pos * 3);
  } else {                              // azul -> rojo
    pos = pos - 170;
    color(pos * 3, 0, 255 - pos * 3);
  }
}
