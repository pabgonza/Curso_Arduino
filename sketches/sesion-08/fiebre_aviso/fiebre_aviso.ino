// Sesion 8 - Reto: avisar solo al cruzar la raya
// DHT11 en el pin 2, buzzer en el pin 8.
// El monitor serie escribe "¡Hace calor!" una sola vez, justo al pasar de 30.

#include <DHT.h>
DHT dht(2, DHT11);

int yaAviso = 0;   // 0 = todavia no lo hemos dicho, 1 = ya lo dijimos

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float t = dht.readTemperature();

  if (t > 30) {
    tone(8, 880);
    if (yaAviso == 0) {             // la primera vez que cruza...
      Serial.println("¡Hace calor!");
      yaAviso = 1;                  // ...lo decimos y lo anotamos
    }
  } else {
    noTone(8);
    yaAviso = 0;                    // bajo: listo para avisar de nuevo
  }
  delay(1000);
}
