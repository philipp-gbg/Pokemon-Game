//Alle Farben für die Kollisionserkennung
const Wand = [255, 0, 0, 255]; // ROT
const PokemonEncounter = [0, 255, 0, 255]; // GRÜN

export function Collision(line, targetColor, c) {
  // Get the entire image data once
  const imageData = c.getImageData(0, 0, c.canvas.width, c.canvas.height).data;

  // Determine the step size based on the length of the line
  const step = Math.max(1, Math.floor(line.length / 1000));

  for (let i = 0; i < line.length; i += step) {
    const point = line[i];
    let x = point[0];
    let y = point[1];

    // Calculate the index in the image data array
    let index = (x + y * c.canvas.width) * 4;
    let pixelArray = Array.from(imageData.slice(index, index + 4));

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
