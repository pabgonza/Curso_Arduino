// Sesion 8 - El semaforo termico
// DHT11 con la patita de datos al pin 2 (libreria "DHT sensor library").
// LEDs con sus resistencias de 220 ohm: verde en el 12, amarillo en el 11,
// rojo en el 13.

#include <DHT.h>
DHT dht(2, DHT11);

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(13, OUTPUT);
}

void loop() {
  float t = dht.readTemperature();
  Serial.println(t);

  // primero apagamos los tres...
  digitalWrite(12, LOW);
  digitalWrite(11, LOW);
  digitalWrite(13, LOW);

  // ...y prendemos solo el que gana
  if (t < 15) {
    digitalWrite(12, HIGH);   // verde: ¡frio!
  } else if (t < 25) {
    digitalWrite(11, HIGH);   // amarillo: rico
  } else {
    digitalWrite(13, HIGH);   // rojo: ¡calor!
  }
  delay(1000);
}
