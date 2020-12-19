import { solvePart1, BusData } from "./helpers";

describe("solvePart1", () => {
  test("example", () => {
    const data: BusData = {
      startingTime: 939,
      buses: [7, 13, 59, 31, 19],
    };

    expect(solvePart1(data)).toEqual(295);
  });
});
