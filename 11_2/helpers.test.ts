import { countVisibleSeats, checkDirection, Direction } from "./helpers";

const example1 = [
  [".", ".", ".", ".", ".", ".", ".", "#", "."],
  [".", ".", ".", "#", ".", ".", ".", ".", "."],
  [".", "#", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", "#", "L", ".", ".", ".", ".", "#"],
  [".", ".", ".", ".", "#", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  ["#", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "#", ".", ".", ".", ".", "."],
];

const example2 = [
  [".", "#", "#", ".", "#", "#", "."],
  ["#", ".", "#", ".", "#", ".", "#"],
  ["#", "#", ".", ".", ".", "#", "#"],
  [".", ".", ".", "L", ".", ".", "."],
  ["#", "#", ".", ".", ".", "#", "#"],
  ["#", ".", "#", ".", "#", ".", "#"],
  [".", "#", "#", ".", "#", "#", "."],
];

// console.log(
//   `.##.##.
//   #.#.#.#
//   ##...##
//   ...L...
//   ##...##
//   #.#.#.#
//   .##.##.`
//     .split("\n")
//     .map((row) => row.split(""))
// );

describe("checkDirection", () => {
  test.each([
    ["n", true],
    ["ne", true],
    ["e", true],
    ["se", true],
    ["s", true],
    ["sw", true],
    ["w", true],
    ["nw", true],
  ])(
    "example 1 - %p should return %p",
    (direction: Direction, expectedValue: boolean) => {
      expect(checkDirection(example1, 3, 4, direction)).toBe(expectedValue);
    }
  );

  test.each([
    ["n", false],
    ["ne", false],
    ["e", false],
    ["se", false],
    ["s", false],
    ["sw", false],
    ["w", false],
    ["nw", false],
  ])(
    "example 2 - %p should return %p",
    (direction: Direction, expectedValue: boolean) => {
      expect(checkDirection(example2, 3, 3, direction)).toBe(expectedValue);
    }
  );
});

describe("countVisibleSeats", () => {
  test("example 1", () => {
    expect(countVisibleSeats(example1, 3, 4)).toEqual(8);
  });

  test("example 2", () => {
    expect(countVisibleSeats(example2, 3, 3)).toEqual(0);
  });
});
