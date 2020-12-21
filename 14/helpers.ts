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
