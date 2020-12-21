import { calculateMaskedValue, parseLines, readData } from "./helpers";

const main = async () => {
  const lines = await readData();
  const instructions = parseLines(lines);
  const memory = [];
  let currentMask;

  instructions.forEach((instruction) => {
    if (instruction.type === "mask") {
      currentMask = instruction.mask;
    } else if (instruction.type === "write") {
      memory[instruction.position] = calculateMaskedValue(
        currentMask,
        instruction.value
      );
    }
  });

  const answer = memory
    .filter((v) => v)
    .reduce((acc: number, cur: number) => acc + cur, 0);

  console.log("Part 1:", answer);
};

main();
