// BuzzerMusic - ejemplo: tocar una cancion
// Buzzer pasivo en el pin 8: la patita + al pin, la otra a GND.

#include <BuzzerMusic.h>

BuzzerMusic musica(8);

void setup() {
  musica.marioBros();
  // Prueba tambien:
  // musica.imperialMarch();   // Star Wars
  // musica.happyBirthday();
  // musica.odeToJoy();
  // Y con otro tempo: musica.marioBros(250);
}

void loop() { }
