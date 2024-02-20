export const DialogSets = {
  1: {
    Name: "Professor Oak",
    text: [
      "Welcome to the world of Pokemon!",
      "My name is Oak! People call me the Pokemon Prof!",
      "This world is inhabited by creatures called Pokemon!",
      "For some people, Pokemon are pets. Others use them for fights.",
      "Myself...I study Pokemon as a profession.",
      "First, what is your name?",
    ],
  },
};

export function Dialog(counter, Text, c, canvas, isWaiting) {
  TalkingBox(DialogSets[Text].Name, DialogSets[Text].text[counter], c, canvas);

  if (!isWaiting) {
    isWaiting = true;
    return new Promise((resolve) => {
      setTimeout(function () {
        counter++;
        isWaiting = false;
        resolve(counter);
      }, 3000);
    });
  }
  return Promise.resolve(counter);
}

export function TalkingBox(Heading, Message, c, canvas) {
  if (Message.length > 100) {
    let Message1 = Message.slice(0, 90);
    let Message2 = Message.slice(90, Message.length);
    c.lineWidth = 3;
    c.strokeStyle = "black";
    c.fillStyle = "white";
    c.fillRect(20, canvas.height - 175, canvas.width - 50, 150);
    c.strokeRect(20, canvas.height - 175, canvas.width - 50, 150);
    c.fillStyle = "black";
    c.font = "30px Arial";
    c.textAlign = "left";
    c.fillText(Heading, 30, canvas.height - 130);
    c.fillText(Message1, 30, canvas.height - 90);
    c.fillText(Message2, 30, canvas.height - 60);
  } else {
    c.lineWidth = 3;
    c.strokeStyle = "black";
    c.fillStyle = "white";
    c.fillRect(20, canvas.height - 175, canvas.width - 50, 150);
    c.strokeRect(20, canvas.height - 175, canvas.width - 50, 150);
    c.fillStyle = "black";
    c.font = "30px Arial";
    c.textAlign = "left";
    c.fillText(Heading, 30, canvas.height - 130);
    c.fillText(Message, 30, canvas.height - 90);
  }
}

export function ShowMessage(Heading, Message, c, canvas) {
  c.fillStyle = "white";
  c.fillRect(canvas.width / 2 - 250, canvas.height / 2 - 150, 500, 100);
  c.strokeRect(canvas.width / 2 - 250, canvas.height / 2 - 150, 500, 100);
  c.fillStyle = "black";
  c.font = "30px Arial";
  c.textAlign = "left";
  c.fillText(Heading, canvas.width / 2 - 240, canvas.height / 2 - 110);
  c.fillText(Message, canvas.width / 2 - 240, canvas.height / 2 - 70);
}
