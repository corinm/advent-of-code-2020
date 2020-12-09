import * as fs from "fs";

export type Op = "nop" | "acc" | "jmp";

export interface Instruction {
  op: Op;
  arg: number;
}

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

const parseLine = (line: string): Instruction => {
  const [op, argStr] = line.split(" ");
  return { op: op as Op, arg: Number(argStr) };
};

export const solvePart1 = (instructions: Instruction[]): number => {
  let pointer = 0;
  let accumulator = 0;
  let running = true;
  let instructionsRun = {};

  while (running) {
    if (instructionsRun[pointer]) {
      return accumulator;
    }
    if (!instructions[pointer]) {
      return accumulator;
    }

    const { op, arg } = instructions[pointer];
    instructionsRun[pointer] = true;

    if (op === "nop") {
      pointer++;
    } else if (op === "acc") {
      accumulator += arg;
      pointer++;
    } else if (op === "jmp") {
      pointer += arg;
    }
  }
};

export const runsToInfiniteLoop = (instructions: Instruction[]): boolean => {
  let pointer = 0;
  let running = true;
  let instructionsRun: Set<number> = new Set();

  while (running) {
    if (instructionsRun.has(pointer)) {
      return true;
    }
    if (!instructions[pointer]) {
      return false;
    }

    const { op, arg } = instructions[pointer];
    instructionsRun.add(pointer);

    if (op === "nop") {
      pointer++;
    } else if (op === "acc") {
      pointer++;
    } else if (op === "jmp") {
      pointer += arg;
    }
  }
};
