import { calculate } from "./helpers";

describe("calculate", () => {
  test.each([
    ["1 + 2", 3],
    ["1 * 2", 2],
    ["1 + 2 * 3 + 4 * 5 + 6", 231],
  ])("example 1 - %p => %p", (expression, result) => {
    expect(calculate(expression)).toEqual(result);
  });

  test.each([
    ["1 + (2 * 3)", 7],
    ["1 + (2 * 3) + 1", 8],
    ["1 + (2 * 3) + (4 * (5 + 6))", 51],
    ["1 + 6 + (4 * (5 + 6))", 51],
    ["1 + 6 + (4 * 11)", 51],
  ])("example 2 - %p => %p", (expression, result) => {
    expect(calculate(expression)).toEqual(result);
  });

  test.each([
    ["2 * 3 + (4 * 5)", 46],
    ["5 + (8 * 3 + 9 + 3 * 4 * 3)", 1445],
    ["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 669060],
    ["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 23340],
  ])("other examples - %p => %p", (expression, result) => {
    expect(calculate(expression)).toEqual(result);
  });
});
