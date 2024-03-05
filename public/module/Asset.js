const c = canvas.getContext("2d");

export class MapConstructor {
  constructor({ position, src, MapName }) {
    this.position = position;
    this.src = src;
    this.scale = 3;
    this.name = MapName;
  }
  draw() {
    const width = this.src.width * this.scale;
    const height = this.src.height * this.scale;
    c.drawImage(this.src, this.position.x, this.position.y, width, height);
  }
}

export class PokemonConstructor {
  constructor({ name, health, level, type, attacks, src }) {
    this.name = name;
    this.health = health;
    this.level = level;
    this.type = type;
    this.attacks = attacks;
    this.src = src;
  }
  draw(positionX, positionY) {
    c.drawImage(this.src, positionX, positionY);
  }
}

export class PlayerConstructor {
  constructor({ position, src, inventory, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.src = src;
    this.inventory = inventory;
    this.frameIndex = 0;
    this.speed = 5;
    this.animationSpeed = 5; // Change this value to control animation speed
    this.direction = { x: 0, y: 0 }; // No movement initially
    this.frameCount = 0; // Add this line
  }

  draw(c, canvas, fight) {
    const Scale = 1.5;
    const frameWidth = this.src.width / 4;
    const frameHeight = this.src.height;
    if (!fight) {
      c.drawImage(
        this.src,
        frameWidth * this.frameIndex,
        0,
        frameWidth,
        frameHeight,
        canvas.width / 2 - (frameWidth / 5) * Scale,
        canvas.height / 2 - frameHeight * Scale,
        frameWidth * Scale,
        frameHeight * Scale
      );
    } else {
      c.drawImage(
        this.src,
        frameWidth * this.frameIndex,
        0,
        frameWidth,
        frameHeight,
        canvas.width / 2 + 100 - (frameWidth / 5) * Scale,
        canvas.height - 300 - frameHeight * Scale,
        frameWidth * Scale,
        frameHeight * Scale
      );
    }
  }

  move() {
    this.position.x += this.direction.x * this.speed;
    this.position.y += this.direction.y * this.speed;
    this.frameCount++; // Increment frameCount
    if (this.frameCount % this.animationSpeed === 0) {
      this.frameIndex = (this.frameIndex + 1) % 4; // Loop back to 0 after reaching the last frame
    }
  }
  Stop() {
    this.frameIndex = 0;
  }
}
