import { parseLines, readData, solvePart1 } from "./helpers";

const main = async () => {
  const lines = await readData();
  const commands = parseLines(lines);

  console.log("Part 1:", solvePart1(commands));
};

main();
