import * as fs from "fs";

import { TreeMap } from ".";

export const readData = async (): Promise<TreeMap> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data
      .split("\n")
      .map((str) => str.split("").map((str) => str === "#"));
  } catch (e) {
    console.error(e);
  }
};
