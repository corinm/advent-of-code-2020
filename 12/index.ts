import { readData, solvePart1 } from "./helpers";
import Ship from "./Ship";

const main = async () => {
  const data = await readData();
  console.log(solvePart1(data));
};

main();
