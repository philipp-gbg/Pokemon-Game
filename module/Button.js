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
        "1." + Object.keys(Player.inventory.Pokemon)[0],
        "2." + Object.keys(Player.inventory.Pokemon)[1],
        "Weiter",
      ],
    },
    {
      text: [
        "Zurück",
        "3." + Object.keys(Player.inventory.Pokemon)[2],
        "4." + Object.keys(Player.inventory.Pokemon)[3],
        "Weiter",
      ],
    },
    {
      text: [
        "Züruck",
        "5." + Object.keys(Player.inventory.Pokemon)[4],
        "6." + Object.keys(Player.inventory.Pokemon)[5],
        "Raus",
      ],
    },
  ];

  return { Buttons, ButtonText, currentPokemon, Attacks };
}

export function drawButtons(
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

export function ShowMessage(Heading, Message, c, canvas) {
  c.fillStyle = "white";
  c.fillRect(canvas.width / 2 - 250, canvas.height / 2 - 150, 500, 100);
  c.strokeRect(canvas.width / 2 - 250, canvas.height / 2 - 150, 500, 100);
  c.fillStyle = "black";
  c.fillText(Heading, canvas.width / 2 - 200, canvas.height / 2 - 110);
  c.fillText(Message, canvas.width / 2 - 200, canvas.height / 2 - 70);
}
