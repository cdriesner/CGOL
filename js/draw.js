export const drawTile = (game, x, y, color, size) => {
  game.fillStyle = color;
  game.fillRect(x, y, size, size);
};

export const render = (game, gameGrid, width, height, size) => {
  game.clearRect(0, 0, width, height);
  drawGrid(game, width, height, size);
  for (let x = 0; x < gameGrid.length; x++) {
    for (let y = 0; y < gameGrid[x].length; y++) {
      if (gameGrid[x][y]) drawTile(game, x * size, y * size, '#000000', size);
    }
  }
};

export const drawGrid = (canvas, width, height, size) => {
  canvas.fillStyle = '#aaaaaa';
  for (let x = -1; x < width; x += size) {
    canvas.fillRect(x, 0, 2, height);
  }
  for (let y = -1; y < height; y += size) {
    canvas.fillRect(0, y, width, 2);
  }
};

export default drawGrid;
