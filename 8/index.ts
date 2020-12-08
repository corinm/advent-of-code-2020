import { readData, Instruction } from "./helpers";

const solve = (instructions: Instruction[]): number => {
  let pointer = 0;
  let accumulator = 0;
  let running = true;
  let instructionsRun = {};

  while (running) {
    if (instructionsRun[pointer]) {
      return accumulator;
    }

    const { op, arg } = instructions[pointer];
    instructionsRun[pointer] = true;

    if (op === "nop") {
      pointer++;
    } else if (op === "acc") {
      accumulator += arg;
      pointer++;
    } else if (op === "jmp") {
      pointer += arg;
    }
  }
};

const main = async () => {
  const data = await readData();
  const result = solve(data);
  console.log(result);
};

main();
