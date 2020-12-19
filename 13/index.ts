import { readData, solvePart1 } from "./helpers";

const main = async () => {
  const data = await readData();
  console.log("Part 1", solvePart1(data));
};

main();
