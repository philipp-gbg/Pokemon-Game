import { MapConstructor, PlayerConstructor } from "./module/Asset.js";
import {
  fillInventory,
  displayInventory,
  PokemonList,
} from "./module/Inventory.js";

// Canvas setup
const canvas = document.querySelector("canvas");
canvas.width = 1200;
canvas.height = 800;
const c = canvas.getContext("2d", { willReadFrequently: true });

//Alle Spieler Elemente Laden
const PlayerDown = document.getElementById("PlayerDown");
const PlayerUp = document.getElementById("PlayerUp");
const PlayerLeft = document.getElementById("PlayerLeft");
const PlayerRight = document.getElementById("PlayerRight");
let XpMessage = 0;
let done = false;
let Turn = 0;
let selectedPokemon = 0;
let directionStack = [];
const Player = new PlayerConstructor({
  position: {
    position: {
      x: canvas.width / 2 - 192 / 4 / 2,
      y: canvas.height / 2 - 68 / 2,
    },
  },
  velocity: 5,
  src: PlayerDown,
  inventory: fillInventory(),
});

console.log(Player.inventory);
//function to display inventory
displayInventory(Player);
// index.js

import { setupButtons, drawButtons } from "./module/Button.js";
let { Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
  canvas,
  Player,
  selectedPokemon
);

let Set = 0;
let enemyPokemon = {};
//karten Setup
function createMap(Name, Position) {
  return new MapConstructor({
    position: { ...Position },
    src: document.getElementById(Name),
  });
}

const SpawnPosition = { x: -575, y: -1000 };
const MapBackground = createMap("Map", SpawnPosition);
const MapBackground2 = createMap("MapTransperent", SpawnPosition);
const CollisionMap = createMap("CollisionMap", SpawnPosition);
const KampfMap = createMap("KampfMap", { x: 0, y: 0 });

//Alle Farben für die Kollisionserkennung
const Wand = [255, 0, 0, 255]; // ROT
const PokemonEncounter = [0, 255, 0, 255]; // GRÜN

//Collision Punkte für die Kollisionserkennung
const LeftX = canvas.width / 2 - 14;
const UpperY = canvas.height / 2 - 52;
const RightX = canvas.width / 2 + 52;
const LowerY = canvas.height / 2 + 2;

//Frame Counter für die Pokemon Encounter Erkennung
let frameCount = 0;
let PokemonKampf = true;

