// Sesion 9 - La respiracion
// Modulo LED RGB: R al pin 3 (G y B quedan sin usar), - a GND.

void setup() {
}

void loop() {
  for (int b = 0; b <= 255; b++) {    // inhala: sube el brillo
    analogWrite(3, b);
    delay(5);
  }
  for (int b = 255; b >= 0; b--) {    // exhala: lo baja
    analogWrite(3, b);
    delay(5);
  }
}
