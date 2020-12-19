import { parseLine } from "./helpers";
import Ship from "./ShipPart2";

describe("navigation", () => {
  test.each([
    [["F10"], 100, -10, 10, -1],
    [["F10", "N3"], 100, -10, 10, -4],
    [["F10", "N3", "F7"], 170, -38, 10, -4],
    [["F10", "N3", "F7", "R90"], 170, -38, 4, 10],
    [["F10", "N3", "F7", "R90", "F11"], 214, 72, 4, 10],
  ])("1", (instructions, x, y, wX, wY) => {
    const ship = new Ship();
    ship.navigate(instructions.map(parseLine));
    expect(ship.getPosition()).toEqual({ x, y });
    expect(ship.getWaypoint()).toEqual({ x: wX, y: wY });
  });
});
