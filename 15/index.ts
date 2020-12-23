import { solvePart1 } from "./helpers";

const main = async () => {
  const t1 = Date.now();
  console.log("Part 1:", solvePart1([0, 14, 6, 20, 1, 4], 2020));
  console.log("Part 2:", solvePart1([0, 14, 6, 20, 1, 4], 30_000_000));
  console.log(Date.now() - t1);
};

main();
