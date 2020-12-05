import * as fs from "fs";

import { Passport } from ".";

export const readData = async (): Promise<Passport[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data.split("\n\n").map((str) =>
      str
        .split("\n")
        .join(" ")
        .split(" ")
        .reduce((acc, cur) => {
          const [key, value] = cur.split(":");
          return { ...acc, [key]: value };
        }, {})
    );
  } catch (e) {
    console.error(e);
  }
};
