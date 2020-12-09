import {
  readData,
  Instruction,
  runsToInfiniteLoop,
  solvePart1,
} from "./helpers";

const findInstructionThatIsCorrupted = (
  instructions: Instruction[]
): string => {
  let pointer = 0;
  let accumulator = 0;
  let running = true;
  let instructionsRun = new Set();
  let instructionsRunInOrder: number[] = [];

  while (running) {
    if (instructionsRun.has(pointer)) {
      console.log("Infinite loop detected at:", pointer);

      const instructionsInReverse = [...instructionsRunInOrder].reverse();

      let corruptedInstruction: string | undefined = undefined;

      for (const instruction in instructionsInReverse) {
        const tempInstructions = instructions.map((inst) => ({ ...inst }));

        if (tempInstructions[instruction].op === "nop") {
          tempInstructions[instruction].op = "jmp";
          if (!runsToInfiniteLoop(tempInstructions)) {
            corruptedInstruction = instruction;
            break;
          }
        }
        if (tempInstructions[instruction].op === "jmp") {
          tempInstructions[instruction].op = "nop";
          if (!runsToInfiniteLoop(tempInstructions)) {
            corruptedInstruction = instruction;
            break;
          }
        }
      }

      return corruptedInstruction;
    }

    const { op, arg } = instructions[pointer];
    instructionsRun.add(pointer);
    instructionsRunInOrder.push(pointer);

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

const solvePart2 = (instructions: Instruction[]) => {
  const corruptedInstruction = findInstructionThatIsCorrupted(instructions);
  const correctedInstructions = instructions.map(
    (inst, i): Instruction =>
      i.toString() === corruptedInstruction
        ? { op: inst.op === "jmp" ? "nop" : "jmp", arg: inst.arg }
        : { ...inst }
  );
  const correctedAnswer = solvePart1(correctedInstructions);
  return correctedAnswer;
};

const main = async () => {
  const data = await readData();
  console.log("Part 1:", solvePart1(data));
  console.log("Part 2:", solvePart2(data));
};

main();
