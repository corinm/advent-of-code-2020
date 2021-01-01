import { generate3dGrid, solvePart1 } from "./helpers";

const main = () => {
  const str =
    "...#..#.\n..##.##.\n..#.....\n....#...\n#.##...#\n####..##\n...##.#.\n#.#.#...";
  const grid = generate3dGrid(str);
  const answer = solvePart1(grid);
  console.log("Part 1:", answer);
};

main();
