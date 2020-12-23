import { getNextNumberSpoken, solvePart1, solvePart2 } from "./helpers";

describe("getNextNumberSpoken", () => {
  test.each([
    [1, [0, 3, 6], false, undefined, 0],
    [2, [0, 3, 6], false, undefined, 3],
    [3, [0, 3, 6], false, undefined, 6],
    [4, [0, 3, 6], true, undefined, 0],
    [5, [0, 3, 6], false, 4 - 1, 3],
    [6, [0, 3, 6], false, 5 - 2, 3],
    [7, [0, 3, 6], false, 6 - 5, 1],
    [8, [0, 3, 6], true, undefined, 0],
    [9, [0, 3, 6], false, 8 - 4, 4],
    [10, [0, 3, 6], true, undefined, 0],
  ])(
    "example 1 - turn %p",
    (
      turnNumber,
      startingNumbers,
      lastNumberSpokenOnce,
      differenceInTurnsOfLastNumber,
      numberSpoken
    ) => {
      expect(
        getNextNumberSpoken(
          turnNumber,
          startingNumbers,
          lastNumberSpokenOnce,
          differenceInTurnsOfLastNumber
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
  test.each([[[0, 3, 6], 30000000, 175594]])(
    "example 1 - %p turn %p",
    (startingNumbers, nthTurn, numberSpoken) => {
      expect(solvePart2(startingNumbers, nthTurn)).toEqual(numberSpoken);
    }
  );
});
