import { getInvalidValues } from "./helpers";
import { Rule, Ticket } from "./types";

describe("getInvalidValues", () => {
  const rules: Rule[] = [
    { name: "class", min1: 1, max1: 3, min2: 5, max2: 7 },
    { name: "row", min1: 6, max1: 11, min2: 33, max2: 44 },
    { name: "seat", min1: 13, max1: 40, min2: 45, max2: 50 },
  ];

  test.each([
    [[7, 3, 47], []],
    [[40, 4, 50], [4]],
    [[55, 2, 20], [55]],
    [[38, 6, 12], [12]],
  ])("example - %p => %p", (ticket: Ticket, result: number[]) => {
    expect(getInvalidValues(rules, ticket)).toEqual(result);
  });
});
