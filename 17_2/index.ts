import { generate3dGrid, solvePart2 } from "./helpers";

const main = () => {
  const str =
    "...#..#.\n..##.##.\n..#.....\n....#...\n#.##...#\n####..##\n...##.#.\n#.#.#...";
  const grid = generate3dGrid(str);
  const answer = solvePart2(grid);
  console.log("Part 2:", answer);
};

main();
