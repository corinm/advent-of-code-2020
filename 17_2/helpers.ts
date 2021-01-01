export type Grid = boolean[][][][];

export const generate3dGrid = (initialState: string): Grid => [
  [
    initialState
      .split("\n")
      .map((row) => row.split("").map((cell) => cell === "#")),
  ],
];

export const expandGrid = (grid: Grid): Grid => {
  return grid;
};

export interface Point {
  w: number;
  x: number;
  y: number;
  z: number;
}

export const cycle = (grid: Grid): Grid => {
  const zAxis = grid.length;
  const yAxis = grid[0].length;
  const xAxis = grid[0][0].length;
  const wAxis = grid[0][0][0].length;

  const newGrid: Grid = [];

  for (let z = -1; z < zAxis + 1; z++) {
    for (let y = -1; y < yAxis + 1; y++) {
      for (let x = -1; x < xAxis + 1; x++) {
        for (let w = -1; w < wAxis + 1; w++) {
          const newValue = getNewState({ w, x, y, z }, grid);

          if (newGrid[z + 1] === undefined) {
            newGrid[z + 1] = [];
          }
          if (newGrid[z + 1][y + 1] === undefined) {
            newGrid[z + 1][y + 1] = [];
          }
          if (newGrid[z + 1][y + 1][x + 1] === undefined) {
            newGrid[z + 1][y + 1][x + 1] = [];
          }

          newGrid[z + 1][y + 1][x + 1][w + 1] = newValue;
        }
      }
    }
  }

  return newGrid;
};

export const surroundingCells = (): Point[] => {
  const points = [];

  for (let z = -1; z <= 1; z++) {
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        for (let w = -1; w <= 1; w++) {
          if (w !== 0 || x !== 0 || y !== 0 || z !== 0) {
            points.push({ w, x, y, z });
          }
        }
      }
    }
  }

  return points;
};

const getValueAtPoint = (point: Point, grid: Grid): boolean => {
  if (
    !grid[point.z] ||
    !grid[point.z][point.y] ||
    !grid[point.z][point.y][point.x] ||
    !grid[point.z][point.y][point.x][point.w]
  ) {
    return false;
  } else {
    return true;
  }
};

export const getNewState = (cell: Point, grid: Grid): boolean => {
  const activeNeighbours = surroundingCells()
    .map(({ w, x, y, z }) => ({
      w: w + cell.w,
      x: x + cell.x,
      y: y + cell.y,
      z: z + cell.z,
    }))
    .map((point) => getValueAtPoint(point, grid))
    .reduce((acc, cur) => (cur ? acc + 1 : acc), 0);

  const cellValue = getValueAtPoint(cell, grid);

  if (cellValue === true) {
    if (activeNeighbours === 2 || activeNeighbours === 3) {
      return true;
    } else {
      return false;
    }
  } else {
    if (activeNeighbours === 3) {
      return true;
    } else {
      return false;
    }
  }
};

export const solvePart2 = (grid: Grid): number => {
  let currentGrid = grid;

  for (let i = 0; i < 6; i++) {
    currentGrid = cycle(currentGrid);
  }

  const cells = currentGrid
    .reduce((acc, cur) => [...acc, ...cur], [])
    .reduce((acc, cur) => [...acc, ...cur], [])
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((v) => v === true);

  return cells.length;
};
