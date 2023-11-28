#include <Arduino.h>
#include <NewPing.h>

// Pin LED yang digunakan
const int ledPin = LED_BUILTIN;

// BAN KIRI SEMUA
const int IN1 = 23;
const int IN2 = 22;
const int IN3 = 1;
const int IN4 = 3;

// Pin KANAN SEMUA
const int IN5 = 21;
const int IN6 = 19;
const int IN7 = 18;
const int IN8 = 5;

// sensor kowa kowo
const int kiri = 17;
const int kanan = 16;

// ultra sonic sensor
const int trigPin = 4;
const int echoPin = 2;

// const timbangan
const int dataminus = 13;
const int dataplus = 12;

// const pin servo
const int servo = 14;

#define MAX_DISTANCE 200 // aku sih gak tahu yaa xixi

NewPing sonar(trigPin, echoPin, MAX_DISTANCE);

// buatkan funcTION belok kiri

const int kenapa = A0;

void belokkiri()
{
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  // mundur
  digitalWrite(IN5, LOW);
  digitalWrite(IN6, HIGH);
  digitalWrite(IN7, LOW);
  digitalWrite(IN8, HIGH);
  delay(2000); // Tunda selama 2 detik
}

// buatkan funcTION belok kanan
void belokkanan()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  // mundur
  digitalWrite(IN5, HIGH);
  digitalWrite(IN6, LOW);
  digitalWrite(IN7, HIGH);
  digitalWrite(IN8, LOW);
  delay(2000); // Tunda selama 2 detik
}

void Maju()
{
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  // mundur
  digitalWrite(IN5, HIGH);
  digitalWrite(IN6, LOW);
  digitalWrite(IN7, HIGH);
  digitalWrite(IN8, LOW);
  delay(2000); // Tunda selama 2 detik
}

void Mundur()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  // mundur
  digitalWrite(IN5, LOW);
  digitalWrite(IN6, HIGH);
  digitalWrite(IN7, LOW);
  digitalWrite(IN8, HIGH);
  delay(2000); // Tunda selama 2 detik
}

void setup()
{
  Serial.begin(9600);
  // Mengatur pin LED sebagai OUTPUT
  pinMode(ledPin, OUTPUT);

  // // Mengatur pin PIN L298N sebagai OUTPUT
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  // pinMode(IN3, OUTPUT);
  // pinMode(IN4, OUTPUT);
  // pinMode(IN5, OUTPUT);
  // pinMode(IN6, OUTPUT);
  // pinMode(IN7, OUTPUT);
  // pinMode(IN8, OUTPUT);

  // // Mengatur pin PIN L298N sebagai LOW
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  digitalWrite(IN5, LOW);
  digitalWrite(IN6, LOW);
  digitalWrite(IN7, LOW);
  digitalWrite(IN8, LOW);

  // // deklarasi pin sensor kiri dan kanan
  pinMode(kiri, INPUT);
  pinMode(kanan, INPUT);

  // // deklarasi pin timbangan
  pinMode(dataminus, INPUT);
  pinMode(dataplus, INPUT);

  pinMode(kenapa, INPUT);
}

void loop()
{
  // gunakan serial
  const bool njirr = digitalRead(kenapa);
  //   Serial.println(njirr);

  if (njirr)
  {
    digitalWrite(ledPin, LOW);
    Serial.println("Lampu mati");
  }
  else
  {
    digitalWrite(ledPin, HIGH);
    Serial.println("Lampu menyala");
  }

  // Nilai sensor kiri
  // const int kiriValue = digitalRead(kiri);
  // // Nilai sensor kanan
  // const int kananValue = digitalRead(kanan);

  // // Nilai sensor ultrasonic
  // const int distance = sonar.ping_cm();

  // // Nilai sensor kanan kiri 0 0 maka mundur
  // if (kiriValue == 0 && kananValue == 0)
  // {
  //   // Perform the desired action when both kiriValue and kananValue are 0
  //   // Replace the following line with the desired action
  //   // Mundur();
  //   // Example: Stop the motors
  //   digitalWrite(IN1, LOW);
  //   digitalWrite(IN2, LOW);
  //   digitalWrite(IN3, LOW);
  //   digitalWrite(IN4, LOW);
  // }
  // else if (kiriValue == 1 && kananValue == 0)
  // {
  //   belokkiri();
  // }
  // else if (kiriValue == 0 && kananValue == 1)
  // {
  //   belokkanan();
  // }
  // else if (kiriValue == 1 && kananValue == 1)
  // {
  //   Maju();
  // }
}