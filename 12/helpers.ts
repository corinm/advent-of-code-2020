import * as fs from "fs";

import ShipPart1, { Action, Instruction } from "./ShipPart1";
import ShipPart2 from "./ShipPart2";

export const readData = async (): Promise<Instruction[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data.split("\n").map(parseLine);
  } catch (e) {
    console.error(e);
  }
};

export const parseLine = (line: string): Instruction => ({
  action: line.slice(0, 1) as Action,
  value: parseInt(line.slice(1)),
});

export const solvePart1 = (instructions: Instruction[]): number => {
  const ferry = new ShipPart1();
  ferry.navigate(instructions);

  const { x, y } = ferry.getPosition();
  const manhattanDistance = Math.abs(x) + Math.abs(y);

  return manhattanDistance;
};

export const solvePart2 = (instructions: Instruction[]): number => {
  const ferry = new ShipPart2();
  ferry.navigate(instructions);

  const { x, y } = ferry.getPosition();
  const manhattanDistance = Math.abs(x) + Math.abs(y);

  return manhattanDistance;
};