//Spiel Loop
function animate() {
  window.requestAnimationFrame(animate);
  if (PokemonKampf == true) {
    KampfMap.draw();
    Player.src = PlayerUp;
    Player.draw(c, canvas, true);
    drawButtons(
      c,
      canvas,
      Buttons,
      ButtonText,
      Set,
      currentPokemon,
      enemyPokemon
    );
    if (enemyPokemon.health <= 0) {
      if (done == false) {
        console.log("Du hast gewonnen");
        XpMessage = GainXP();
      }
      c.fillStyle = "white";
      c.fillRect(canvas.width / 2 - 250, canvas.height / 2 - 150, 500, 100);
      c.strokeRect(canvas.width / 2 - 250, canvas.height / 2 - 150, 500, 100);
      c.fillStyle = "black";
      c.fillText(
        "Du hast gewonnen",
        canvas.width / 2 - 200,
        canvas.height / 2 - 110
      );
      c.fillText(
        "Du hast " + XpMessage + " XP erhalten",
        canvas.width / 2 - 200,
        canvas.height / 2 - 70
      );
      done = true;
      setTimeout(function () {
        PokemonKampf = false;
      }, 5000);
    }
  } else {
    CollisionMap.draw();
    //Pokemon Encounter Erkennung
    PokemonEncounterFunction();
    //Kollisions Erkennung

    let CollisionUP = Collision(
      [
        [LeftX + 10, UpperY],
        [RightX - 10, UpperY],
      ],
      Wand
    );
    let CollisionDown = Collision(
      [
        [LeftX + 10, LowerY],
        [RightX - 10, LowerY],
      ],
      Wand
    );
    let CollisionLeft = Collision(
      [
        [LeftX, UpperY + 10],
        [LeftX, LowerY - 10],
      ],
      Wand
    );
    let CollisionRight = Collision(
      [
        [RightX, UpperY + 10],
        [RightX, LowerY - 10],
      ],
      Wand
    );

    //Rest der Karte gezeichnet sowie der Spieler
    MapBackground.draw();
    Player.draw(c, canvas);
    MapBackground2.draw();
    CollisionMap.draw();

    //Bewegung des Spielers
    let currentDirection = getCurrentDirection();
    if (currentDirection == "UP" && CollisionUP == false) {
      MapBackground.position.y += Player.velocity;
      MapBackground2.position.y += Player.velocity;
      CollisionMap.position.y += Player.velocity;
      Player.src = PlayerUp;
      Player.move();
      frameCount++;
    }
    if (currentDirection == "DOWN" && CollisionDown == false) {
      MapBackground.position.y -= Player.velocity;
      MapBackground2.position.y -= Player.velocity;
      CollisionMap.position.y -= Player.velocity;
      Player.src = PlayerDown;
      Player.move();
      frameCount++;
    }
    if (currentDirection == "LEFT" && CollisionLeft == false) {
      MapBackground.position.x += Player.velocity;
      MapBackground2.position.x += Player.velocity;
      CollisionMap.position.x += Player.velocity;
      Player.src = PlayerLeft;
      Player.move();
      frameCount++;
    }
    if (currentDirection == "RIGHT" && CollisionRight == false) {
      MapBackground.position.x -= Player.velocity;
      MapBackground2.position.x -= Player.velocity;
      CollisionMap.position.x -= Player.velocity;
      Player.src = PlayerRight;
      Player.move();
      frameCount++;
    }
    if (currentDirection == null) {
      Player.Stop();
    }
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

canvas.addEventListener("mouseup", function (event) {
  let Index = getClickedButtonIndex(event);
  if (PokemonKampf == true && Turn == 0) {
    if (Set == 0) {
      if (Index == 0) {
        Escape();
        Turn = 1;
      }
      if (Index == 1) {
        Set = 2;
      }
      if (Index == 2) {
        Set = 3;
      }
      if (Index == 3) {
        Set = 1;
        console.log("Angiff 1");
      }
    } else if (Set == 1) {
      if (Index == 1) {
        console.log("Angiff 1");
        DamageEnemyPokemon(Attacks[0].damage);
        Turn = 1;
      }
      if (Index == 2) {
        console.log("Angiff 2");
        DamageEnemyPokemon(Attacks[1].damage);
        Turn = 1;
      }
      if (Index == 3) {
        Set = 0;
        console.log("Zurück");
      }
    } else if (Set == 2) {
      if (Index == 1) {
        console.log("Item 1");
      }
      if (Index == 2) {
        console.log("Item 2");
      }
      if (Index == 3) {
        Set = 0;
        console.log("Zurück");
      }
    } else if (Set == 3) {
      if (Index == 0) {
        Set = 0;
      }
      if (Index == 1) {
        console.log("Pokemon 1");
      }
      if (Index == 2) {
        console.log("Pokemon 2");
      }
      if (Index == 3) {
        Set = 4;
      }
    } else if (Set == 4) {
      if (Index == 0) {
        Set = 3;
      }
      if (Index == 1) {
        console.log("Pokemon 3");
      }
      if (Index == 2) {
        console.log("Pokemon 4");
      }
      if (Index == 3) {
        Set = 5;
      }
    } else if (Set == 5) {
      if (Index == 0) {
        Set = 4;
      }
      if (Index == 1) {
        console.log("Pokemon 5");
      }
      if (Index == 2) {
        console.log("Pokemon 6");
      }
      if (Index == 3) {
        Set = 0;
      }
    }
  }
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
function Collision(line, targetColor) {
  for (const point of line) {
    let x = point[0];
    let y = point[1];

    //Gibt die RGBA Werte des Pixels zurück
    let pixelData = c.getImageData(x, y, 1, 1).data;
    let pixelArray = Array.from(pixelData);

    if (pixelArray.toString() === targetColor.toString()) {
      return true;
    }
  }
  return false;
}

function PokemonEncounterFunction() {
  //wird alle 120 Frames ausgeführt
  if (frameCount % 120 === 0) {
    let PokemonEncounterCollision = Collision(
      [
        [LeftX + 10, UpperY],
        [RightX - 10, UpperY],
      ],
      PokemonEncounter
    );
    console.log(PokemonEncounterCollision);
    if (PokemonEncounterCollision == true) {
      if (Math.random() * 10 > 7) {
        enemyPokemon = getEnemyPokemon();
        PokemonKampf = true;
      }
    }
  }
  // Setze frameCount auf 0, wenn es größer als 120 ist
  if (frameCount >= 120) {
    frameCount = 0;
  }
}

function getClickedButtonIndex() {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  for (let i = 0; i < Buttons.length; i++) {
    let button = Buttons[i];
    if (
      x > button.x &&
      x < button.x + button.width &&
      y > button.y &&
      y < button.y + button.height
    ) {
      return i;
    }
  }

  return -1;
}

function getEnemyPokemon() {
  // let randomPokemon = Math.floor(Math.random() * 2);
  return (enemyPokemon = { ...Object.values(PokemonList)[2] });
}

function DamageEnemyPokemon(damage) {
  if (enemyPokemon.health <= 0) {
    console.log("Pokemon besiegt");
  }
  if (Math.floor(Math.random() * 10) <= 8) {
    if (Math.floor(Math.random() * 10) == 9) {
      damage = Math.floor(damage * 1.5);
      console.log("Kritischer Treffer");
      enemyPokemon.health -= damage;
    } else {
      enemyPokemon.health -= damage;
    }
  } else {
    console.log("Angriff verfehlt");
  }
}

function GainXP() {
  let xp = Math.floor(Math.random() * 10);
  currentPokemon.xp += xp;
  if (currentPokemon.xp >= currentPokemon.maxXP && currentPokemon.level < 100) {
    currentPokemon.xp = 0;
    currentPokemon.level++;
    // currentPokemon.maxXP = currentPokemon.maxXP * 1.5;
    currentPokemon.maxHealth =
      ((currentPokemon.baseHealth + 7.5 + 113.14 / 8 + 50) *
        currentPokemon.level) /
        50 +
      10;

    console.log("Level Up");
    console.log(currentPokemon.maxHealth);
  }
  return xp;
}
enemyPokemon = getEnemyPokemon();

function Escape() {
  if (Math.floor(Math.random() * 10) <= 8) {
    console.log("Du bist entkommen");
    PokemonKampf = false;
  } else {
    console.log("Flucht fehlgeschlagen");
  }
}
