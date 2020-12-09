import {
  readData,
  findFirstInvalidNumber,
  findContiguousCombinations,
} from "./helpers";

const solvePart2 = (data: number[], firstInvalidNumber: number): number => {
  const numbersToSearch = data.slice(0, data.indexOf(firstInvalidNumber));
  const targetCombination = findContiguousCombinations(
    numbersToSearch,
    firstInvalidNumber
  );

  const max = Math.max(...targetCombination.numbers);
  const min = Math.min(...targetCombination.numbers);

  return min + max;
};

const main = async () => {
  const data = await readData();

  const firstInvalidNumber = findFirstInvalidNumber(data);
  console.log("Part 1:", firstInvalidNumber);
  console.log("Part 2:", solvePart2(data, firstInvalidNumber));
};

main();
