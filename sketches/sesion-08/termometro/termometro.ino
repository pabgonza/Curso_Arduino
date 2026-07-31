// Sesion 8 - El termometro (DHT11)
// Cables: + a 5V, - a GND, la patita de datos al pin 2.
// Necesita la libreria "DHT sensor library" (de Adafruit):
// se instala desde el gestor de librerias del IDE (icono de libros).
// Abre el monitor serie a 9600.

#include <DHT.h>
DHT dht(2, DHT11);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float t = dht.readTemperature();
  Serial.print("Temperatura: ");
  Serial.println(t);
  delay(1000);   // el DHT11 no puede medir mas rapido que esto
}
