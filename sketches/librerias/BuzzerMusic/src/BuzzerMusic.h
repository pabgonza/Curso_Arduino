// BuzzerMusic - canciones listas para tocar con un buzzer y tone()
// Copyright (c) 2026 Pablo Gonzalez - GPL-3.0
// Melodias transcritas por Robson Couto (github.com/robsoncouto/arduino-songs)

#ifndef BuzzerMusic_h
#define BuzzerMusic_h

#include "pitches.h"

class BuzzerMusic
{
public:
    BuzzerMusic(int buzzerPin);

    // Canciones incluidas. El tempo por defecto es el de la partitura;
    // pasa otro para tocarlas mas rapido o mas lento.
    void imperialMarch(int tempo = 120);
    void happyBirthday(int tempo = 140);
    void marioBros(int tempo = 200);
    void odeToJoy(int tempo = 114);

    // Toca cualquier melodia: pares {nota, duracion}, donde duracion es
    // 4 = negra, 8 = corchea, etc. Negativa = nota con puntillo (dura 1.5x).
    // nNotes es la cantidad de pares.
    void play(const int melody[], int nNotes, int tempo = 120);

private:
    int _buzzerPin;
};

#endif
