import * as fs from "fs";

import { Rule, Ticket } from "./types";

export const readData = async (): Promise<[Rule[], Ticket, Ticket[]]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    const [rulesRaw, ticketRaw, ticketsRaw] = data
      .split("\n\n")
      .map((s) => s.split("\n"));
    return [
      rulesRaw.map(parseRule),
      ticketRaw[1].split(",").map(convertToInt),
      ticketsRaw
        .slice(1)
        .map((ticketStr) => ticketStr.split(",").map(convertToInt)),
    ];
  } catch (e) {
    console.error(e);
  }
};

const parseRule = (str: string): Rule => {
  const [name, rulesStr] = str.split(": ");
  const [rule1, rule2] = rulesStr.split(" or ");
  return {
    name,
    min1: parseInt(rule1.split("-")[0]),
    max1: parseInt(rule1.split("-")[1]),
    min2: parseInt(rule2.split("-")[0]),
    max2: parseInt(rule2.split("-")[1]),
  };
};

const convertToInt = (str: string): number => parseInt(str);
