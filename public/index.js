import { MapConstructor, PlayerConstructor } from "./module/Asset.js";
import {
  PokemonList,
  displayInventory,
  fillInventory,
} from "./module/Inventory.js";

import { Dialog, DialogSets, ShowMessage } from "./module/Talking.js";

//Reset-Button
const OpenModal = document.getElementById("open");
const CloseModal = document.getElementById("close");
const ResetButton = document.getElementById("realResetButton");
//öffne Modal zum Bestätigen
OpenModal.addEventListener("click", function () {
  document.getElementById("modal").style.display = "flex";
});
//schließe Modal
CloseModal.addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});
//Fortschritt zurücksetzen
ResetButton.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Canvas setup
const canvas = document.querySelector("canvas");
canvas.width = 1200;
canvas.height = 800;
canvas.style.imageRendering = "pixelated";
let Stage = localStorage.getItem("Stage") || 0;
const c = canvas.getContext("2d", { willReadFrequently: true });

//Alle Spieler Elemente Laden
const PlayerDown = document.getElementById("PlayerDown");
const PlayerUp = document.getElementById("PlayerUp");
const PlayerLeft = document.getElementById("PlayerLeft");
const PlayerRight = document.getElementById("PlayerRight");

//Den Spieler erstellen und die Position setzen
let directionStack = [];
const Player = new PlayerConstructor({
  position: {
    position: {
      x: canvas.width / 2 - 192 / 4 / 2,
      y: canvas.height / 2 - 68 / 2,
    },
  },
  velocity: 7,
  src: PlayerDown,
  inventory: fillInventory(),
});

// Das Inventar des Spielers aus dem LocalStorage laden
Player.inventory =
  JSON.parse(localStorage.getItem("PlayerInventory")) || Player.inventory;
displayInventory(Player);

// Alle Kollisions Elemente Laden
let { CollisionDown, CollisionLeft, CollisionRight, CollisionUP } = false;

//Alle UI Elemente Laden
import {
  drawFightButtons,
  drawStoreButtons,
  setupButtons,
} from "./module/Button.js";
let Set = 0;

//Alle Laden Elemente
let Talking = false;
let StoreSet = false;
let HeilungstrankBought = false;
let PokeballBought = false;
let BuyingNotificationPotion = false;
let BuyingNotificationBall = false;
let NotEnoughMoney = false;

//Alle Kampf Elemente
let selectedPokemon = 0;
let enemyPokemon = {};
let XpMessage = 0;
let Schaden = 0;
let EnemyDone = false;
let OwnDone = false;
let WinDone = false;
let ItemDone = false;

let Captured = false;
let CaptureMessage = false;
let Geflohen = 0;
let Angriff = 0;
let Item = 0;
let Turn = 0;
let PokemonKampf = false;

//Frame Counter für die Pokemon Encounter Erkennung
let frameCount = 1;

//Alle Dialog Elemente
let Text = 0;
let counter = 0;
let IsDialog = false;
let isWaiting = false;
let DialogTime = 5000;

// Den Fortschritt des Spielers aus dem LocalStorage laden
let Progress = localStorage.getItem("Progress") || 0;

//karten Setup
function createMap(Name, Position) {
  return new MapConstructor({
    position: { ...Position },
    src: document.getElementById(Name),
    MapName: Name,
  });
}
let { Buttons, ButtonText, currentPokemon, Attacks } = [];

if (Progress >= 2) {
  ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
    canvas,
    Player,
    selectedPokemon
  ));
}

//Alle Karten Positionen aus dem LocalStorage laden oder, falls nicht vorhanden, setzen
const MainMapPosition = JSON.parse(localStorage.getItem("Map")) || {
  x: -9130,
  y: -1990,
};

const StorePositionIn = JSON.parse(localStorage.getItem("LadenMap")) || {
  x: -1600,
  y: -2500,
};

const StoreTalkingOut = { x: -1600, y: -1600 };

