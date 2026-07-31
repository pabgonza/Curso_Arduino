// Sesion 6 - La perilla magica
// Potenciometro: las patitas de las orillas a 5V y GND, la del medio a A0.
// Servo: cafe a GND, rojo a 5V, naranjo al pin 9.

#include <Servo.h>
Servo miServo;

void setup() {
  miServo.attach(9);
}

void loop() {
  int valor = analogRead(A0);                  // de 0 a 1023
  int angulo = map(valor, 0, 1023, 0, 180);    // traducido a grados
  miServo.write(angulo);
  delay(15);
}
