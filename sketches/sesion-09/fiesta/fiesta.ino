// Sesion 9 - Reto: modo fiesta
// Modulo LED RGB: R al pin 3, G al pin 5, B al pin 6, - a GND.
// Cada medio segundo, un color al azar.

void setup() {
}

void loop() {
  color(random(256), random(256), random(256));   // random(256): un numero de 0 a 255
  delay(500);
}

void color(int r, int g, int b) {
  analogWrite(3, r);
  analogWrite(5, g);
  analogWrite(6, b);
}
