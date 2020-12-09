import * as fs from "fs";

export const readData = async (): Promise<number[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data.split("\n").map((line) => parseInt(line));
  } catch (e) {
    console.error(e);
  }
};

const preamble = 25;

const isValid = (numbers: number[], numberToCheck: number): boolean => {
  const allPossibleSums = numbers
    .map((num1) => numbers.map((num2) => num1 + num2))
    .reduce((acc, cur) => [...acc, ...cur], []);
  return allPossibleSums.includes(numberToCheck);
};

export const findFirstInvalidNumber = (
  numbers: number[]
): number | undefined => {
  for (let i = preamble; i < numbers.length; i++) {
    const previous25Numbers = numbers.slice(i - preamble, i);
    if (!isValid(previous25Numbers, numbers[i])) {
      return numbers[i];
    }
  }

  return undefined;
};

interface Combination {
  numbers: number[];
  sum: number;
}
const count = (numbers: number[]): number =>
  numbers.reduce((acc, cur) => acc + cur, 0);

export const findAllContiguousCombinations = (
  numbers: number[]
): Combination[] => {
  const combinations: Combination[] = [];

  for (
    let sizeOfCombination = 2;
    sizeOfCombination < numbers.length;
    sizeOfCombination++
  ) {
    const numberOfCombinations = numbers.length - sizeOfCombination + 1;
    for (let i = 0; i < numberOfCombinations; i++) {
      const numbersInCurrentCombination = numbers.slice(
        i,
        i + sizeOfCombination
      );
      combinations.push({
        numbers: numbersInCurrentCombination,
        sum: count(numbersInCurrentCombination),
      });
    }
  }

  return combinations;
};
