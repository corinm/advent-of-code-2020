import { solvePart1, parseLine } from "./helpers";

describe("solvePart1", () => {
  test("example 1", () => {
    const data = ["F10", "N3", "F7", "R90", "F11"].map(parseLine);
    expect(solvePart1(data)).toEqual(25);
  });
});
