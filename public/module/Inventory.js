// Liste aller Pokemon
export const PokemonList = {
  Pikashu: {
    name: "Pikashu",
    health: 35,
    maxHealth: 35,
    baseHealth: 35,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 5,
    type: "Electric",
    src: "",
    attacks: {
      Thunderbolt: {
        name: "Thunderbolt",
        damage: 10,
        quantity: 10,
      },
      Thunder: {
        name: "Thunder",
        damage: 15,
        quantity: 5,
      },
    },
  },
  Glumanda: {
    name: "Glumanda",
    health: 39,
    maxHealth: 39,
    baseHealth: 39,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 1,
    type: "Fire",
    src: "",
    attacks: {
      Ember: {
        name: "Ember",
        damage: 20,
        quantity: 10,
      },
      Fireblast: {
        name: "Fireblast",
        damage: 40,
        quantity: 5,
      },
    },
  },
  Rattfratz: {
    name: "Rattfratz",
    health: 20,
    maxHealth: 20,
    baseHealth: 20,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 1,
    type: "Normal",
    src: "",
    attacks: {
      Bite: {
        name: "Bite",
        damage: 10,
        quantity: 10,
      },
      Scratch: {
        name: "Scratch",
        damage: 15,
        quantity: 5,
      },
    },
  },
  Bisasam: {
    name: "Bisasam",
    health: 45,
    maxHealth: 45,
    baseHealth: 45,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 1,
    type: "Grass",
    src: "",
    attacks: {
      VineWhip: {
        name: "VineWhip",
        damage: 15,
        quantity: 10,
      },
      Solarbeam: {
        name: "Solarbeam",
        damage: 30,
        quantity: 5,
      },
    },
  },
  Schiggy: {
    name: "Schiggy",
    health: 44,
    maxHealth: 44,
    baseHealth: 44,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 1,
    type: "Water",
    src: "",
    attacks: {
      WaterGun: {
        name: "WaterGun",
        damage: 10,
        quantity: 10,
      },
      HydroPump: {
        name: "HydroPump",
        damage: 20,
        quantity: 5,
      },
    },
  },
  Hornliu: {
    name: "Hornliu",
    health: 30,
    maxHealth: 30,
    baseHealth: 30,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 1,
    type: "Bug",
    src: "",
    attacks: {
      Tackle: {
        name: "Tackle",
        damage: 10,
        quantity: 10,
      },
      PoisonSting: {
        name: "PoisonSting",
        damage: 15,
        quantity: 5,
      },
    },
  },
  Taubsi: {
    name: "Taubsi",
    health: 40,
    maxHealth: 40,
    baseHealth: 40,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 1,
    type: "Flying",
    src: "",
    attacks: {
      Peck: {
        name: "Peck",
        damage: 10,
        quantity: 10,
      },
      WingAttack: {
        name: "WingAttack",
        damage: 15,
        quantity: 5,
      },
    },
  },
  Raupy: {
    name: "Raupy",
    health: 20,
    maxHealth: 20,
    baseHealth: 20,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 1,
    type: "Bug",
    src: "",
    attacks: {
      Tackle: {
        name: "Tackle",
        damage: 10,
        quantity: 10,
      },
      StringShot: {
        name: "StringShot",
        damage: 15,
        quantity: 5,
      },
    },
  },
  BossPokemon: {
    name: "BossPokemon",
    health: 200,
    maxHealth: 200,
    baseHealth: 200,
    xp: 0,
    maxXP: 30,
    baseXP: 30,
    level: 10,
    type: "Boss",
    src: "",
    attacks: {
      BossAttack: {
        name: "BadGrade",
        damage: 30,
        quantity: 10,
      },
      BossAttack2: {
        name: "UnfairExam",
        damage: 40,
        quantity: 5,
      },
    },
  },
};

// befülle das Standart Inventar
export function fillInventory() {
  const Inventory = {
    Items: {
      pokeball: {
        name: "Pokeball",
        description: "Used to catch Pokemon",
        quantity: 5,
        price: 200,
      },
      potion: {
        name: "Heilungstrank",
        description: "Is used to heal Pokemon",
        quantity: 5,
        price: 200,
      },
    },
    Geld: {
      name: "Money",
      description: "A tool used to buy items",
      quantity: 500,
    },
    Pokemon: [],
  };
  return Inventory;
}

// Zeige das Inventar an und fülle es mit den Items und Pokemon / ist ganz viel HTML, nicht wundern mache Klassen wurden nicht benutzt
export function displayInventory(Player) {
  let inventory = Player.inventory;
  let inventoryItems = inventory.Items;
  let inventoryPokemon = inventory.Pokemon;
  let inventoryItemsKeys = Object.keys(inventoryItems);
  let inventoryPokemonKeys = Object.keys(inventoryPokemon);
  let inventoryItemsValues = Object.values(inventoryItems);
  let inventoryPokemonValues = Object.values(inventoryPokemon);
  let inventoryItemsLength = inventoryItemsKeys.length;
  let inventoryPokemonLength = inventoryPokemonKeys.length;
  let inventoryItemsHTML = "";
  let inventoryPokemonHTML = "";
  //Add a Money display
  document.getElementById(
    "inventory-money"
  ).innerHTML = `Geld: ${inventory.Geld.quantity}`;
  for (let i = 0; i < inventoryItemsLength; i++) {
    inventoryItemsHTML += `<div class="inventory-item">
    <div class="inventory-item-name">${inventoryItemsValues[i].name}</div>
    
    <div class="inventory-item-quantity">Anzahl: ${inventoryItemsValues[i].quantity}</div>
    <div class="inventory-item-price">Preis: ${inventoryItemsValues[i].price}</div>
    </div>`;
  }
  if (inventoryPokemonLength === 0) {
    inventoryPokemonHTML = "You have no Pokemon in your inventory.";
  } else {
    for (let i = 0; i < inventoryPokemonLength; i++) {
      let attacks = Object.values(inventoryPokemonValues[i].attacks)
        .map((attack) => ` ${attack.name}  Schaden: ${attack.damage}`)
        .join("<br>");
      inventoryPokemonHTML += `<div class="inventory-pokemon">
    <div class="inventory-pokemon-name"> ${inventoryPokemonValues[i].name}</div>
    <div class="inventory-pokemon-health">Health: ${inventoryPokemonValues[i].health} / ${inventoryPokemonValues[i].maxHealth}</div>
    <div class="inventory-pokemon-level">Level: ${inventoryPokemonValues[i].level} / 100</div>
    <div class="inventory-pokemon-type">XP: ${inventoryPokemonValues[i].xp} / ${inventoryPokemonValues[i].maxXP}</div>
    <div class="inventory-pokemon-image"><img src="${inventoryPokemonValues[i].src}"></div>
    <div class="inventory-pokemon-attacks">${attacks}</div>
    </div>`;
    }
  }
  document.getElementById("inventory-items").innerHTML = inventoryItemsHTML;
  document.getElementById("inventory-pokemon").innerHTML = inventoryPokemonHTML;
}