const TalkingPosition = { x: -1430, y: -1560 };
const ProfPositionIn = JSON.parse(localStorage.getItem("ProfessorMap")) || {
  x: -1150,
  y: -1460,
};
const MutterSpawn = JSON.parse(localStorage.getItem("MutterMap")) || {
  x: -1100,
  y: -1450,
};

const BossPosition = JSON.parse(localStorage.getItem("BossMap")) || {
  x: -1450,
  y: -1900,
};

//Alle Karten erstellen
const MainMap = createMap("Map", MainMapPosition);
const MainTransparent = createMap("MapTransperent", MainMapPosition);
const MainCollisions = createMap("CollisionMap", MainMapPosition);
const KampfMap = createMap("KampfMap", { x: 0, y: 0 });

const LadenMap = createMap("LadenMap", StorePositionIn);
const LadenCollision = createMap("LadenCollision", StorePositionIn);
const LadenTransperent = createMap("LadenTransperent", StorePositionIn);

const ProfessorMap = createMap("ProfessorMap", ProfPositionIn);
const ProfessorCollision = createMap("ProfessorCollision", ProfPositionIn);
const ProfessorTransperent = createMap("ProfessorTransperent", ProfPositionIn);

const MutterMap = createMap("MutterMap", MutterSpawn);
const MutterCollision = createMap("MutterCollision", MutterSpawn);
const MutterTransperent = createMap("MutterTransperent", MutterSpawn);

const BossMap = createMap("BossMap", BossPosition);
const BossCollision = createMap("BossCollision", BossPosition);
const BossTransperent = createMap("BossTransperent", BossPosition);

//Die Übergangs Zeit setzen
let Transistion = false;
let TransistionTime = 3000;

import {
  CollisionDetection,
  GeneralCollision,
  PokemonEncounterFunction,
} from "./module/Collision.js";

// Die Kollisions Punkte festlegen
const LeftX = canvas.width / 2 - 14;
const UpperY = canvas.height / 2 - 52;
const RightX = canvas.width / 2 + 52;
const LowerY = canvas.height / 2 + 2;

// Alle Kolliosions Farben
const LeaveStage = [0, 255, 236, 255]; // TÜRKIS
const EnterHouse = [253, 255, 0, 255]; // GELB
const EnterStore = [255, 154, 0, 255]; // ORANGE
const TalkingCollision = [255, 0, 255, 255]; // PINK
const EnterProf = [0, 0, 255, 255]; // Blau
const EnterBoss = [132, 94, 194, 255]; //Lila

