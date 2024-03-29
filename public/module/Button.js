// buttonSetup.js

export function setupButtons(canvas, Player, selectedPokemon) {
  let Buttons = [
    {
      x: 0,
      y: canvas.height - 200,
      width: canvas.width / 4,
      height: 200,
    },
    {
      x: canvas.width / 4,
      y: canvas.height - 200,
      width: canvas.width / 4,
      height: 200,
    },
    {
      x: (canvas.width / 4) * 2,
      y: canvas.height - 200,
      width: canvas.width / 4,
      height: 200,
    },
    {
      x: (canvas.width / 4) * 3,
      y: canvas.height - 200,
      width: canvas.width / 4,
      height: 200,
    },
  ];

  let currentPokemon = Object.values(Player.inventory.Pokemon)[selectedPokemon];
  let Attacks = Object.values(currentPokemon.attacks);
  let Items = Object.values(Player.inventory.Items);

  function getPokemonName(number) {
    let pokemon =
      Player.inventory.Pokemon[Object.keys(Player.inventory.Pokemon)[number]];
    return pokemon && pokemon.name ? pokemon.name : "Kein Pokemon";
  }

  let ButtonText = [
    {
      text: ["Flüchten", "Item", "Pokemon", "Angriff"],
    },
    {
      text: [currentPokemon.name, Attacks[0].name, Attacks[1].name, "Zurück"],
    },
    {
      text: ["Items", Items[0].name, Items[1].name, "Zurück"],
    },
    {
      text: [
        "Raus",
        "1." + getPokemonName(0),
        "2." + getPokemonName(1),
        "Weiter",
      ],
    },
    {
      text: [
        "Zurück",
        "3." + getPokemonName(2),
        "4." + getPokemonName(3),
        "Weiter",
      ],
    },
    {
      text: [
        "Züruck",
        "5." + getPokemonName(4),
        "6." + getPokemonName(5),
        "Raus",
      ],
    },
    {
      text: ["Gehen", "Heilungstrank", "Pokeball", "Heilen"],
    },
    {
      text: ["Heilungstrank", "Kaufen", "Abbrechen", ""],
    },
    {
      text: ["Pokeball", "Kaufen", "Abbrechen", ""],
    },
  ];

  return { Buttons, ButtonText, currentPokemon, Attacks };
}

export function drawFightButtons(
  c,
  canvas,
  Buttons,
  ButtonText,
  Set,
  currentPokemon,
  enemyPokemon
) {
  c.fillStyle = "blue";
  for (let i = 0; i < Buttons.length; i++) {
    c.fillStyle = "white";
    c.fillRect(Buttons[i].x, Buttons[i].y, Buttons[i].width, Buttons[i].height);
    //add text to the button
    c.fillStyle = "black";
    c.font = "30px Arial";
    c.textAlign = "center";
    c.fillText(
      ButtonText[Set].text[i],
      Buttons[i].x + Buttons[i].width / 2,
      Buttons[i].y + Buttons[i].height / 2 + 10
    );
    //add Border to button
    c.strokeStyle = "black";
    c.lineWidth = 5;
    c.strokeRect(
      Buttons[i].x,
      Buttons[i].y,
      Buttons[i].width,
      Buttons[i].height
    );
  }
  //add Player Status Bar
  c.fillStyle = "white";
  c.strokeStyle = "black";
  c.lineWidth = 5;
  c.fillRect(canvas.width, 450, -350, 100);
  c.strokeRect(canvas.width, 450, -350, 100);
  c.fillStyle = "black";
  c.font = "30px Arial";
  c.textAlign = "left";
  c.fillText(currentPokemon.name, canvas.width - 330, 450 + 100 / 2 - 10);
  c.fillText(
    "HP:" + currentPokemon.health + "/" + currentPokemon.maxHealth,
    canvas.width - 330,
    450 + 100 / 2 + 20
  );
  c.fillText(
    "XP:" + currentPokemon.xp + "/" + currentPokemon.maxXP,
    canvas.width - 150,
    450 + 100 / 2 + 20
  );
  //add Enemy Status Bar
  c.fillStyle = "white";
  c.strokeStyle = "black";
  c.lineWidth = 5;
  c.fillRect(0, 100, 350, 100);
  c.strokeRect(0, 100, 350, 100);
  c.fillStyle = "black";
  c.font = "30px Arial";
  c.textAlign = "left";
  c.fillText(enemyPokemon.name, 20, 100 + 100 / 2 - 10);
  c.fillText(
    "HP:" + enemyPokemon.health + "/" + enemyPokemon.maxHealth,
    20,
    175
  );
}

export function drawStoreButtons(c, canvas, Buttons, ButtonText, Set) {
  c.fillStyle = "blue";
  for (let i = 0; i < Buttons.length; i++) {
    c.fillStyle = "white";
    c.fillRect(Buttons[i].x, Buttons[i].y, Buttons[i].width, Buttons[i].height);
    //add text to the button
    c.fillStyle = "black";
    c.font = "30px Arial";
    c.textAlign = "center";
    c.fillText(
      ButtonText[Set].text[i],
      Buttons[i].x + Buttons[i].width / 2,
      Buttons[i].y + Buttons[i].height / 2 + 10
    );
    //add Border to button
    c.strokeStyle = "black";
    c.lineWidth = 5;
    c.strokeRect(
      Buttons[i].x,
      Buttons[i].y,
      Buttons[i].width,
      Buttons[i].height
    );
  }
}
