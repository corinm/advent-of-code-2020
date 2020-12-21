import { solvePart1, BusData, solvePart2, parseBuses } from "./helpers";

describe("solvePart1", () => {
  test("example", () => {
    const data: BusData = {
      startingTime: 939,
      buses: [7, 13, 59, 31, 19],
    };

    expect(solvePart1(data)).toEqual(295);
  });
});

describe("solvePart2", () => {
  test.each([
    [[7, 13, null, null, 59, null, 31, 19], 1068781, undefined],
    [[17, null, 13, 19], 3417, undefined],
    [[67, 7, 59, 61], 754018, undefined],
    [[67, null, 7, 59, 61], 779210, undefined],
    [[67, 7, null, 59, 61], 1261476, undefined],
    [[1789, 37, 47, 1889], 1202161486, undefined],
    [[7, 13, null, null, 59, null, 31, 19], 1068781, 1000000],
    [[17, null, 13, 19], 3417, 3000],
    [[67, 7, 59, 61], 754018, 700000],
    [[67, null, 7, 59, 61], 779210, 700000],
    [[67, 7, null, 59, 61], 1261476, 1000000],
    [[1789, 37, 47, 1889], 1202161486, 1000000000],
  ])("example", (buses, answer, minimumTimestamp) => {
    expect(solvePart2(buses, minimumTimestamp)).toEqual(answer);
  });
});

describe("parseBuses", () => {
  test("example", () => {
    const buses = [
      29,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      41,
      null,
      null,
      null,
      37,
      null,
      null,
      null,
      null,
      null,
      653,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      13,
      null,
      null,
      null,
      17,
      null,
      null,
      null,
      null,
      null,
      23,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      823,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      19,
    ];

    expect(parseBuses(buses)).toEqual([
      { bus: 29, offset: 0 },
      { bus: 41, offset: 19 },
      { bus: 37, offset: 23 },
      { bus: 653, offset: 29 },
      { bus: 13, offset: 42 },
      { bus: 17, offset: 46 },
      { bus: 23, offset: 52 },
      { bus: 823, offset: 60 },
      { bus: 19, offset: 79 },
    ]);
  });
});
