export function fillInventory() {
  const Inventory = {
    Items: {
      pokeball: {
        name: "Pokeball",
        description: "A tool used to capture Pokemon",
        quantity: 5,
        price: 200,
      },
      potion: {
        name: "Potion",
        description: "A tool used to heal Pokemon",
        quantity: 5,
        price: 200,
      },
    },
    Pokemon: {
      Pikashu: {
        name: "Pikashu",
        health: 35,
        level: 1,
        type: "Electric",
        attacks: {
          ThunderShock: {
            name: "ThunderShock",
            damage: 15,
            quantity: 10,
          },
          Thunderbolt: {
            name: "Thunderbolt",
            damage: 25,
            quantity: 5,
          },
        },
      },
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
    <div class="inventory-item-description">${inventoryItemsValues[i].description}</div>
    <div class="inventory-item-quantity">${inventoryItemsValues[i].quantity}</div>
    <div class="inventory-item-price">${inventoryItemsValues[i].price}</div>
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
    <div class="inventory-pokemon-name">${inventoryPokemonValues[i].name}</div>
    <div class="inventory-pokemon-health">${inventoryPokemonValues[i].health}</div>
    <div class="inventory-pokemon-level">${inventoryPokemonValues[i].level}</div>
    <div class="inventory-pokemon-type">${inventoryPokemonValues[i].type}</div>
    <div class="inventory-pokemon-attacks">${attacks}</div>
    </div>`;
  }
  document.getElementById("inventory-items").innerHTML = inventoryItemsHTML;
  document.getElementById("inventory-pokemon").innerHTML = inventoryPokemonHTML;
}
