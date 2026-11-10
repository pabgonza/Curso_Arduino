// Sesion 6 - Reto: la perilla manda que tan rapido saluda
// Servo en el pin 9. Perilla: orillas a 5V y GND, la del medio a A0.

#include <Servo.h>
Servo brazo;

void setup() {
  brazo.attach(9);
}

void loop() {
  int velocidad = map(analogRead(A0), 0, 1023, 2, 40);   // de 0-1023 a una pausa de 2 a 40
  for (int a = 60; a <= 120; a++) {   // de ida
    brazo.write(a);
    delay(velocidad);
  }
  for (int a = 120; a >= 60; a--) {   // y de vuelta
    brazo.write(a);
    delay(velocidad);
  }
}
