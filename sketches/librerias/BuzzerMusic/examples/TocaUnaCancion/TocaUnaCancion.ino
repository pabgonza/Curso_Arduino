// BuzzerMusic - ejemplo 1: tocar una cancion (version bloqueante)
// La forma mas simple: una linea y suena la cancion completa.
// Ojo: mientras suena, el Arduino no hace nada mas (ver el ejemplo
// MusicaSinBloquear para tocar y atender cosas a la vez).
//
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
