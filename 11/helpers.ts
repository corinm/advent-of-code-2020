import * as fs from "fs";

export const readData = async (): Promise<string[][]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data.split("\n").map((line) => line.split(""));
  } catch (e) {
    console.error(e);
  }
};

const isOccupied = (value: string): boolean => value === "#";
const isEmpty = (value: string): boolean => value === "L";
const isSeat = (value: string): boolean => value !== ".";

const countOccupiedAdjacentSeats = (
  seats: string[][],
  x: number,
  y: number
): number => {
  const adjacentCells = [
    { x: x - 1, y },
    { x: x - 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y },
    { x: x + 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x - 1, y: y + 1 },
  ];

  return adjacentCells
    .filter(
      (cell) =>
        cell.x >= 0 &&
        cell.y >= 0 &&
        cell.x < seats[0].length &&
        cell.y < seats.length
    )
    .map((cell) => seats[cell.y][cell.x])
    .map(isOccupied)
    .reduce((acc, cur) => (cur ? acc + 1 : acc), 0);
};

const change = (
  value: string,
  seats: string[][],
  x: number,
  y: number
): string => {
  if (isSeat(value)) {
    const occupiedAdjacentSeats = countOccupiedAdjacentSeats(seats, x, y);
    if (isEmpty(value) && occupiedAdjacentSeats === 0) {
      return "#";
    } else if (isOccupied(value) && occupiedAdjacentSeats >= 4) {
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

export const isSame = (before: string[][], after: string[][]): boolean => {
  // console.log(before, after);

  if (before.length === 0 || after.length === 0) {
    return false;
  }

  const result = after.map((row, y) => {
    return row.map((cell, x) => cell === before[y][x]);
  });

  // console.log(result);

  return (
    result
      .reduce((acc, cur) => [...acc, ...cur], [])
      .filter((same) => same === false).length === 0
  );
};

export const countOccupied = (seats: string[][]): number => {
  return seats
    .map((row) => row.map(isOccupied))
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((occupied) => occupied === true).length;
};
