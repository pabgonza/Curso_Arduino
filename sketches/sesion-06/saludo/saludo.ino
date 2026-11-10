// Sesion 6 - Reto: el brazo que saluda
// Servo: cafe a GND, rojo a 5V, naranjo al pin 9. Palito de helado pegado al brazo.
// Un saludo es un barrido corto: de 60 a 120 grados y de vuelta.

#include <Servo.h>
Servo brazo;

int velocidad = 10;   // pausa entre grado y grado: 5 = frenetico, 30 = tranquilo

void setup() {
  brazo.attach(9);
}

void loop() {
  for (int a = 60; a <= 120; a++) {   // de ida
    brazo.write(a);
    delay(velocidad);
  }
  for (int a = 120; a >= 60; a--) {   // y de vuelta
    brazo.write(a);
    delay(velocidad);
  }
}
