const c = canvas.getContext("2d");

export class MapConstructor {
  constructor({ position, src }) {
    this.position = position;
    this.src = src;
  }

  draw() {
    c.drawImage(this.src, this.position.x, this.position.y);
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

  draw(c, canvas) {
    const Scale = 1.5;
    const frameWidth = this.src.width / 4;
    const frameHeight = this.src.height;
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
