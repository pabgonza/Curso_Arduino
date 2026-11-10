// Sesion 9 - Reto: el arcoiris automatico
// Modulo LED RGB: R al pin 3, G al pin 5, B al pin 6, - a GND.
// pos vive afuera del loop para que no se olvide; sube solo y vuelve a 0.

int pos = 0;

void setup() {
}

void loop() {
  rueda(pos);
  pos++;              // pos = pos + 1, escrito corto
  if (pos > 255) {
    pos = 0;          // vuelta completa: a empezar de nuevo
  }
  delay(20);
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
