import Time from './js/time';
import { createGrid, nextGrid } from './js/conway';
import { render } from './js/draw';

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

const clock = new Time();

const game = document.getElementById('conway').getContext('2d');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const fpsSlider = document.getElementById('fpsSlider');
const fpsLabel = document.getElementById('fpsLabel');
const randomStartCheckbox = document.getElementById('randomStart');
const oldAgeCheckbox = document.getElementById('oldAge');
const spontaneousLifeCheckbox = document.getElementById('spontaneousLife');

game.canvas.width = window.innerWidth - 20;
game.canvas.height = window.innerHeight * 0.8;

const width = game.canvas.width;
const height = game.canvas.height;
const size = 10;
let gameGrid = [];
let ageGrid = [];
let mouseDown = false;
let previousMouseDownX = 0;
let previousMouseDownY = 0;
let useRandomStart = false;
let spontaneousLife = false;
let oldAge = false;
let fps = 2;
let isRunning = false;

gameGrid = createGrid(
  width / size,
  height / size,
  useRandomStart ? () => Math.random() > 0.8 : () => false
);

ageGrid = createGrid(width / size, height / size, () => 0);

fpsSlider.value = fps;

randomStartCheckbox.onchange = event => {
  useRandomStart = event.target.checked;
  gameGrid = createGrid(
    width / size,
    height / size,
    useRandomStart ? () => Math.random() > 0.8 : () => false
  );

  render(game, gameGrid, width, height, size);
};

oldAgeCheckbox.onchange = event => {
  oldAge = event.target.checked;
  ageGrid = createGrid(width / size, height / size, () => 0);
};

spontaneousLifeCheckbox.onchange = event => {
  spontaneousLife = event.target.checked;
};

fpsSlider.onchange = event => {
  fps = event.target.value;
  fpsLabel.innerText = `FPS: ${fps}`;
};

pauseButton.onclick = () => {
  isRunning = !isRunning;
  pauseButton.innerText = isRunning ? 'pause' : 'start';
};

resetButton.onclick = () => {
  gameGrid = createGrid(
    width / size,
    height / size,
    useRandomStart ? () => Math.random() > 0.8 : () => false
  );
  render(game, gameGrid, width, height, size);
};

game.canvas.onclick = event => {
  let x = Math.floor(event.offsetX / size);
  let y = Math.floor(event.offsetY / size);

  game.fillStyle = !gameGrid[x][y] ? `#ff0000` : '#ffffff';

  gameGrid[x][y] = !gameGrid[x][y];

  game.fillRect(x * size, y * size, size, size);
  previousMouseDownX = x;
  previousMouseDownY = y;
};

game.canvas.onmousedown = event => (mouseDown = true);
game.canvas.onmouseup = event => (mouseDown = false);
game.canvas.onmouseleave = event => (mouseDown = false);

game.canvas.onmousemove = event => {
  if (mouseDown) {
    let x = Math.floor(event.offsetX / size);
    let y = Math.floor(event.offsetY / size);

    if (previousMouseDownX !== x || previousMouseDownY !== y) {
      game.fillStyle = !gameGrid[x][y] ? `#ff0000` : '#ffffff';

      gameGrid[x][y] = !gameGrid[x][y];

      game.fillRect(x * size, y * size, size, size);
      previousMouseDownX = x;
      previousMouseDownY = y;
    }
  }
};

render(game, gameGrid, width, height, size);

//game loop
while (true) {
  clock.delta;
  if (isRunning) {
    gameGrid = nextGrid(gameGrid, ageGrid, spontaneousLife, oldAge);

    render(game, gameGrid, width, height, size);
  }
  await sleep(1000 / fps - clock.delta);
}
