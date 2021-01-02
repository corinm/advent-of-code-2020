import {
  calculate,
  calculatePart,
  containsOperators,
  removeBrackets,
} from "./helpers";

describe("calculate", () => {
  test.each([
    ["1 + 2", 3],
    ["1 * 2", 2],
    ["1 + 2 * 3 + 4 * 5 + 6", 71],
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
    ["2 * 3 + (4 * 5)", 26],
    ["5 + (8 * 3 + 9 + 3 * 4 * 3)", 437],
    ["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 12240],
    ["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 13632],
  ])("other examples - %p => %p", (expression, result) => {
    expect(calculate(expression)).toEqual(result);
  });
});

describe("calculatePart", () => {
  test.each([
    ["1", "+", "2", "3"],
    ["1", "*", "2", "2"],
    ["3", "+", "3", "6"],
    ["3", "*", "3", "9"],
    ["13", "*", "5", "65"],
  ])("examples  - %p %p %p => %p", (a, operator, b, result) => {
    expect(calculatePart(a, operator, b)).toEqual(result);
  });
});

describe("containsOperators", () => {
  test.each([
    ["1 + 2", true],
    ["1 * 2", true],
    ["1", false],
  ])("examples - %p => %p", (expression, result) => {
    expect(containsOperators(expression)).toEqual(result);
  });
});

describe("removeBrackets", () => {
  test.each([
    ["1 + (2 * 3) + (4 * (5 + 6))", "1 + 6 + 44"],
    ["1 + (4 * (5 + 6))", "1 + 44"],
  ])("examples - %p => %p AND %p", (expression, newExpression) => {
    expect(removeBrackets(expression)).toEqual(newExpression);
  });
});
