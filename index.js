import { MapConstructor, PlayerConstructor } from "./module/Asset.js";

//Alle Karten Elemente Laden
const canvas = document.querySelector("canvas");
canvas.width = 1200;
canvas.height = 800;
const c = canvas.getContext("2d");

const MapBackground = new MapConstructor({
  position: {
    x: -3075,
    y: -600,
  },
  src: document.getElementById("Map"),
});

const MapBackground2 = new MapConstructor({
  position: {
    x: -3075,
    y: -600,
  },
  src: document.getElementById("MapTransperent"),
});

const CollisionMap = new MapConstructor({
  position: {
    x: -3075,
    y: -600,
  },
  src: document.getElementById("CollisionMap"),
});

//Alle Spieler Elemente Laden
const PlayerDown = document.getElementById("PlayerDown");
const PlayerUp = document.getElementById("PlayerUp");
const PlayerLeft = document.getElementById("PlayerLeft");
const PlayerRight = document.getElementById("PlayerRight");

const Player = new PlayerConstructor({
  position: {
    position: {
      x: canvas.width / 2 - 192 / 4 / 2,
      y: canvas.height / 2 - 68 / 2,
    },
  },
  velocity: 5,
  src: PlayerDown,
  inventory: [],
});
let directionStack = [];

//Collision Punkte für die Kollisionserkennung
const LeftX = canvas.width / 2 - 14;
const UpperY = canvas.height / 2 - 52;
const RightX = canvas.width / 2 + 52;
const LowerY = canvas.height / 2 + 2;

//Spiel Loop
function animate() {
  window.requestAnimationFrame(animate);
  CollisionMap.draw();

  //Kollisions Erkennung
  let CollisionUP = Collision([
    [LeftX + 10, UpperY],
    [RightX - 10, UpperY],
  ]);
  let CollisionDown = Collision([
    [LeftX + 10, LowerY],
    [RightX - 10, LowerY],
  ]);
  let CollisionLeft = Collision([
    [LeftX, UpperY + 10],
    [LeftX, LowerY - 10],
  ]);
  let CollisionRight = Collision([
    [RightX, UpperY + 10],
    [RightX, LowerY - 10],
  ]);

  //Rest der Karte gezeichnet sowie der Spieler
  MapBackground.draw();
  Player.draw(c, canvas);
  MapBackground2.draw();
  // CollisionMap.draw();
  //Bewegung des Spielers
  let currentDirection = getCurrentDirection();
  if (currentDirection == "UP" && CollisionUP == false) {
    MapBackground.position.y += Player.velocity;
    MapBackground2.position.y += Player.velocity;
    CollisionMap.position.y += Player.velocity;
    Player.src = PlayerUp;
    Player.move();
  }
  if (currentDirection == "DOWN" && CollisionDown == false) {
    MapBackground.position.y -= Player.velocity;
    MapBackground2.position.y -= Player.velocity;
    CollisionMap.position.y -= Player.velocity;
    Player.src = PlayerDown;
    Player.move();
  }
  if (currentDirection == "LEFT" && CollisionLeft == false) {
    MapBackground.position.x += Player.velocity;
    MapBackground2.position.x += Player.velocity;
    CollisionMap.position.x += Player.velocity;
    Player.src = PlayerLeft;
    Player.move();
  }
  if (currentDirection == "RIGHT" && CollisionRight == false) {
    MapBackground.position.x -= Player.velocity;
    MapBackground2.position.x -= Player.velocity;
    CollisionMap.position.x -= Player.velocity;
    Player.src = PlayerRight;
    Player.move();
  }
  if (currentDirection == null) {
    Player.Stop();
  }
}
//Startet den Spiel Loop
animate();

//Bewegung des Spielers initialisieren
window.addEventListener("keydown", (e) => {
  let direction;
  switch (e.key) {
    case "w":
      direction = "UP";
      break;
    case "s":
      direction = "DOWN";
      break;
    case "a":
      direction = "LEFT";
      break;
    case "d":
      direction = "RIGHT";
      break;
  }
  // Falls der Spieler die Taste bereits gedrückt hat, entferne sie aus dem Array
  const index = directionStack.indexOf(direction);
  if (index > -1) {
    directionStack.splice(index, 1);
  }
  // Füge die Richtung dem Array hinzu
  directionStack.push(direction);
});

//Bewegung des Spielers stoppen
window.addEventListener("keyup", (e) => {
  let direction;
  switch (e.key) {
    case "w":
      direction = "UP";
      break;
    case "s":
      direction = "DOWN";
      break;
    case "a":
      direction = "LEFT";
      break;
    case "d":
      direction = "RIGHT";
      break;
  }
  // Entferne die Richtung aus dem Array
  const index = directionStack.indexOf(direction);
  if (index > -1) {
    directionStack.splice(index, 1);
  }
});

// Gibt die aktuelle Richtung des Spielers zurück
function getCurrentDirection() {
  return directionStack[directionStack.length - 1] || null;
}

//Kollisions Erkennung
function Collision(line) {
  const targetColor = [255, 0, 0, 255].toString();

  for (const point of line) {
    let x = point[0];
    let y = point[1];

    //Gibt die RGBA Werte des Pixels zurück
    let pixelData = c.getImageData(x, y, 1, 1).data;
    let pixelArray = Array.from(pixelData);

    if (pixelArray.toString() === targetColor) {
      return true;
    }
  }
  return false;
}
