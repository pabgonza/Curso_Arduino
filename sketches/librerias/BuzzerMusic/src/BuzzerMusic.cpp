#include "BuzzerMusic.h"
#include "Arduino.h"

BuzzerMusic::BuzzerMusic(int buzzerPin)
{
    _buzzerPin = buzzerPin;
}

void BuzzerMusic::play(const int melody[], int nNotes, int tempo)
{
    // duracion de una nota redonda en ms
    int wholenote = (60000 * 4) / tempo;

    // el arreglo trae pares {nota, duracion}
    for (int i = 0; i < nNotes * 2; i += 2)
    {
        int divider = melody[i + 1];
        if (divider == 0)
            continue;

        int noteDuration = wholenote / abs(divider);
        if (divider < 0)
            noteDuration *= 1.5; // negativa = nota con puntillo

        // la nota suena el 90% de su duracion; el 10% queda de silencio
        if (melody[i] > 0)
            tone(_buzzerPin, melody[i], noteDuration * 0.9);

        delay(noteDuration);
        noTone(_buzzerPin);
    }
}

void BuzzerMusic::imperialMarch(int tempo)
{
    const int melody[] = {
        // Dart Vader theme (Imperial March) - Star Wars
        // Score available at https://musescore.com/user/202909/scores/1141521
        // The tenor saxophone part was used
        NOTE_A4,4, NOTE_A4,4, NOTE_A4,4, NOTE_F4,-8, NOTE_C5,16,

        NOTE_A4,4, NOTE_F4,-8, NOTE_C5,16, NOTE_A4,2,//4
        NOTE_E5,4, NOTE_E5,4, NOTE_E5,4, NOTE_F5,-8, NOTE_C5,16,
        NOTE_A4,4, NOTE_F4,-8, NOTE_C5,16, NOTE_A4,2,

        NOTE_A5,4, NOTE_A4,-8, NOTE_A4,16, NOTE_A5,4, NOTE_GS5,-8, NOTE_G5,16, //7
        NOTE_DS5,16, NOTE_D5,16, NOTE_DS5,8, REST,8, NOTE_A4,8, NOTE_DS5,4, NOTE_D5,-8, NOTE_CS5,16,

        NOTE_C5,16, NOTE_B4,16, NOTE_C5,16, REST,8, NOTE_F4,8, NOTE_GS4,4, NOTE_F4,-8, NOTE_A4,-16,//9
        NOTE_C5,4, NOTE_A4,-8, NOTE_C5,16, NOTE_E5,2,

        NOTE_A5,4, NOTE_A4,-8, NOTE_A4,16, NOTE_A5,4, NOTE_GS5,-8, NOTE_G5,16, //7
        NOTE_DS5,16, NOTE_D5,16, NOTE_DS5,8, REST,8, NOTE_A4,8, NOTE_DS5,4, NOTE_D5,-8, NOTE_CS5,16,

        NOTE_C5,16, NOTE_B4,16, NOTE_C5,16, REST,8, NOTE_F4,8, NOTE_GS4,4, NOTE_F4,-8, NOTE_A4,-16,//9
        NOTE_A4,4, NOTE_F4,-8, NOTE_C5,16, NOTE_A4,2,
    };

    int nNotes = sizeof(melody) / sizeof(melody[0]) / 2;
    play(melody, nNotes, tempo);
}

void BuzzerMusic::happyBirthday(int tempo)
{
    const int melody[] = {
        // Happy Birthday
        // Score available at https://musescore.com/user/8221/scores/26906

        NOTE_C4,4, NOTE_C4,8,
        NOTE_D4,-4, NOTE_C4,-4, NOTE_F4,-4,
        NOTE_E4,-2, NOTE_C4,4, NOTE_C4,8,
        NOTE_D4,-4, NOTE_C4,-4, NOTE_G4,-4,
        NOTE_F4,-2, NOTE_C4,4, NOTE_C4,8,

        NOTE_C5,-4, NOTE_A4,-4, NOTE_F4,-4,
        NOTE_E4,-4, NOTE_D4,-4, NOTE_AS4,4, NOTE_AS4,8,
        NOTE_A4,-4, NOTE_F4,-4, NOTE_G4,-4,
        NOTE_F4,-2,
    };

    int nNotes = sizeof(melody) / sizeof(melody[0]) / 2;
    play(melody, nNotes, tempo);
}

