export type Grid = boolean[][][];

export const generate3dGrid = (initialState: string): Grid => [
  initialState
    .split("\n")
    .map((row) => row.split("").map((cell) => cell === "#")),
];

export const expandGrid = (grid: Grid): Grid => {
  return grid;
};

export interface Point {
  x: number;
  y: number;
  z: number;
}

export const cycle = (grid: Grid): Grid => {
  const layers = grid.length;
  const rows = grid[0].length;
  const columns = grid[0].length;

  const newGrid: Grid = [];

  for (let z = -1; z < layers + 1; z++) {
    for (let y = -1; y < rows + 1; y++) {
      for (let x = -1; x < columns + 1; x++) {
        const newValue = getNewState({ x, y, z }, grid);

        if (newGrid[z + 1] === undefined) {
          newGrid[z + 1] = [];
        }
        if (newGrid[z + 1][y + 1] === undefined) {
          newGrid[z + 1][y + 1] = [];
        }

        newGrid[z + 1][y + 1][x + 1] = newValue;
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
        if (x !== 0 || y !== 0 || z !== 0) {
          points.push({ x, y, z });
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
    !grid[point.z][point.y][point.x]
  ) {
    return false;
  } else {
    return true;
  }
};

export const getNewState = (cell: Point, grid: Grid): boolean => {
  const activeNeighbours = surroundingCells()
    .map(({ x, y, z }) => ({
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

export const solvePart1 = (grid: Grid): number => {
  let currentGrid = grid;

  for (let i = 0; i < 6; i++) {
    currentGrid = cycle(currentGrid);
  }

  const cells = currentGrid
    .reduce((acc, cur) => [...acc, ...cur], [])
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((v) => v === true);

  return cells.length;
};
