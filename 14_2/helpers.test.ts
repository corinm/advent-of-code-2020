import {
  Command,
  identifyAddresses,
  solvePart2,
  decimalToBinary,
  binaryToDecimal,
  getBillions,
  removeBillions,
} from "./helpers";

describe("identifyAddresses", () => {
  test.each([
    ["000000000000000000000000000000X1001X", 42, [26, 27, 58, 59]],
    [
      "00000000000000000000000000000000X0XX",
      26,
      [16, 17, 18, 19, 24, 25, 26, 27],
    ],
    ["00000000000000000000000000000010X10X", 7, [38, 39, 46, 47]],
    ["000000000000000000000000000000000XXX", 8, [8, 9, 10, 11, 12, 13, 14, 15]],
    [
      "XX0000000000000000000000000000000000",
      0,
      [0, 34359738368, 17179869184, 51539607552],
    ],
  ])("examples", (mask, position, results) => {
    expect(identifyAddresses(mask, position)).toHaveLength(results.length);
    results.forEach((r) =>
      expect(identifyAddresses(mask, position)).toContain(r)
    );
  });
});

describe("solvePart2", () => {
  test("example 1", () => {
    const commands: Command[] = [
      { type: "mask", mask: "000000000000000000000000000000X1001X" },
      { type: "write", position: 42, value: 100 },
      { type: "mask", mask: "00000000000000000000000000000000X0XX" },
      { type: "write", position: 26, value: 1 },
    ];
    expect(solvePart2(commands)).toEqual(208);
  });

  xtest("example 2", () => {
    const commands: Command[] = [
      { type: "mask", mask: "0XX000X1111001010X10XX1101XX00X00100" },
      { type: "write", position: 50596, value: 1000 },
      { type: "mask", mask: "0X000001111001010X1011100100001X0X0X" },
      { type: "write", position: 45713, value: 1 },
    ];
    expect(solvePart2(commands)).toEqual(508032);
  });

  test("example 3", () => {
    const commands: Command[] = [
      { type: "mask", mask: "000000000000000000000000000000000XXX" },
      { type: "write", position: 8, value: 4 },
      { type: "mask", mask: "XX0000000000000000000000000000000000" },
      { type: "write", position: 0, value: 5 },
    ];
    expect(solvePart2(commands)).toEqual(52);
  });
});
