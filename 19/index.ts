import { solvePart1 } from "./helpers";
import readData from "./readData";

const main = async () => {
  const { rules, data } = await readData();
  console.log("Part 1:", solvePart1(rules, data));
};

main();
