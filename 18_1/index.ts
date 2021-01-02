import { readData, solvePart1 } from "./helpers";

const main = async () => {
  const expressions = await readData();
  console.log("Part 1:", solvePart1(expressions));
};

main();
