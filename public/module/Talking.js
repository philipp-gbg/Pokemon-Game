export const DialogSets = {
  1: {
    Name: ["Mother", "Child"],
    text: [
      "I heard you talking about going out to enslave Pokémon. That sounds dangerous   and wrong. Why would you do that?",
      "Mom, it's not like that. We just train them. Professor Oak at the camp teaches  us.",
      "Train or enslave, it's risky. And this professor, he sounds like a bad influencePlease reconsider.",
      "But Mom, it's my dream to become a Pokémon Trainer. I'll be careful, I promise.",
      "Dream or not, it's about doing what's right. Enslaving creatures for battles    isn't right. Can't you see?",
      "It's not about enslaving. It's about partnership and adventure. I'll show you   Pokémon can be happy with us.",
      "I worry about the consequences, for you and the Pokémon.                        Remember, power comes with responsibility.",
      "I understand, but I have to do this. I'll be responsible and make you proud,    you'll see.",
      "I just hope you're right. Please be safe and remember your values.              And... keep in touch, okay?",
      "I will, Mom. Thanks for understanding. I'll be careful, I promise.",
      "",
    ],
  },
  2: {
    Name: ["Professor", "Child"],
    text: [
      "So, you're interested in becoming a Pokémon Trainer? It's a path of great power and responsibility.",
      "Yes, Professor! I want to train Pokémon and go on adventures. But I want to makesure they're happy.",
      "Ah, a noble heart. But remember, Pokémon are wild creatures. It takes strength  to tame them.",
      "I've read stories of Trainers who work alongside their Pokémon, not by forcing  them but by forming a bond.",
      "A bond, you say? That's an idealistic view. True control requires dominance.    That's the key to success.",
      "But isn't that wrong? I believe it's about trust and friendship. That's what    makes a great Trainer.",
      "You have much to learn. The world isn't so black and white. Sometimes, power    is necessary.",
      "I understand power might be needed, but I'll prove that kindness and            understanding can prevail.",
      "Very well. It's important to challenge our beliefs. Go, and see if your ideals  hold up in the real world.",
      "Thank you, Professor. I'll do my best and show you that Pokémon can be our      friends, not our servants.",
      "Here take this Pikashu, it will serve you well.",
      "Thanks Professeur, I'll take good care of it.",
      "",
    ],
  },
};

export function Dialog(counter, Text, c, canvas, isWaiting, DialogTime) {
  if (counter % 2 === 0) {
    TalkingBox(
      DialogSets[Text].Name[0],
      DialogSets[Text].text[counter],
      c,
      canvas
    );
  } else {
    TalkingBox(
      DialogSets[Text].Name[1],
      DialogSets[Text].text[counter],
      c,
      canvas
    );
  }

  if (!isWaiting) {
    isWaiting = true;
    return new Promise((resolve) => {
      setTimeout(function () {
        counter++;
        isWaiting = false;
        resolve(counter);
      }, DialogTime);
    });
  }
  return Promise.resolve(counter);
}

export function TalkingBox(Heading, Message, c, canvas) {
  if (Message.length > 80) {
    let Message1 = Message.slice(0, 80);
    let Message2 = Message.slice(80, Message.length);
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
