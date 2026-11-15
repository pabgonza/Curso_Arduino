// Sesion 6 - Reto: saluda solo cuando aprietas el boton
// Servo en el pin 9 y boton entre el pin 12 y GND (INPUT_PULLUP: apretado = LOW).

#include <Servo.h>
Servo brazo;

int velocidad = 10;

void setup() {
  pinMode(12, INPUT_PULLUP);
  brazo.attach(9);
}

void loop() {
  if (digitalRead(12) == LOW) {    // solo si alguien aprieta
    for (int a = 60; a <= 120; a++) {   // de ida
      brazo.write(a);
      delay(velocidad);
    }
    for (int a = 120; a >= 60; a--) {   // y de vuelta
      brazo.write(a);
      delay(velocidad);
    }
    }
}
