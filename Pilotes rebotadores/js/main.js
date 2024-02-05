// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
let pilotes = [];
import { Pilota } from "./pilota.js";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

export function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
const width = (canvas.width = window.innerWidth);
console.log(width);
const height = (canvas.height = window.innerHeight);
console.log(height);

// funció que assigna un color aleatori a les pilotes
afegeixArray();
function loop() {
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width, canvas.height);
  for (let pilota of pilotes) {
    pilota.dibuixa(ctx);
    pilota.moviment();
  }
  colisio();
  requestAnimationFrame(loop);
}

loop();
function colisio() {
  for(let i = 0; i < pilotes.length; i++){
    for(let j = i+1; j < pilotes.length; j++){
      let dx = pilotes[i].x - pilotes[j].x;
      let dy = pilotes[i].y - pilotes[j].y;
      let distancia = Math.sqrt(dx*dx + dy*dy);
      if (distancia < pilotes[i].mida + pilotes[j].mida){
        let colorComu = randomRGB();
        pilotes[i].color = colorComu;
        pilotes[j].color = colorComu;
      }
    }
  }
}

//funció que crea l'array
function afegeixArray() {
  for (let i = 0; i < 25; i++) {
    let mida = random(10, 20);
    //                                          x                                         y                         velX          velY      color   mida
    let pilota = new Pilota(
      random(random(0, mida), canvas.width - mida),
      random(random(0, mida), canvas.height - mida),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      mida
    );
    pilotes.push(pilota);
  }
}

// funció que genera un número aleatori entre un valor mínim i un màxim
function random(min, max) {
  const numeroAleatori = Math.floor(Math.random() * (max - min + 1)) + min; //generem el número
  return numeroAleatori;
}