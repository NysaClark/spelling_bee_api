const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const app = express();

const games = require("./data/games.json");
const pangrams = require("./data/pangrams.json");

app.use(cors()) 
app.use(express.json());

const calcTotalPoints = (dict, panagramsList) => {
  let points = 0;
  dict.forEach((word) => {
    if (panagramsList.includes(word)) {
      points += 7;
    }

    if (word.length > 4) {
      points += word.length;
    } else {
      points += 1;
    }
  });
  return points;
};

app.get("/", (req, res) => {
  let randomGame = games[Math.floor(Math.random() * 17589)];

  let panagramsList = pangrams[randomGame.id.split("_")[0]]
  let totalPoints = calcTotalPoints(randomGame.dictionary, panagramsList);

  res.json({
    letters: randomGame.chars,
    middle: randomGame.middle,
    dictionary: randomGame.dictionary,
    pangrams: panagramsList,
    totalPoints,
    ranks: {
      "beginner": {
        id: 0,
        points: 0,
      },
      "good start": {
        id: 1,
        points: Math.floor(totalPoints * 0.1)
      },
      "moving up": {
        id: 2,
        points: Math.floor(totalPoints * 0.15)
      },
      "good": {
        id: 3,
        points: Math.floor(totalPoints * 0.2)
      },
      "solid": {
        id: 4,
        points: Math.floor(totalPoints * 0.3),
      },
      "nice": {
        id: 5,
        points: Math.floor(totalPoints * 0.4),
      },
      "great": {
        id: 6,
        points: Math.floor(totalPoints * 0.5),
      },
      "amazing": {
        id: 7,
        points: Math.floor(totalPoints * 0.6),
      },
      "genius": {
        id: 8,
        points: Math.floor(totalPoints * 0.7),
      },
    }
  });
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
