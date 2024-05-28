export const createGrid = (w, h, initialValue) => {
  let output = [];
  for (let x = 0; x < w; x++) {
    let row = [];
    for (let y = 0; y < h; y++) {
      row.push(initialValue());
    }
    output.push(row);
  }
  return output;
};

export const nextGrid = (
  currentGrid,
  ageGrid = [],
  spontaneousLife = false,
  oldAge = false
) => {
  let countGrid = createGrid(
    currentGrid.length + 2,
    currentGrid[0].length + 2,
    () => 0
  );
  for (let x = 0; x < currentGrid.length; x++) {
    for (let y = 0; y < currentGrid[x].length; y++) {
      if (currentGrid[x][y]) {
        countGrid[x][y]++;
        countGrid[x + 1][y]++;
        countGrid[x + 2][y]++;
        countGrid[x][y + 1]++;
        countGrid[x + 2][y + 1]++;
        countGrid[x][y + 2]++;
        countGrid[x + 1][y + 2]++;
        countGrid[x + 2][y + 2]++;
        if (oldAge) ageGrid[x][y]++;
      }
    }
  }
  let output = [];
  for (let x = 1; x < countGrid.length - 1; x++) {
    let row = [];
    for (let y = 1; y < countGrid[x].length - 1; y++) {
      if (isAlive(currentGrid[x - 1][y - 1], countGrid[x][y])) {
        if (oldAge && ageGrid[x - 1][y - 1] > 20) {
          row.push(false);
          ageGrid[x - 1][y - 1] = 0;
        } else {
          row.push(true);
        }
      } else {
        if (spontaneousLife && Math.random() > 0.999) {
          row.push(true);
        } else {
          row.push(false);
          if (oldAge) ageGrid[x - 1][y - 1] = 0;
        }
      }
    }
    output.push(row);
  }
  return output;
};

const isAlive = (currentState, aliveNeighbors) => {
  if (currentState) {
    if (aliveNeighbors < 2) return false;
    if (aliveNeighbors === 2 || aliveNeighbors === 3) return true;
    if (aliveNeighbors > 3) return false;
  } else {
    if (aliveNeighbors === 3) return true;
    return false;
  }
};