// Spiel Loop
function animate() {
  window.requestAnimationFrame(animate);
  //Bild löschen
  c.clearRect(0, 0, canvas.width, canvas.height);
  if (PokemonKampf == true) {
    Player.Stop();
    if (Stage == 1) {
      KampfMap.draw();
    } else if (Stage == 4) {
      KampfMap.draw();
    }
    Player.src = PlayerUp;
    Player.draw(c, canvas, true);
    drawFightButtons(
      c,
      canvas,
      Buttons,
      ButtonText,
      Set,
      currentPokemon,
      enemyPokemon
    );
    // Flucht Logik
    if (Geflohen == 2) {
      ShowMessage("Flucht", "Du bist erfolgreich geflüchtet", c, canvas);
      setTimeout(function () {
        Turn = 0;
        PokemonKampf = false;
        Geflohen = 0;
      }, 3000);
    } else if (Geflohen == 1) {
      ShowMessage("Flucht", "Du bist nicht erfolgreich geflüchtet", c, canvas);
      setTimeout(function () {
        Geflohen = 0;
        Turn = 1;
      }, 3000);
    }
    //Kampf Logik
    if (Turn == 1 && enemyPokemon.health > 0 && currentPokemon.health > 0) {
      let EnemyAttacks = Object.values(enemyPokemon.attacks);
      if (EnemyDone == false) {
        if (Math.random() * 10 > 5) {
          Schaden = Damage(EnemyAttacks[0].damage, currentPokemon);
        } else {
          Schaden = Damage(EnemyAttacks[1].damage, currentPokemon);
        }
      }
      if (Schaden == 0) {
        ShowMessage(
          "Gegnerischer Angriff",
          "Der Gegner hat verfehlt",
          c,
          canvas
        );
      } else {
        ShowMessage(
          "Gegnerischer Angriff",
          "Du hast " + Schaden + " Schaden bekommen",
          c,
          canvas
        );
      }
      EnemyDone = true;
      setTimeout(function () {
        Turn = 0;
        EnemyDone = false;
      }, 3000);
    }
    //Eigener Angriff
    if (Turn == 0 && Angriff != 0) {
      if (OwnDone == false) {
        Schaden = Damage(Attacks[Angriff - 1].damage, enemyPokemon);
      }
      if (Schaden == 0) {
        ShowMessage("Dein Angriff", "Du hast verfehlt", c, canvas);
      } else {
        ShowMessage(
          "Dein Angriff",
          "Du hast " + Schaden + " Schaden verursacht",
          c,
          canvas
        );
      }
      OwnDone = true;
      setTimeout(function () {
        Turn = 1;
        Angriff = 0;
        OwnDone = false;
      }, 3000);
    }
    //Falls der Spieler ein Item benutzt
    if (Turn == 0 && Item != 0) {
      if (ItemDone == false) {
        if (
          Item == 1 &&
          Player.inventory.Pokemon.length < 6 &&
          Player.inventory.Items.pokeball.quantity > 0
        ) {
          Captured = Capture(enemyPokemon.health, enemyPokemon.maxHealth);
        }
        if (
          Item == 2 &&
          currentPokemon.health > 0 &&
          currentPokemon.health < currentPokemon.maxHealth &&
          Player.inventory.Items.potion.quantity > 0
        ) {
          currentPokemon.health += 15;
          if (currentPokemon.health > currentPokemon.maxHealth) {
            currentPokemon.health = currentPokemon.maxHealth;
          }
          Player.inventory.Items.potion.quantity--;
        }
      }
      if (Item == 1) {
        if (CaptureMessage == false) {
          Player.inventory.Items.pokeball.quantity--;
          displayInventory(Player);
          localStorage.setItem(
            "PlayerInventory",
            JSON.stringify(Player.inventory)
          );
        }
        if (Captured == true) {
          ShowMessage("Item", "Du hast ein Pokemon Gefangen", c, canvas);
        }
        if (Captured == false && Player.inventory.Items.pokeball.quantity > 0) {
          ShowMessage("Item", "Du hast den Pokeball verfehlt", c, canvas);
        } else if (Player.inventory.Items.pokeball.quantity == 0) {
          ShowMessage("Fehlgeschlagen", "Keine Pokebälle mehr", c, canvas);
        }
      }
      if (Item == 2 && currentPokemon.health > 0) {
        ShowMessage("Item", "Du hast einen Heiltrank benutzt", c, canvas);
      } else if (Item == 2 && currentPokemon.health <= 0) {
        ShowMessage("Fehlgeschlagen", "Dein Pokemon ist tot", c, canvas);
      } else if (Item == 2 && Player.inventory.Items.potion.quantity == 0) {
        ShowMessage("Fehlgeschlagen", "Keine Heiltränke mehr", c, canvas);
      }
      ItemDone = true;
      CaptureMessage = true;
      setTimeout(function () {
        if (Item == 1 && Captured == false) {
          Turn = 1;
        } else {
          PokemonKampf = false;
          Captured = false;
        }
        Item = 0;
        ItemDone = false;
        CaptureMessage = false;
        displayInventory(Player);
      }, 3000);
    }

    if (enemyPokemon.health <= 0) {
      if (WinDone == false) {
        XpMessage = GainXP();
        Player.inventory.Geld.quantity += 100;
        displayInventory(Player);
        localStorage.setItem(
          "PlayerInventory",
          JSON.stringify(Player.inventory)
        );
      }
      ShowMessage(
        "Du hast gewonnen",
        "Du hast " + XpMessage + " XP erhalten",
        c,
        canvas
      );
      WinDone = true;
      setTimeout(function () {
        PokemonKampf = false;
        WinDone = false;
      }, 5000);
    }

    if (currentPokemon.health <= 0) {
      ShowMessage("Tot", "Du hast ein Pokemon verloren", c, canvas);
    }
  } else if (Stage == 0) {
    MutterCollision.draw();
    ({ CollisionUP, CollisionDown, CollisionLeft, CollisionRight } =
      CollisionDetection(LeftX, RightX, UpperY, LowerY, c));
    if (
      GeneralCollision(LeftX, RightX, LowerY, c, LeaveStage) == true &&
      Transistion == false
    ) {
      Transistion = true;
      Stage = 1;
      localStorage.setItem("Stage", 1);
      setTimeout(function () {
        Transistion = false;
      }, TransistionTime);
    }
    if (
      Progress == 0 &&
      GeneralCollision(LeftX, RightX, LowerY, c, TalkingCollision) == true
    ) {
      Player.src = PlayerRight;
      Player.Stop();
      Text = 1;
      IsDialog = true;
    }
    MutterMap.draw();
    Player.draw(c, canvas);
    MutterTransperent.draw();
    // Dialog Logik
    if (IsDialog && counter < DialogSets[Text].text.length) {
      Dialog(counter, Text, c, canvas, isWaiting, DialogTime).then(
        (newCounter) => {
          counter = newCounter;
        }
      );
      if (counter >= DialogSets[Text].text.length - 1) {
        IsDialog = false;
        Progress = 1;
        localStorage.setItem("Progress", 1);
        setTimeout(function () {
          counter = 0;
        }, 7000);
      }
    }
    //Bewegungs Logik
    if (!IsDialog) Movement(MutterMap, MutterTransperent, MutterCollision);
  } else if (Stage == 1) {
    MainCollisions.draw();

    //Collsions Erkennung, sollte nun eignt klar sein wie's geht, ansontsen siehe Collision.js
    if (
      Progress == 2 &&
      PokemonEncounterFunction(LeftX, RightX, UpperY, frameCount, c) == true
    ) {
      getEnemyPokemon();
      PokemonKampf = true;
      Set = 0;
      frameCount = 0;
      Turn = 0;
    }
    ({ CollisionUP, CollisionDown, CollisionLeft, CollisionRight } =
      CollisionDetection(LeftX, RightX, UpperY, LowerY, c));
    if (
      GeneralCollision(LeftX, RightX, LowerY, c, EnterHouse) == true &&
      Transistion == false
    ) {
      Transistion = true;
      Stage = 0;
      localStorage.setItem("Stage", 0);
      setTimeout(function () {
        Transistion = false;
      }, TransistionTime);
    }
    if (
      GeneralCollision(LeftX, RightX, LowerY, c, EnterStore) == true &&
      Transistion == false
    ) {
      Transistion = true;
      Stage = 2;
      localStorage.setItem("Stage", 2);
      setTimeout(function () {
        Transistion = false;
      }, TransistionTime);
    }
    if (
      GeneralCollision(LeftX, RightX, LowerY, c, EnterProf) == true &&
      Transistion == false
    ) {
      Transistion = true;
      Stage = 3;
      localStorage.setItem("Stage", 3);
      setTimeout(function () {
        Transistion = false;
      }, TransistionTime);
    }
    if (
      Progress == 2 &&
      GeneralCollision(LeftX, RightX, LowerY, c, EnterBoss) == true &&
      Transistion == false
    ) {
      Transistion = true;
      Stage = 4;
      localStorage.setItem("Stage", 4);
      setTimeout(function () {
        Transistion = false;
      }, TransistionTime);
    }

    //Rest der Karte gezeichnet sowie der Spieler
    MainMap.draw();

    Player.draw(c, canvas);
    MainTransparent.draw();
    if (IsDialog && counter < DialogSets[Text].text.length) {
      Dialog(counter, Text, c, canvas, isWaiting, DialogTime).then(
        (newCounter) => {
          counter = newCounter;
        }
      );
      if (counter >= DialogSets[Text].text.length - 1) {
        IsDialog = false;
        counter = 0;
      }
    }
    if (!IsDialog) Movement(MainMap, MainTransparent, MainCollisions);
  } else if (Stage == 2) {
    LadenCollision.draw();

    //Collsions Erkennung, sollte nun eignt klar sein wie's geht, ansontsen siehe Collision.js
    ({ CollisionUP, CollisionDown, CollisionLeft, CollisionRight } =
      CollisionDetection(LeftX, RightX, UpperY, LowerY, c));
    if (
      GeneralCollision(LeftX, RightX, LowerY, c, LeaveStage) == true &&
      Transistion == false
    ) {
      Transistion = true;
      Stage = 1;
      localStorage.setItem("Stage", 1);
      setTimeout(function () {
        Transistion = false;
      }, TransistionTime);
    }
    if (
      Progress >= 2 &&
      GeneralCollision(LeftX, RightX, LowerY, c, TalkingCollision) == true
    ) {
      Talking = true;
      if (StoreSet == false) {
        Set = 6;
        StoreSet = true;
      }
    }

    //Rest der Karte gezeichnet sowie der Spieler
    LadenMap.draw();
    Player.draw(c, canvas);
    LadenTransperent.draw();

    // Store Logik
    if (Talking == true) {
      LadenMap.position = { ...TalkingPosition };
      LadenTransperent.position = { ...TalkingPosition };
      LadenCollision.position = { ...TalkingPosition };
      Player.src = PlayerUp;
      Player.Stop();
      drawStoreButtons(c, canvas, Buttons, ButtonText, Set);
    } else {
      Movement(LadenMap, LadenTransperent, LadenCollision);
    }
    // Einkaufs Logik für die Items
    if (HeilungstrankBought == true) {
      if (BuyingNotificationPotion == false) {
        Player.inventory.Items.potion.quantity++;
        displayInventory(Player);
        localStorage.setItem(
          "PlayerInventory",
          JSON.stringify(Player.inventory)
        );
      }
      ShowMessage("Gekauft", "+1 Heilungstrank", c, canvas);
      BuyingNotificationPotion = true;

      setTimeout(function () {
        HeilungstrankBought = false;
        BuyingNotificationPotion = false;
      }, 3000);
    }
    if (PokeballBought == true) {
      if (BuyingNotificationBall == false) {
        Player.inventory.Items.pokeball.quantity++;
        displayInventory(Player);
        localStorage.setItem(
          "PlayerInventory",
          JSON.stringify(Player.inventory)
        );
      }
      ShowMessage("Gekauft", "+1 Pokeball", c, canvas);
      BuyingNotificationBall = true;
      setTimeout(function () {
        PokeballBought = false;
        BuyingNotificationBall = false;
      }, 3000);
    }
    if (NotEnoughMoney == true) {
      ShowMessage("Fehlgeschlagen", "Nicht genug Geld", c, canvas);
      setTimeout(function () {
        NotEnoughMoney = false;
      }, 3000);
    }
  } else if (Stage == 3) {
    ProfessorCollision.draw();
    ({ CollisionUP, CollisionDown, CollisionLeft, CollisionRight } =
      CollisionDetection(LeftX, RightX, UpperY, LowerY, c));
    if (
      GeneralCollision(LeftX, RightX, LowerY, c, LeaveStage) == true &&
      Transistion == false
    ) {
      Transistion = true;
      Stage = 1;
      localStorage.setItem("Stage", 1);
      setTimeout(function () {
        Transistion = false;
      }, TransistionTime);
    }
    if (
      Progress == 1 &&
      GeneralCollision(LeftX, RightX, LowerY, c, TalkingCollision) == true
    ) {
      Player.Stop();
      Text = 2;
      IsDialog = true;
    }
    ProfessorMap.draw();

    Player.draw(c, canvas);
    ProfessorTransperent.draw();

    if (IsDialog && counter < DialogSets[Text].text.length && Progress == 1) {
      Dialog(counter, Text, c, canvas, isWaiting, DialogTime).then(
        (newCounter) => {
          counter = newCounter;
        }
      );
      if (counter >= DialogSets[Text].text.length - 1) {
        IsDialog = false;
        Progress = 2;
        localStorage.setItem("Progress", 2);
        Player.inventory.Pokemon.push({ ...Object.values(PokemonList)[0] });
        displayInventory(Player);
        localStorage.setItem(
          "PlayerInventory",
          JSON.stringify(Player.inventory)
        );
        ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
          canvas,
          Player,
          selectedPokemon
        ));
        setTimeout(function () {
          counter = 0;
        }, 7000);
      }
    }
    if (!IsDialog)
      Movement(ProfessorMap, ProfessorTransperent, ProfessorCollision);
  } else if (Stage == 4) {
    BossCollision.draw();
    ({ CollisionUP, CollisionDown, CollisionLeft, CollisionRight } =
      CollisionDetection(LeftX, RightX, UpperY, LowerY, c));
    if (
      GeneralCollision(LeftX, RightX, LowerY, c, LeaveStage) == true &&
      Transistion == false
    ) {
      Transistion = true;
      Stage = 1;
      localStorage.setItem("Stage", 1);
      setTimeout(function () {
        Transistion = false;
      }, TransistionTime);
    }
    if (
      Progress == 2 &&
      GeneralCollision(LeftX, RightX, LowerY, c, TalkingCollision) == true
    ) {
      Player.Stop();
      Text = 3;
      IsDialog = true;
    }
    BossMap.draw();
    Player.draw(c, canvas);
    BossTransperent.draw();
    if (IsDialog && counter < DialogSets[Text].text.length) {
      Dialog(counter, Text, c, canvas, isWaiting, DialogTime).then(
        (newCounter) => {
          counter = newCounter;
        }
      );
      if (counter >= DialogSets[Text].text.length - 1) {
        IsDialog = false;
        counter = 0;
        PokemonKampf = true;
        Set = 0;
        frameCount = 0;
        Turn = 0;
        Player.Stop();
        BossMap.position = BossPosition;
        BossTransperent.position = BossPosition;
        BossCollision.position = BossPosition;
      }
    }
    if (!IsDialog) Movement(BossMap, BossTransperent, BossCollision);
  }
}