void BuzzerMusic::marioBros(int tempo)
{
    const int melody[] = {
        // Mario Bros main song

        NOTE_E7, 12, NOTE_E7, 12, REST, 12, NOTE_E7, 12,
        REST, 12, NOTE_C7, 12, NOTE_E7, 12, REST, 12,
        NOTE_G7, 12, REST, 12, REST, 12,  REST, 12,
        NOTE_G6, 12, REST, 12, REST, 12, REST, 12,

        NOTE_C7, 12, REST, 12, REST, 12, NOTE_G6, 12,
        REST, 12, REST, 12, NOTE_E6, 12, REST, 12,
        REST, 12, NOTE_A6, 12, REST, 12, NOTE_B6, 12,
        REST, 12, NOTE_AS6, 12, NOTE_A6, 12, REST, 12,

        NOTE_G6, 9, NOTE_E7, 9, NOTE_G7, 9,
        NOTE_A7, 12, REST, 12, NOTE_F7, 12, NOTE_G7, 12,
        REST, 12, NOTE_E7, 12, REST, 12, NOTE_C7, 12,
        NOTE_D7, 12, NOTE_B6, 12, REST, 12, REST, 12,

        NOTE_C7, 12, REST, 12, REST, 12, NOTE_G6, 12,
        REST, 12, REST, 12, NOTE_E6, 12, REST, 12,
        REST, 12, NOTE_A6, 12, REST, 12, NOTE_B6, 12,
        REST, 12, NOTE_AS6, 12, NOTE_A6, 12, REST, 12,

        NOTE_G6, 9, NOTE_E7, 9, NOTE_G7, 9,
        NOTE_A7, 12, REST, 12, NOTE_F7, 12, NOTE_G7, 12,
        REST, 12, NOTE_E7, 12, REST, 12, NOTE_C7, 12,
        NOTE_D7, 12, NOTE_B6, 12, REST, 12, REST, 12,
    };

    int nNotes = sizeof(melody) / sizeof(melody[0]) / 2;
    play(melody, nNotes, tempo);
}

void BuzzerMusic::odeToJoy(int tempo)
{
    const int melody[] = {
        // Ode to Joy

        NOTE_E4,4,  NOTE_E4,4,  NOTE_F4,4,  NOTE_G4,4,//1
        NOTE_G4,4,  NOTE_F4,4,  NOTE_E4,4,  NOTE_D4,4,
        NOTE_C4,4,  NOTE_C4,4,  NOTE_D4,4,  NOTE_E4,4,
        NOTE_E4,-4, NOTE_D4,8,  NOTE_D4,2,

        NOTE_E4,4,  NOTE_E4,4,  NOTE_F4,4,  NOTE_G4,4,//4
        NOTE_G4,4,  NOTE_F4,4,  NOTE_E4,4,  NOTE_D4,4,
        NOTE_C4,4,  NOTE_C4,4,  NOTE_D4,4,  NOTE_E4,4,
        NOTE_D4,-4,  NOTE_C4,8,  NOTE_C4,2,

        NOTE_D4,4,  NOTE_D4,4,  NOTE_E4,4,  NOTE_C4,4,//8
        NOTE_D4,4,  NOTE_E4,8,  NOTE_F4,8,  NOTE_E4,4, NOTE_C4,4,
        NOTE_D4,4,  NOTE_E4,8,  NOTE_F4,8,  NOTE_E4,4, NOTE_D4,4,
        NOTE_C4,4,  NOTE_D4,4,  NOTE_G3,2,

        NOTE_E4,4,  NOTE_E4,4,  NOTE_F4,4,  NOTE_G4,4,//12
        NOTE_G4,4,  NOTE_F4,4,  NOTE_E4,4,  NOTE_D4,4,
        NOTE_C4,4,  NOTE_C4,4,  NOTE_D4,4,  NOTE_E4,4,
        NOTE_D4,-4,  NOTE_C4,8,  NOTE_C4,2
    };

    int nNotes = sizeof(melody) / sizeof(melody[0]) / 2;
    play(melody, nNotes, tempo);
}
