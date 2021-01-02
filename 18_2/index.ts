import { readData } from "../18_1/helpers";
import { solvePart2 } from "./helpers";

const main = async () => {
  const expressions = await readData();
  console.log("Part 2:", solvePart2(expressions));
};

main();
