import { getNextNumberSpoken, solvePart1, solvePart2 } from "./helpers";

describe("getNextNumberSpoken", () => {
  test.each([
    [1, [0, 3, 6], null, {}, {}, 0],
    [2, [0, 3, 6], null, {}, {}, 3],
    [3, [0, 3, 6], null, {}, {}, 6],
    [4, [0, 3, 6], 6, { 0: true, 3: true, 6: true }, {}, 0],
    [5, [0, 3, 6], 0, { 3: true, 6: true }, { 0: { last: 4, prev: 1 } }, 3],
    [6, [0, 3, 6], 3, { 3: false, 6: true }, { 3: { last: 5, prev: 2 } }, 3],
    [7, [0, 3, 6], 3, { 3: false, 6: true }, { 3: { last: 6, prev: 5 } }, 1],
    [8, [0, 3, 6], 1, { 1: true, 6: true }, {}, 0],
    [9, [0, 3, 6], 0, { 1: true, 6: true }, { 0: { last: 8, prev: 4 } }, 4],
    [10, [0, 3, 6], 4, { 1: true, 4: true, 6: true }, {}, 0],
  ])(
    "example 1 - turn %p",
    (
      turnNumber,
      startingNumbers,
      lastNumberSpoken,
      timesSpoken,
      turnNumbersLastSpoken,
      numberSpoken
    ) => {
      expect(
        getNextNumberSpoken(
          turnNumber,
          startingNumbers,
          lastNumberSpoken,
          timesSpoken,
          turnNumbersLastSpoken
        )
      ).toEqual(numberSpoken);
    }
  );
});

describe("solvePart1", () => {
  test.each([
    [[0, 3, 6], 1, 0],
    [[0, 3, 6], 4, 0],
    [[0, 3, 6], 9, 4],
    [[0, 3, 6], 2020, 436],
    [[1, 3, 2], 2020, 1],
    [[2, 1, 3], 2020, 10],
    [[1, 2, 3], 2020, 27],
    [[2, 3, 1], 2020, 78],
    [[3, 2, 1], 2020, 438],
    [[3, 1, 2], 2020, 1836],
  ])("example 1 - %p turn %p", (startingNumbers, nthTurn, numberSpoken) => {
    expect(solvePart1(startingNumbers, nthTurn)).toEqual(numberSpoken);
  });
});

describe("solvePart2", () => {
  xtest.each([[[0, 3, 6], 30000000, 175594]])(
    "example 1 - %p turn %p",
    (startingNumbers, nthTurn, numberSpoken) => {
      expect(solvePart2(startingNumbers, nthTurn)).toEqual(numberSpoken);
    }
  );
});