//Button Klick Erkennung
canvas.addEventListener("mouseup", function (event) {
  let Index = getClickedButtonIndex(event);
  if (PokemonKampf == true && Turn == 0) {
    // Jeder Satz hat 4 Buttons, also 4 Fälle (Index 0-3) siehe Button.js
    if (Set == 0) {
      if (Index == 0) {
        Escape();
      }
      if (Index == 1) {
        Set = 2;
      }
      if (Index == 2) {
        Set = 3;
      }
      if (Index == 3) {
        Set = 1;
      }
    } else if (Set == 1) {
      if (Index == 1 && currentPokemon.health > 0) {
        Angriff = 1;
      }
      if (Index == 2 && currentPokemon.health > 0) {
        Angriff = 2;
      }
      if (Index == 3) {
        Set = 0;
      }
    } else if (Set == 2) {
      if (Index == 1) {
        Item = 1;
      }
      if (Index == 2) {
        Item = 2;
      }
      if (Index == 3) {
        Set = 0;
      }
    } else if (Set == 3) {
      if (Index == 0) {
        Set = 0;
      }
      if (Index == 1) {
        selectedPokemon = 0;
        ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
          canvas,
          Player,
          selectedPokemon
        ));
      }
      if (Index == 2) {
        selectedPokemon = 1;
        ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
          canvas,
          Player,
          selectedPokemon
        ));
      }
      if (Index == 3) {
        Set = 4;
      }
    } else if (Set == 4) {
      if (Index == 0) {
        Set = 3;
      }
      if (Index == 1) {
        if (Object.keys(Player.inventory.Pokemon).length >= 3) {
          selectedPokemon = 2;
          ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
            canvas,
            Player,
            selectedPokemon
          ));
        }
      }
      if (Index == 2) {
        if (Object.keys(Player.inventory.Pokemon).length >= 4) {
          selectedPokemon = 3;
          ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
            canvas,
            Player,
            selectedPokemon
          ));
        }
      }
      if (Index == 3) {
        Set = 5;
      }
    } else if (Set == 5) {
      if (Index == 0) {
        Set = 4;
      }
      if (Index == 1) {
        if (Object.keys(Player.inventory.Pokemon).length >= 5) {
          selectedPokemon = 4;
          ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
            canvas,
            Player,
            selectedPokemon
          ));
        }
      }
      if (Index == 2) {
        if (Object.keys(Player.inventory.Pokemon).length >= 6) {
          selectedPokemon = 5;
          ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
            canvas,
            Player,
            selectedPokemon
          ));
        }
      }
      if (Index == 3) {
        Set = 0;
      }
    }
  }
  // Falls die Person sich im Laden befindet und auf einen Button klickt
  if (Talking == true) {
    if (Set == 6) {
      if (Index == 0) {
        Talking = false;
        LadenMap.position = { ...StoreTalkingOut };
        LadenTransperent.position = { ...StoreTalkingOut };
        LadenCollision.position = { ...StoreTalkingOut };
        StoreSet = false;
      }
      if (Index == 1) {
        Set = 7;
      }
      if (Index == 2) {
        Set = 8;
      }
      if (Index == 3) {
        //heile alle Pokemon
        for (let i = 0; i < Player.inventory.Pokemon.length; i++) {
          Player.inventory.Pokemon[i].health =
            Player.inventory.Pokemon[i].maxHealth;
        }

        displayInventory(Player);
        localStorage.setItem(
          "PlayerInventory",
          JSON.stringify(Player.inventory)
        );
      }
    } else if (Set == 7) {
      if (Index == 1) {
        if (
          Player.inventory.Geld.quantity >= Player.inventory.Items.potion.price
        ) {
          Player.inventory.Geld.quantity -= Player.inventory.Items.potion.price;
          displayInventory(Player);
          HeilungstrankBought = true;
          localStorage.setItem(
            "PlayerInventory",
            JSON.stringify(Player.inventory)
          );
        } else {
          NotEnoughMoney = true;
        }
      }
      if (Index == 2) {
        Set = 6;
      }
    } else if (Set == 8) {
      if (Index == 1) {
        if (
          Player.inventory.Geld.quantity >=
          Player.inventory.Items.pokeball.price
        ) {
          Player.inventory.Geld.quantity -=
            Player.inventory.Items.pokeball.price;
          displayInventory(Player);
          PokeballBought = true;
          localStorage.setItem(
            "PlayerInventory",
            JSON.stringify(Player.inventory)
          );
        } else {
          NotEnoughMoney = true;
        }
      }
      if (Index == 2) {
        Set = 6;
      }
    }
  }
});

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
  // Falls der Spieler die Taste bereits gedrückt hat, wird sie aus dem Array entfernt
  const index = directionStack.indexOf(direction);
  if (index > -1) {
    directionStack.splice(index, 1);
  }
  // Fügt dem Array die Richtung hinzu auf die Letzte Stelle
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

