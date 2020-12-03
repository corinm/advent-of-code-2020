import { readData } from "./helpers";

export type TreeMap = boolean[][];

const solve = (treeMap: TreeMap, right: number, down: number) => {
  const height = treeMap.length;
  const width = treeMap[0].length;
  let currentX = 0;
  let currentY = 0;
  let trees = 0;

  while (currentY < height) {
    if (treeMap[currentY][currentX]) {
      trees++;
    }
    currentX += right;
    currentY += down;

    if (currentX >= width) {
      currentX -= width;
    }
  }

  return trees;
};

const main = async () => {
  const data = await readData();
  const result = solve(data, 3, 1);
  console.log(result);

  const r1 = solve(data, 1, 1);
  const r2 = solve(data, 3, 1);
  const r3 = solve(data, 5, 1);
  const r4 = solve(data, 7, 1);
  const r5 = solve(data, 1, 2);

  console.log(r1 * r2 * r3 * r4 * r5);
};

main();
