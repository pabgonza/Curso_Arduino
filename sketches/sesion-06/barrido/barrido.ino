// Sesion 6 - El barrido: contar mientras se mueve
// Mismos cables que servo.ino: cafe a GND, rojo a 5V, naranjo al pin 9.

#include <Servo.h>
Servo miServo;

void setup() {
  miServo.attach(9);
}

void loop() {
  for (int a = 0; a <= 180; a++) {   // empieza en 0, sube de a uno hasta 180
    miServo.write(a);
    delay(15);
  }
}
