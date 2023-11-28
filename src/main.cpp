#include <Arduino.h>
#include "HX711.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define DOUT D6
#define CLK D5

const char *ssid = "limbacterr";
const char *password = "junddddyah";
const char *mqtt_server = "test.mosquitto.org";
const char *mqtt_topic = "banyu/elektronik";

// deklarasi btn d1 dan led builtin
const int btn = D3;
const int led = LED_BUILTIN;

WiFiClient espClient;
PubSubClient client(espClient);
HX711 scale;

float calibration_factor = 408.00;

void setup_wifi()
{
  delay(10);
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Mencoba Konek Ke WiFI...");
  }
  Serial.println("Konek Rek ");
}

void reconnect()
{
  while (!client.connected())
  {
    Serial.println("Mencoba terhubung ke Server Banyu");
    if (client.connect("BanyuElektronik"))
    {
      Serial.println("Terhubung Ke server Banyu");
    }
    else
    {
      Serial.print("Intinya Gagal Terhubung ke server Banyu, rc=");
      Serial.print(client.state());
      Serial.println("Mencoa ulang dalam 5 detik");
      delay(5000);
    }
  }
}

void setup()
{
  Serial.begin(115200);
  scale.begin(DOUT, CLK);
  scale.set_scale();
  scale.tare();
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  pinMode(btn, INPUT);
  pinMode(led, OUTPUT);
}

void loop()
{
  // Mqtt Loop
  if (!client.connected())
  {
    reconnect();
  }

  // JIKA BTN DITEKAN
  const bool btnPosisi = digitalRead(btn);
  if (btnPosisi)
  {
    digitalWrite(led, HIGH);
    scale.set_scale(calibration_factor);
    float weight = scale.get_units();
    Serial.print("Berat : ");
    Serial.print(weight);
    Serial.println(" kg");
    client.publish(mqtt_topic, String(weight).c_str());
    delay(1000);
  }
  else
  {
    digitalWrite(led, LOW);
  }
}