// Gibt den Index des Buttons zurück, auf den geklickt wurde
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

// Ziehe ein zufälliges Pokemon gegen welches gekäumpft wird
function getEnemyPokemon() {
  let randomPokemon = Math.floor(Math.random() * 7 + 1);
  return (enemyPokemon = { ...Object.values(PokemonList)[randomPokemon] });
}
// Erhöhe die XP des Pokemons
function GainXP() {
  let xp = Math.floor(Math.random() * 10);
  currentPokemon.xp += xp;
  // Level Up Logik
  if (currentPokemon.xp >= currentPokemon.maxXP && currentPokemon.level < 100) {
    currentPokemon.xp = 0;
    currentPokemon.level++;
    currentPokemon.maxXP = Math.floor(currentPokemon.maxXP * 1.2);
    currentPokemon.maxHealth = Math.floor(currentPokemon.maxHealth * 1.2);
    currentPokemon.health = currentPokemon.maxHealth;
    Attacks[0].damage = Math.floor(Attacks[0].damage * 1.2);
    Attacks[1].damage = Math.floor(Attacks[1].damage * 1.2);
  }
  // Speichere das Inventar des Spielers
  localStorage.setItem("PlayerInventory", JSON.stringify(Player.inventory));
  return xp;
}
enemyPokemon = getEnemyPokemon();

