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
        damage: 20,
        quantity: 10,
      },
      Thunder: {
        name: "Thunder",
        damage: 40,
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
};

export function fillInventory() {
  const Inventory = {
    Items: {
      pokeball: {
        name: "Pokeball",
        description: "Wird benutzt um Pokemon zu fangen",
        quantity: 5,
        price: 200,
      },
      potion: {
        name: "Heilungstrank",
        description: "Wird benutzt um Pokemon zu heilen",
        quantity: 5,
        price: 200,
      },
    },
    Geld: {
      name: "Money",
      description: "A tool used to buy items",
      quantity: 500,
    },
    Pokemon: {
      Pikashu: PokemonList.Pikashu,
      Glumanda: PokemonList.Glumanda,
    },
  };
  return Inventory;
}

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
  for (let i = 0; i < inventoryItemsLength; i++) {
    inventoryItemsHTML += `<div class="inventory-item">
    <div class="inventory-item-name">${inventoryItemsValues[i].name}</div>
    
    <div class="inventory-item-quantity">Anzahl: ${inventoryItemsValues[i].quantity}</div>
    <div class="inventory-item-price">Preis: ${inventoryItemsValues[i].price}</div>
    </div>`;
  }
  for (let i = 0; i < inventoryPokemonLength; i++) {
    let attacks = Object.values(inventoryPokemonValues[i].attacks)
      .map(
        (attack) =>
          `${attack.name} (Damage: ${attack.damage}, Quantity: ${attack.quantity})`
      )
      .join(", ");
    inventoryPokemonHTML += `<div class="inventory-pokemon">
    <div class="inventory-pokemon-name"> ${inventoryPokemonValues[i].name}</div>
    <div class="inventory-pokemon-health">${inventoryPokemonValues[i].health}</div>
    <div class="inventory-pokemon-level">${inventoryPokemonValues[i].level}</div>
    <div class="inventory-pokemon-type">${inventoryPokemonValues[i].type}</div>
    <div class="inventory-pokemon-image"><img src="${inventoryPokemonValues[i].src}"></div>
    <div class="inventory-pokemon-attacks">${attacks}</div>
    </div>`;
  }
  document.getElementById("inventory-items").innerHTML = inventoryItemsHTML;
  document.getElementById("inventory-pokemon").innerHTML = inventoryPokemonHTML;
}
