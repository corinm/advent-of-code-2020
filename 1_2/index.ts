import { readData } from "../1_1/helpers";

export const solve = (numbers: number[]) => {
  for (const num1 of numbers) {
    for (const num2 of numbers) {
      for (const num3 of numbers) {
        if (num1 + num2 + num3 === 2020) {
          return num1 * num2 * num3;
        }
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