// Flucht Logik
function Escape() {
  if (Math.floor(Math.random() * 10) >= 3 || currentPokemon.health <= 0) {
    Geflohen = 2;
  } else {
    Geflohen = 1;
  }
}

// Schadens Logik
function Damage(Attack, Enemy) {
  if (Math.random() * 10 <= 9) {
    // Kritischer Treffer berechnen (20% Chance)
    if (Math.random() * 10 <= 2) {
      Attack = Math.floor(Attack * 1.2);
    } else {
      Attack = Attack;
    }
  } else {
    Attack = 0;
  }
  Enemy.health -= Attack;
  if (Enemy.health < 0) {
    Enemy.health = 0;
  }
  return Attack;
}
// Starte den SpielLoop
animate();
// Einfangen eines Pokemons
function Capture(Health, MaxHealth) {
  // 30% Chance ein Pokemon zu fangen wenn das gegnerische Pokemon unter 50% HP ist
  if (Math.random() * 10 <= 30 && Health / MaxHealth <= 0.5) {
    Player.inventory.Pokemon.push({ ...enemyPokemon });
    displayInventory(Player);
    ({ Buttons, ButtonText, currentPokemon, Attacks } = setupButtons(
      canvas,
      Player,
      selectedPokemon
    ));

    localStorage.setItem("PlayerInventory", JSON.stringify(Player.inventory));
    return true;
  } else {
    return false;
  }
}
// Bewegungs Logik die Karte bewegt sich und nicht der Spieler so wird die Illusion der Bewegung erstellt ohne eine "Kamere" mit zu bewegen
function Movement(Map, MapTransperent, CollisionMap) {
  let currentDirection = getCurrentDirection();
  if (currentDirection == "UP" && CollisionUP == false) {
    Map.position.y += Player.velocity;
    MapTransperent.position.y += Player.velocity;
    CollisionMap.position.y += Player.velocity;
    Player.src = PlayerUp;
    Player.move();
    frameCount++;
  }
  if (currentDirection == "DOWN" && CollisionDown == false) {
    Map.position.y -= Player.velocity;
    MapTransperent.position.y -= Player.velocity;
    CollisionMap.position.y -= Player.velocity;
    Player.src = PlayerDown;
    Player.move();
    frameCount++;
  }
  if (currentDirection == "LEFT" && CollisionLeft == false) {
    Map.position.x += Player.velocity;
    MapTransperent.position.x += Player.velocity;
    CollisionMap.position.x += Player.velocity;
    Player.src = PlayerLeft;
    Player.move();
    frameCount++;
  }
  if (currentDirection == "RIGHT" && CollisionRight == false) {
    Map.position.x -= Player.velocity;
    MapTransperent.position.x -= Player.velocity;
    CollisionMap.position.x -= Player.velocity;
    Player.src = PlayerRight;
    Player.move();
    frameCount++;
  }
  if (currentDirection == null) {
    Player.Stop();
  }
  localStorage.setItem(Map.name, JSON.stringify(Map.position));
}
