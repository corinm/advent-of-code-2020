import { readData } from "../1_1/helpers";

export const solve = (numbers: number[]) => {
  const numSet = new Set(numbers);

  for (const num1 of numbers) {
    for (const num2 of numbers) {
      const num3 = 2020 - (num1 + num2);
      if (num3 > 0 && numSet.has(num3)) {
        return num1 * num2 * num3;
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
