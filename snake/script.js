Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

let highscore = localStorage.getObj("highscore") || 0;
const highscoreH1 = document.getElementById("highscoreh1");

const snakeObject = [
  {
    x: 1,
    y: 1,
    z: "b",
  },
  {
    x: 1,
    y: 2,
    z: "b",
  },
  {
    x: 1,
    y: 3,
    z: "b",
  },
];

let gridsize = [16, 32];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const appleLocation = [8, 8];
let appleExist = false;

let addRestartButton = function () {
  const snakeContainer = document.getElementById("container");
  const resetForm = document.createElement("form");
  const resetButton = document.createElement("button");

  resetForm.className = "resetForm";
  resetButton.innerText = "RESTART";

  resetForm.appendChild(resetButton);

  snakeContainer.appendChild(resetForm);
};

let renderApple = function (appleExist, snakeObject, gridsize) {
  if (appleExist === false) {
    appleLocation[0] = getRandomInt(gridsize[0] - 1) + 1;
    appleLocation[1] = getRandomInt(gridsize[1] - 1) + 1;

    for (let i = 0; i < snakeObject.length; i++) {
      if (
        appleLocation[1] === snakeObject[i].x &&
        appleLocation[0] === snakeObject[i].y
      ) {
        appleLocation[0] = getRandomInt(gridsize[0] - 1) + 1;
        appleLocation[1] = getRandomInt(gridsize[1] - 1) + 1;
        i = 0;
      }
    }
    return (appleExist = true);
  }
};
function checkDeath(snakeObject, gridsize) {
  if (
    snakeObject[snakeObject.length - 1].x <= 0 ||
    snakeObject[snakeObject.length - 1].x >= gridsize[1] + 1 ||
    snakeObject[snakeObject.length - 1].y <= 0 ||
    snakeObject[snakeObject.length - 1].y >= gridsize[0] + 1
  ) {
    return (death = true);
  }
  for (let i = 0; i < snakeObject.length - 1; i++) {
    if (
      snakeObject[snakeObject.length - 1].y == snakeObject[i].y &&
      snakeObject[snakeObject.length - 1].x == snakeObject[i].x
    ) {
      return (death = true);
    }
  }
}

let renderSnake = function (snakeObject) {
  const snakeContainer = document.getElementById("container");
  snakeContainer.innerHTML = "";
  let i = 0;

  snakeObject.forEach((xy) => {
    const snakeSegment = document.createElement("div");
    snakeSegment.id = "snakeSegment";
    snakeSegment.style = `
           grid-row: ${snakeObject[i].y}/${snakeObject[i].y};
           grid-column: ${snakeObject[i].x}/${snakeObject[i].x};`;

    if (snakeObject[i].z === "t") {
      snakeSegment.className = `snakeSegmentTop`;
    } else if (snakeObject[i].z === "l") {
      snakeSegment.className = `snakeSegmentLeft`;
    } else if (snakeObject[i].z === "b") {
      snakeSegment.className = `snakeSegmentBottom`;
    } else if (snakeObject[i].z === "r") {
      snakeSegment.className = `snakeSegmentRight`;
    }

    snakeContainer.appendChild(snakeSegment);

    i++;
  });

  if (highscore < snakeObject.length - 3) {
    highscore = snakeObject.length - 3;
  }
  highscoreH1.innerHTML = "high score = " + highscore;
  localStorage.setObj("highscore", highscore);

  const apple = document.createElement("div");
  apple.id = "apple";
  apple.style = `
  grid-row: ${appleLocation[0]}/${appleLocation[0]};
  grid-column: ${appleLocation[1]}/${appleLocation[1]};`;

  snakeContainer.appendChild(apple);
};

let snakeInput = function (snakeObject) {
  let appleEaten = false;

  if (i[0] === 1) {
    snakeObject.push({
      x: snakeObject[snakeObject.length - 1].x,
      y: snakeObject[snakeObject.length - 1].y - 1,
      z: "t",
    });
  } else if (i[0] === 2) {
    snakeObject.push({
      x: snakeObject[snakeObject.length - 1].x - 1,
      y: snakeObject[snakeObject.length - 1].y,
      z: "l",
    });
  } else if (i[0] === 3) {
    snakeObject.push({
      x: snakeObject[snakeObject.length - 1].x,
      y: snakeObject[snakeObject.length - 1].y + 1,
      z: "b",
    });
  } else if (i[0] === 4) {
    snakeObject.push({
      x: snakeObject[snakeObject.length - 1].x + 1,
      y: snakeObject[snakeObject.length - 1].y,
      z: "r",
    });
  }

  if (
    snakeObject[snakeObject.length - 1].x === appleLocation[1] &&
    snakeObject[snakeObject.length - 1].y === appleLocation[0]
  ) {
    appleEaten = true;
    appleExist = false;
  }
  if (appleEaten !== true && i[0] !== 0) {
    snakeObject.shift();
  }

  // console.log(snakeObject);
};

let i = [0, 0];
window.addEventListener("keypress", (e) => {
  if (e.which === 119 && i[1] !== 3) {
    i[0] = 1;
  } else if (e.which === 97 && i[1] !== 4) {
    i[0] = 2;
  } else if (e.which === 115 && i[1] !== 1) {
    i[0] = 3;
  } else if (e.which === 100 && i[1] !== 2) {
    i[0] = 4;
  }
  //  console.log("ww");
  //  console.log(i);
});

let death = false;
let snakeTick = setInterval(function () {
  i[1] = i[0];
  snakeInput(snakeObject);
  death = checkDeath(snakeObject, gridsize);
  renderSnake(snakeObject);
  if (death === true) {
    addRestartButton();
    clearInterval(snakeTick);
  }
  appleExist = renderApple(appleExist, snakeObject, gridsize);
}, 100);
