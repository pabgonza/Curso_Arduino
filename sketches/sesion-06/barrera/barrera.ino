// Sesion 6 - La barrera del paso a nivel (proyecto de la sesion)
// Boton en el pin 2 (con su resistencia de 10 kOhm a GND),
// LED en el pin 13 (con su resistencia de 220 ohm),
// servo: cafe a GND, rojo a 5V, naranjo al pin 9.
//
// Mientras el boton este apretado, la barrera baja y la luz parpadea.
// Al soltarlo, la barrera sube y la luz se apaga.

#include <Servo.h>
Servo barrera;

void setup() {
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
  barrera.attach(9);
  barrera.write(90);   // barrera arriba (brazo vertical) al partir...
  delay(500);          // ...y tiempo de llegar
}

void loop() {
  if (digitalRead(2) == HIGH) {
    barrera.write(0);          // barrera abajo (brazo horizontal)
    digitalWrite(13, HIGH);    // y la luz parpadea
    delay(300);
    digitalWrite(13, LOW);
    delay(300);
  } else {
    barrera.write(90);         // barrera arriba
	delay(300);                // esperamos que llegue
    digitalWrite(13, LOW);
  }
}
