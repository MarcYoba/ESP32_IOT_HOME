#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "FS.h"
#include <SPIFFS.h>
#include "EEPROM.h"
#include <SPI.h>
#include <SD.h>

#define rxp 16
#define txp 17

const char* ssid     = "ESP32-Access-Point";
const char* password = "123456789";


const int pinchambre1 = 27;
const int pinchambre2 = 26;
const int pincuisine = 25;
const int pinsalon = 2;
const int pinLumiereExterne = 32;

int HomeTable[10] = {0,0,0,0,0,0,0,0,0,0};

bool chambre01 = 0;
bool chambre02 = 0;
bool cuisine = 0;
bool salon = 0;
bool LumiereExterne = 0;

String result = "0";
String message;
int error = 0;
bool boolchambre = 0;

byte status_wifi = 1;

AsyncWebServer server(80);

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600, SERIAL_8N1, rxp, txp);
  Serial2.print("initialisation");
  Serial.print("Initialisation (Access Point)…");


  pinMode(pinchambre1, OUTPUT);
  pinMode(pinchambre2, OUTPUT);
  pinMode(pincuisine, OUTPUT);
  pinMode(pinsalon, OUTPUT);
  pinMode(pinLumiereExterne, OUTPUT);



  WiFi.mode(WIFI_MODE_APSTA);
  WiFi.softAP(ssid, password);

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  

  if(!SPIFFS.begin()) {
    server.on("/", HTTP_GET, [](AsyncWebServerRequest * request){
      request->send(200, "text/html", "SPIFFS error in Card");
    }); 
    server.begin();
    return;
  }
  
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
  });

  server.on("/home.html", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/home.html", "text/html");
  });
  
  server.on("/script.js",HTTP_GET,[](AsyncWebServerRequest * request){
    request->send(SPIFFS, "/script.js", "text/javascript");
  });

  server.on("/w3.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/w3.css", "text/css");
  });

  server.on("/jquery-3.6.3.min.js", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/jquery-3.6.3.min.js", "text/javascript");
  });

  server.on("/loginuser", HTTP_POST, [](AsyncWebServerRequest * request){
    message = request->getParam("nomuser", true)->value();
          message += "_";
          message += request->getParam("pasuser", true)->value();
      request->send(204);

  });
  
  
  server.on("/chambre01", HTTP_POST, [](AsyncWebServerRequest * request){
    message = request->getParam("chambrevaleur", true)->value();
    HomeTable[0] = message.toInt();
    request->send(204);

  });
  server.on("/chambre02", HTTP_POST, [](AsyncWebServerRequest * request){
    message = request->getParam("chambrevaleur2", true)->value();
    HomeTable[1] = message.toInt();
    request->send(204);

  });
  server.on("/salon", HTTP_POST, [](AsyncWebServerRequest * request){
    message = request->getParam("salon", true)->value();
    HomeTable[2] = message.toInt(); 
    request->send(204);
  });
  server.on("/cuisine", HTTP_POST, [](AsyncWebServerRequest * request){
    message = request->getParam("cuisine", true)->value();
    HomeTable[3] = message.toInt();
    request->send(204);
  });
  server.on("/lumiereExterne", HTTP_POST, [](AsyncWebServerRequest * request){
    message = request->getParam("lumiereExterne", true)->value();
    HomeTable[4] = message.toInt();
    request->send(204);

  });
  
  server.on("/result", HTTP_GET, [](AsyncWebServerRequest * request){
    if (result == "admin_admin") {
      request->send(202,"text/html",result);
      Serial.print("Result : ");
      Serial.println(result);
      result = "0";
    } else {
      request->send(202,"text/html",result = result.length());
      result = "0";
    }
    
  });

  server.on("/Homedata", HTTP_GET, [](AsyncWebServerRequest * request){
    if(request->hasParam("data",true)){
      message = request->getParam("data",true)->value();
      Serial2.print(message);
    }
  });

  server.begin();


  digitalWrite(pinchambre1,HIGH);
  digitalWrite(pinchambre2,HIGH);
  digitalWrite(pincuisine,HIGH);
  digitalWrite(pinsalon,HIGH);
  digitalWrite(pinLumiereExterne,HIGH);
  

  delay(3000);
}

void loop() {
  
  if(HomeTable[0]){
  digitalWrite(pinchambre1,HIGH);

  } else {
  digitalWrite(pinchambre1,LOW);
  }
  if(HomeTable[1]){
    digitalWrite(pinchambre2,HIGH);
  } else {
    digitalWrite(pinchambre2,LOW);
  }
  if(HomeTable[2]){
    digitalWrite(pincuisine,HIGH);
  } else {
    digitalWrite(pincuisine,LOW);
  }
  if(HomeTable[3]){
    digitalWrite(pinsalon,HIGH);
  } else {
    digitalWrite(pinsalon,LOW);
  }
  if(HomeTable[4]){
    digitalWrite(pinLumiereExterne,HIGH);
  } else {
    digitalWrite(pinLumiereExterne,LOW);
  }
}