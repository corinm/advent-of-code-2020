import * as fs from "fs";

export const readData = async (): Promise<Rule[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });

    return data.split("\n").map(parseLine);
  } catch (e) {
    console.error(e);
  }
};

export interface Rule {
  bag: string;
  contains: string[];
}

const parseLine = (line: string): Rule => {
  const [bag, rawContains] = line.split(" bags contain ");
  const contains = rawContains
    .replace(/\d+ /g, "")
    .replace(/ bags?/g, "")
    .replace(/\./g, "")
    .split(", ")
    .filter((x) => x !== "no other");
  return {
    bag,
    contains,
  };
};

export interface FlippedRules {
  [key: string]: string[];
}

export const flipLogic = (rules: Rule[]): FlippedRules => {
  return rules.reduce((acc, cur) => {
    const parent = cur.bag;
    const newAcc = { ...acc };
    cur.contains.forEach((bag: string) => {
      if (newAcc[bag]) {
        newAcc[bag].push(parent);
      } else {
        newAcc[bag] = [parent];
      }
    });
    return newAcc;
  }, {});
};
