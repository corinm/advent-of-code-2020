import { solve } from ".";

describe("1.1", () => {
  test("small test case", () => {
    const numbers = [1, 2, 2018, 3];
    const answer = solve(numbers);
    expect(answer).toEqual(2018 * 2);
  });
});
