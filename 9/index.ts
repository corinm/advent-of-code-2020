import { readData } from "./helpers";

const preamble = 25;

const isValid = (numbers: number[], numberToCheck: number): boolean => {
  const allPossibleSums = numbers
    .map((num1) => numbers.map((num2) => num1 + num2))
    .reduce((acc, cur) => [...acc, ...cur], []);
  return allPossibleSums.includes(numberToCheck);
};

const findFirstInvalidNumber = (numbers: number[]): number | undefined => {
  for (let i = preamble; i < numbers.length; i++) {
    const previous25Numbers = numbers.slice(i - preamble, i);
    if (!isValid(previous25Numbers, numbers[i])) {
      return numbers[i];
    }
  }

  return undefined;
};

const main = async () => {
  const data = await readData();
  console.log(findFirstInvalidNumber(data));
};

main();
