//Alle Farben für die Kollisionserkennung
const Wand = [255, 0, 0, 255]; // ROT
const PokemonEncounter = [0, 255, 0, 255]; // GRÜN

export function Collision(line, targetColor, c) {
  // Schrittweite für die Kollisionsabfrage (Performance)
  const step = Math.max(1, Math.floor(line.length / 1000));
  // Iteriere über die Linie
  for (let i = 0; i < line.length; i += step) {
    const point = line[i];
    let x = point[0];
    let y = point[1];

    // Speichere die Farbe des Pixels
    let pixelData = c.getImageData(x, y, 1, 1).data;
    //  Vergleiche die Farbe des Pixels mit der Ziel-Farbe
    if (pixelData.toString() === targetColor.toString()) {
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
// Kollisionsabfrage für die Wand und die Kollision mit dem Spieler
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
  // Rückgabe der Kollisionserkennung
  return { CollisionUP, CollisionDown, CollisionLeft, CollisionRight };
}
