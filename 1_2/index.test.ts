import { solve } from ".";

describe("1.2", () => {
  test("small test case", () => {
    const numbers = [1, 2, 2010, 3, 4, 6];
    const answer = solve(numbers);
    expect(answer).toEqual(2010 * 4 * 6);
  });
});
