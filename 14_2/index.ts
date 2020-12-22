import { readData, parseLines } from "../14_1/helpers";
import { solvePart2 } from "./helpers";

const main = async () => {
  const lines = await readData();
  const commands = parseLines(lines);

  console.log("Part 2:", solvePart2(commands));
};

main();
