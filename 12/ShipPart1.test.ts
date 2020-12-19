import { parseLine } from "./helpers";
import Ship from "./ShipPart1";

describe("navigation", () => {
  test.each([
    [["N2"], 0, -2],
    [["N2", "R90"], 0, -2],
    [["N2", "R90", "S2"], 0, 0],
    [["N2", "R90", "S2", "F40"], 0, 40],
    [["N2", "R90", "S2", "F40", "R180"], 0, 40],
    [["N2", "R90", "S2", "F40", "R180", "F50"], 0, -10],
    [["N1", "E2", "S3", "W4", "R90", "F5", "L360", "F6"], -2, 13],
  ])("1", (instructions, x, y) => {
    const ship = new Ship();
    ship.navigate(instructions.map(parseLine));
    expect(ship.getPosition()).toEqual({ x, y });
  });
});
