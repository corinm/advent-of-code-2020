import * as fs from "fs";

import { PasswordRecord } from ".";

export const readData = async (): Promise<PasswordRecord[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data
      .split("\n")
      .map((str) => str.replace("-", " "))
      .map((str) => str.replace(":", ""))
      .map((str) => str.split(" "))
      .map(([min, max, char, password]) => ({
        char,
        min: parseInt(min),
        max: parseInt(max),
        password,
      }));
  } catch (e) {
    console.error(e);
  }

  // return data;
};
