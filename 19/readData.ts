import * as fs from "fs";

import { Rules, Rule } from "./types";

const readData = async (): Promise<{ rules: Rules; data: string[] }> => {
  try {
    const file = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    const [rawRules, rawData] = file.split("\n\n");

    const rules = rawRules
      .split("\n")
      .map(parseRule)
      .reduce(
        (acc: Rules, cur: [number, Rule]) => ({ ...acc, [cur[0]]: cur[1] }),
        {}
      );
    const data = rawData.split("\n");

    return { rules, data };
  } catch (e) {
    console.error(e);
  }
};

const parseRule = (str: string): [number, Rule] => {
  const key = parseInt(str.split(":")[0]);

  if (str.indexOf("|") !== -1) {
    const [rules1Raw, rules2Raw] = str.split(":")[1].split("|");
    const rules1 = rules1Raw
      .split(" ")
      .map((num) => parseInt(num))
      .filter((v) => !isNaN(v));
    const rules2 = rules2Raw
      .split(" ")
      .map((num) => parseInt(num))
      .filter((v) => !isNaN(v));

    return [key, { type: "subor", rules1, rules2 }];
  } else if (str.indexOf('"') !== -1) {
    return [key, { type: "exact", char: str.split('"')[1] }];
  } else {
    const rules = str
      .split(":")[1]
      .split(" ")
      .map((num) => parseInt(num))
      .filter((v) => !isNaN(v));
    return [key, { type: "sub", rules }];
  }
};

export default readData;
