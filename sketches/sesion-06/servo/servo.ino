// Sesion 6 - El primer movimiento del servo
// Cables del servo: cafe (o negro) a GND, rojo a 5V, naranjo al pin 9.
// La libreria Servo ya viene con el Arduino IDE.

#include <Servo.h>
Servo miServo;           // le pongo nombre a mi servo

void setup() {
  miServo.attach(9);     // vive en el pin 9
}

void loop() {
  miServo.write(0);      // ¡al angulo 0!
  delay(1000);
  miServo.write(180);    // ¡ahora al 180!
  delay(1000);
}
