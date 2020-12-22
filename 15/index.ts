import { solvePart1 } from "./helpers";

const main = async () => {
  const t1 = Date.now();
  console.log("Part 1:", solvePart1([0, 14, 6, 20, 1, 4], 2020));
  const t2 = Date.now();
  console.log("Part 2:", solvePart1([0, 14, 6, 20, 1, 4], 5_000_000));
  console.log(`${(Date.now() - t2) / 1000}s`);
};

main();
