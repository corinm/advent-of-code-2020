import { readData } from "./helpers";

const solvePart1 = (adapters: number[]): number => {
  const intervals = { "0": 0, "1": 0, "2": 0, "3": 1 }; // Extra 3 for final adapter in device
  let current = 0;

  adapters
    .sort((a, b) => a - b)
    .forEach((adapter) => {
      const diff = adapter - current;
      intervals[diff]++;
      current = adapter;
    });

  return intervals["1"] * intervals["3"];
};

const findMinimumAdapters = (adapters: number[], target: number): number => {
  const adaptersSet = new Set(adapters);

  let jolts = 0;
  let adaptersUsed = 0;
  while (jolts < target) {
    if (adaptersSet.has(jolts + 3)) {
      jolts += 3;
    } else if (adaptersSet.has(jolts + 2)) {
      jolts += 2;
    } else if (adaptersSet.has(jolts + 1)) {
      jolts += 1;
    }

    adaptersUsed++;
  }

  return adaptersUsed;
};

const combinations = (n: number): number => 2 ** n;

const solvePart2 = (adapters: number[]): number => {
  const start = 0;
  const sorted = adapters.sort((a, b) => a - b);
  const target = sorted[adapters.length - 1];

  const min = findMinimumAdapters(sorted, target);
  const missingAdapters = adapters.length - min;

  return combinations(missingAdapters);
};

const testData = [1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19];

const main = async () => {
  const data = await readData();
  console.log("Part 1:", solvePart1(data));
  console.log("Part 2:", solvePart2(testData));
};

main();
