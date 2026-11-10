// Sesion 4 - Reto: la luz que se queda encendida
// Boton en el pin 2 (con su resistencia de 10 kOhm a GND) y LED en el pin 13.
// Un apreton prende, el siguiente apaga: como el interruptor de tu casa.

int encendida = LOW;   // la cajita que se acuerda: ¿esta prendida la luz?
int antes = LOW;       // como estaba el boton la ultima vez que miramos

void setup() {
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
}

void loop() {
  int ahora = digitalRead(2);
  if (ahora == HIGH && antes == LOW) {   // recien lo apretaron
    if (encendida == LOW) {              // estaba apagada...
      encendida = HIGH;                  // ...ahora prendida
    } else {
      encendida = LOW;                   // y al reves
    }
    digitalWrite(13, encendida);
    delay(50);                           // filtro anti-rebote
  }
  antes = ahora;
}
