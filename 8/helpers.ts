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
