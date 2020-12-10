import * as fs from "fs";

export const readData = async (): Promise<number[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data.split("\n").map((line) => parseInt(line));
  } catch (e) {
    console.error(e);
  }
};
