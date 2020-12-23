import {
  getInvalidValues,
  identifyPositions,
  isValid,
  solvePart2,
} from "./helpers";
import { Positions, Rule, Ticket } from "./types";

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

describe("isValid", () => {
  const rules: Rule[] = [
    { name: "class", min1: 1, max1: 3, min2: 5, max2: 7 },
    { name: "row", min1: 6, max1: 11, min2: 33, max2: 44 },
    { name: "seat", min1: 13, max1: 40, min2: 45, max2: 50 },
  ];

  test.each([
    [[7, 3, 47], true],
    [[40, 4, 50], false],
    [[55, 2, 20], false],
    [[38, 6, 12], false],
  ])("example - %p => %p", (ticket: Ticket, result: boolean) => {
    expect(isValid(rules, ticket)).toEqual(result);
  });
});

describe("identifyPositions", () => {
  const rules: Rule[] = [
    { name: "class", min1: 0, max1: 1, min2: 4, max2: 19 },
    { name: "row", min1: 0, max1: 5, min2: 8, max2: 19 },
    { name: "seat", min1: 0, max1: 13, min2: 16, max2: 19 },
  ];

  test.each([
    [
      [
        [3, 9, 18],
        [15, 1, 5],
        [5, 14, 9],
      ],
      { row: 1, class: 2, seat: 3 },
    ],
  ])("example - %p => %p", (tickets, result) => {
    expect(identifyPositions(rules, tickets)).toEqual(result);
  });
});

describe("solvePart2", () => {
  test("example", () => {
    const rules = [
      { name: "departure_1", min1: 2, max1: 2, min2: 2, max2: 2 },
      { name: "4", min1: 5, max1: 5, min2: 5, max2: 5 },
      { name: "3", min1: 4, max1: 4, min2: 4, max2: 4 },
      { name: "departure_6", min1: 6, max1: 6, min2: 6, max2: 6 },
      { name: "departure_2", min1: 3, max1: 3, min2: 3, max2: 3 },
    ];
    const otherTickets = [[2, 3, 4, 5, 6]];
    const myTicket = [2, 3, 4, 5, 6];
    expect(solvePart2(rules, otherTickets, myTicket)).toEqual(2 * 3 * 6);
  });
});
