import { calculateMaskedValue, parseLines, WriteCommand } from "./helpers";

describe("parseLines", () => {
  test("example 1", () => {
    const lines: string[] = [
      "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
      "mem[8] = 11",
      "mem[7] = 101",
      "mem[8] = 0",
    ];
    expect(parseLines(lines)).toEqual([
      { type: "mask", mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X" },
      { type: "write", position: 8, value: 11 },
      { type: "write", position: 7, value: 101 },
      { type: "write", position: 8, value: 0 },
    ]);
  });
});

describe("calculateMaskedValue", () => {
  test.each([
    ["XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 11, 73],
    ["XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 101, 101],
    ["XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 0, 64],
  ])("example 1", (mask, value, result) => {
    expect(calculateMaskedValue(mask, value)).toEqual(result);
  });
});
