import * as fs from "fs";

export const readData = async (): Promise<Rule[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/../7_1/data.txt`, {
      encoding: "utf-8",
    });

    return data.split("\n").map(parseLine);
  } catch (e) {
    console.error(e);
  }
};

interface ChildBag {
  colour: string;
  count: number;
}

interface Rule {
  bag: string;
  contains: ChildBag[];
}
export interface Rules {
  [key: string]: ChildBag[];
}

const parseLine = (line: string): Rule => {
  const [bag, rawContains] = line.split(" bags contain ");
  const contains = rawContains
    .replace(/ bags?/g, "")
    .replace(/\./g, "")
    .split(", ")
    .filter((x) => x !== "no other")
    .map(
      (str: string): ChildBag => ({
        colour: str.replace(/\d /, ""),
        count: parseInt(str.match(/\d/)[0]),
      })
    );
  return {
    bag,
    contains,
  };
};

export const createRules = (rules: Rule[]): Rules => {
  return rules.reduce((acc, cur) => ({ ...acc, [cur.bag]: cur.contains }), {});
};
