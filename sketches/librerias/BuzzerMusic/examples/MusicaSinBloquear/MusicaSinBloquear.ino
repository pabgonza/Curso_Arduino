// BuzzerMusic - ejemplo 2: musica sin bloquear
// El Arduino toca Mario Bros y ADEMAS atiende un boton al mismo tiempo:
// start() deja la cancion lista y update() la va avanzando nota a nota,
// sin ningun delay() que congele el resto del programa.
//
// Buzzer en el pin 8, boton en el pin 2 (con resistencia de 10k a GND)
// y LED en el pin 13.

#include <BuzzerMusic.h>

BuzzerMusic musica(8);

void setup() {
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
  musica.start(BuzzerMusic::MARIO_BROS);
}

void loop() {
  musica.update();  // avanza la cancion cuando corresponde; no espera a nadie

  // esto responde al instante, aunque la musica siga sonando
  digitalWrite(13, digitalRead(2));

  // cuando la cancion termina, apretar el boton la vuelve a empezar
  if (!musica.isPlaying() && digitalRead(2) == HIGH) {
    musica.start(BuzzerMusic::MARIO_BROS);
  }
}
