import { readData } from "./helpers";

export const solve = (numbers: number[]) => {
  for (const num1 of numbers) {
    for (const num2 of numbers) {
      if (num1 + num2 === 2020) {
        return num1 * num2;
      }
    }
  }
};

const main = async () => {
  const numbers = await readData();
  const result = solve(numbers);
  console.log(result);
};

main();
