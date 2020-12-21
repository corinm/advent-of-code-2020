import * as fs from "fs";

export const readData = async (): Promise<string[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data.split("\n");
  } catch (e) {
    console.error(e);
  }
};

interface MaskCommand {
  type: "mask";
  mask: string;
}

export interface WriteCommand {
  type: "write";
  position: number;
  value: number;
}

type Command = MaskCommand | WriteCommand;

export const parseLines = (lines: string[]): Command[] => {
  return lines.map((line) => {
    if (line.slice(0, 4) === "mask") {
      return { type: "mask", mask: line.replace("mask = ", "") };
    } else {
      const position = parseInt(line.match(/\[(.*)\]/)[1]);
      const value = parseInt(line.replace(/mem\[\d*\] = /, ""));
      return { type: "write", position, value };
    }
  });
};

const padWithZeroes = (str: string): string => {
  const zeroesNeeded = 36 - str.length;
  return new Array(zeroesNeeded).fill("0").join("") + str;
};

export const calculateMaskedValue = (mask: string, value: number): number => {
  const valueAsBinary = padWithZeroes((value >>> 0).toString(2));
  const maskedValue = valueAsBinary
    .split("")
    .map((char, i) => (mask[i] === "X" ? char : mask[i]))
    .join("");
  return parseInt(maskedValue, 2);
};

export const solvePart1 = (commands: Command[]) => {
  const memory = [];
  let currentMask;

  commands.forEach((command) => {
    if (command.type === "mask") {
      currentMask = command.mask;
    } else if (command.type === "write") {
      memory[command.position] = calculateMaskedValue(
        currentMask,
        command.value
      );
    }
  });

  const answer = memory
    .filter((v) => v)
    .reduce((acc: number, cur: number) => acc + cur, 0);

  return answer;
};
