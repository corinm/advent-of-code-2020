import {
  cycle,
  generate3dGrid,
  getNewState,
  Grid,
  Point,
  solvePart1,
  surroundingCells,
} from "./helpers";

describe("generate3dGrid", () => {
  test("example", () => {
    const initialState = ".#.\n..#\n###";
    expect(generate3dGrid(initialState)).toEqual([
      [
        [false, true, false],
        [false, false, true],
        [true, true, true],
      ],
    ]);
  });
});

describe("surroundingCells", () => {
  test("works", () => {
    const cells = surroundingCells();
    expect(cells).toHaveLength(26);
    expect(cells).toContainEqual({ x: -1, y: -1, z: -1 });
    expect(cells).toContainEqual({ x: 0, y: -1, z: -1 });
    expect(cells).toContainEqual({ x: 1, y: -1, z: -1 });
    expect(cells).toContainEqual({ x: -1, y: 0, z: -1 });
    expect(cells).toContainEqual({ x: 0, y: 0, z: -1 });
    expect(cells).toContainEqual({ x: 1, y: 0, z: -1 });
    expect(cells).toContainEqual({ x: -1, y: 1, z: -1 });
    expect(cells).toContainEqual({ x: 0, y: 1, z: -1 });
    expect(cells).toContainEqual({ x: 1, y: 1, z: -1 });

    expect(cells).toContainEqual({ x: -1, y: -1, z: 0 });
    expect(cells).toContainEqual({ x: 0, y: -1, z: 0 });
    expect(cells).toContainEqual({ x: 1, y: -1, z: 0 });
    expect(cells).toContainEqual({ x: -1, y: 0, z: 0 });
    expect(cells).toContainEqual({ x: 1, y: 0, z: 0 });
    expect(cells).toContainEqual({ x: -1, y: 1, z: 0 });
    expect(cells).toContainEqual({ x: 0, y: 1, z: 0 });
    expect(cells).toContainEqual({ x: 1, y: 1, z: 0 });

    expect(cells).toContainEqual({ x: -1, y: -1, z: 1 });
    expect(cells).toContainEqual({ x: 0, y: -1, z: 1 });
    expect(cells).toContainEqual({ x: 1, y: -1, z: 1 });
    expect(cells).toContainEqual({ x: -1, y: 0, z: 1 });
    expect(cells).toContainEqual({ x: 0, y: 0, z: 1 });
    expect(cells).toContainEqual({ x: 1, y: 0, z: 1 });
    expect(cells).toContainEqual({ x: -1, y: 1, z: 1 });
    expect(cells).toContainEqual({ x: 0, y: 1, z: 1 });
    expect(cells).toContainEqual({ x: 1, y: 1, z: 1 });
  });
});

describe("getNewState", () => {
  const grid: Grid = [
    [
      [false, true, false],
      [false, false, true],
      [true, true, true],
    ],
  ];

  test.each([
    [{ x: 0, y: 0, z: 0 } as Point, false],
    [{ x: 1, y: 0, z: 0 } as Point, false],
    [{ x: 2, y: 0, z: 0 } as Point, false],
    [{ x: 0, y: 1, z: 0 } as Point, true], // changes to true
    [{ x: 1, y: 1, z: 0 } as Point, false],
    [{ x: 2, y: 1, z: 0 } as Point, true], // stays true
    [{ x: 0, y: 2, z: 0 } as Point, false],
    [{ x: 1, y: 2, z: 0 } as Point, true], // stays true
    [{ x: 2, y: 2, z: 0 } as Point, true], // stays true
  ])("example - %p => %p", (cell, result: boolean) => {
    expect(getNewState(cell, grid)).toEqual(result);
  });
});

describe("cycle", () => {
  test("example", () => {
    const grid: Grid = [
      [
        [false, true, false],
        [false, false, true],
        [true, true, true],
      ],
    ];

    const [layerNeg1, layer0, layer1] = cycle(grid);

    expect(layerNeg1).toEqual([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, false, false, true, false],
      [false, false, true, false, false],
    ]);

    expect(layer0).toEqual([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, false, true, false],
      [false, false, true, true, false],
      [false, false, true, false, false],
    ]);

    expect(layer1).toEqual([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, false, false, true, false],
      [false, false, true, false, false],
    ]);
  });
});

describe("solvePart2", () => {
  test("example", () => {
    const initialState = ".#.\n..#\n###";
    const grid = generate3dGrid(initialState);
    expect(solvePart1(grid)).toEqual(112);
  });
});
