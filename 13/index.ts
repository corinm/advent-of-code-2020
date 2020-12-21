import {
  readDataPart1,
  readDataPart2,
  solvePart1,
  solvePart2,
} from "./helpers";

const main = async () => {
  const data1 = await readDataPart1();
  console.log("Part 1:", solvePart1(data1));

  const data2 = await readDataPart2();
  console.log(data2);
  console.log("Part 2:", solvePart2(data2, 100000000000000));
};

main();
