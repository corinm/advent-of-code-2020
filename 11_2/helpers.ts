const isSeat = (value: string): boolean => value !== ".";
const isOccupied = (value: string): boolean => value === "#";
const isEmpty = (value: string): boolean => value === "L";
const isOffGrid = (seats: string[][], x: number, y: number): boolean => {
  if (x < 0 || y < 0) {
    return true;
  } else if (y >= seats.length || x >= seats[0].length) {
    return true;
  } else {
    return false;
  }
};

const alterX = (x: number, direction: Direction): number => {
  if (["sw", "w", "nw"].includes(direction)) {
    return x - 1;
  } else if (["n", "s"].includes(direction)) {
    return x;
  } else {
    return x + 1;
  }
};
const alterY = (y: number, direction: Direction): number => {
  if (["nw", "n", "ne"].includes(direction)) {
    return y - 1;
  } else if (["w", "e"].includes(direction)) {
    return y;
  } else {
    return y + 1;
  }
};

export type Direction = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

export const checkDirection = (
  seats: string[][],
  x: number,
  y: number,
  direction: Direction
): boolean => {
  const x2 = alterX(x, direction);
  const y2 = alterY(y, direction);

  if (isOffGrid(seats, x2, y2) || isEmpty(seats[y2][x2])) {
    return false;
  } else if (isOccupied(seats[y2][x2])) {
    return true;
  } else {
    return checkDirection(seats, x2, y2, direction);
  }
};

export const countVisibleSeats = (
  seats: string[][],
  x: number,
  y: number
): number => {
  const directions: Direction[] = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
  const checked = directions.map((dir) => checkDirection(seats, x, y, dir));
  return checked.filter((occupied) => occupied === true).length;
};

const change = (
  value: string,
  seats: string[][],
  x: number,
  y: number
): string => {
  if (isSeat(value)) {
    const occupiedAdjacentSeats = countVisibleSeats(seats, x, y);
    if (isEmpty(value) && occupiedAdjacentSeats === 0) {
      return "#";
    } else if (isOccupied(value) && occupiedAdjacentSeats >= 5) {
      return "L";
    }
  }

  return value;
};

export const round = (seats: string[][]): string[][] => {
  return seats.map((row, y) => {
    return row.map((cell, x) => {
      return change(cell, seats, x, y);
    });
  });
};
