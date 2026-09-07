// Sesion 9 - La receta de cada color
// Modulo LED RGB: R al pin 3, G al pin 5, B al pin 6, - a GND.
// (los tres pines tienen ~ : saben hacer analogWrite)

void setup() {
  // nada que preparar: analogWrite se arregla solo
}

void loop() {
  color(255, 120, 0);     delay(1000);   // naranjo
  color(150, 0, 255);     delay(1000);   // morado
  color(0, 200, 255);     delay(1000);   // celeste
  color(255, 60, 120);    delay(1000);   // rosado
  color(255, 255, 0);     delay(1000);   // amarillo (¡rojo + verde!)
  color(255, 255, 255);   delay(1000);   // blanco
}

// nuestra propia orden: tres numeros de 0 a 255
void color(int r, int g, int b) {
  analogWrite(3, r);
  analogWrite(5, g);
  analogWrite(6, b);
}
