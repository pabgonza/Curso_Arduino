// Sesion 6 - El barrido: contar mientras se mueve
// Mismos cables que servo.ino: cafe a GND, rojo a 5V, naranjo al pin 9.

#include <Servo.h>
Servo miServo;

void setup() {
  miServo.attach(9);
  miServo.write(0);   // a la posicion de partida...
  delay(500);         // ...y un momento para llegar, antes de barrer
}

void loop() {
  for (int a = 0; a <= 180; a++) {   // de ida: sube de a uno hasta 180
    miServo.write(a);
    delay(15);
  }
  for (int a = 180; a >= 0; a--) {   // y de vuelta, contando al reves
    miServo.write(a);
    delay(15);
  }
}
