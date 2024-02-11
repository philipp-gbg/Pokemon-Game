//Alle Farben für die Kollisionserkennung
const Wand = [255, 0, 0, 255]; // ROT
const PokemonEncounter = [0, 255, 0, 255]; // GRÜN


export function Collision(line, targetColor, c) {
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

export function PokemonEncounterFunction(LeftX, RightX, UpperY, frameCount, c) {
  //wird alle 120 Frames ausgeführt
  if (frameCount % 120 === 0) {
    let PokemonEncounterCollision = Collision(
      [
        [LeftX + 10, UpperY],
        [RightX - 10, UpperY],
      ],
      PokemonEncounter,
      c
    );
    console.log(PokemonEncounterCollision);
    if (PokemonEncounterCollision == true) {
      if (Math.random() * 10 > 7) {
        return true;
      }
    }
  }
  // Setze frameCount auf 0, wenn es größer als 120 ist
  if (frameCount >= 120) {
    frameCount = 0;
  }
}

export function GeneralCollision(LeftX, RightX, LowerY, c, targetColor) {
  if (
    Collision(
      [
        [LeftX + 10, LowerY],
        [RightX - 10, LowerY],
      ],
      targetColor,
      c
    )
  ) {
    return true;
  }
  return false;
}

export function CollisionDetection(LeftX, RightX, UpperY, LowerY, c) {
  let CollisionUP = Collision(
    [
      [LeftX + 10, UpperY],
      [RightX - 10, UpperY],
    ],
    Wand,
    c
  );
  let CollisionDown = Collision(
    [
      [LeftX + 10, LowerY],
      [RightX - 10, LowerY],
    ],
    Wand,
    c
  );
  let CollisionLeft = Collision(
    [
      [LeftX, UpperY + 10],
      [LeftX, LowerY - 10],
    ],
    Wand,
    c
  );
  let CollisionRight = Collision(
    [
      [RightX, UpperY + 10],
      [RightX, LowerY - 10],
    ],
    Wand,
    c
  );

  return { CollisionUP, CollisionDown, CollisionLeft, CollisionRight };
}
