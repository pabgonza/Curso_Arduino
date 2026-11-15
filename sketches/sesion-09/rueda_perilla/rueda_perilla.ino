// Sesion 9 - La rueda de colores con la perilla
// Perilla: orillas a 5V y GND, la del medio a A0.
// LED RGB de anodo comun: la patita larga a 5V; R al pin 6, G al pin 5, B al pin 3,
// cada color con su resistencia de 220 ohm. Se prende al reves: 0 = a todo, 255 = apagado.

void setup() {
}

void loop() {
  int pos = analogRead(A0) / 4;   // de 0-1023 a 0-255
  rueda(pos);
}

void color(int r, int g, int b) {
  analogWrite(6, 255 - r);   // al reves: 255 - r prende r
  analogWrite(5, 255 - g);
  analogWrite(3, 255 - b);
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
