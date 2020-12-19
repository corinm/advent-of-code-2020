import { readData, solvePart1, solvePart2 } from "./helpers";

const main = async () => {
  const data = await readData();
  console.log("Part 1", solvePart1(data));
  console.log("Part 2", solvePart2(data));
};

main();
