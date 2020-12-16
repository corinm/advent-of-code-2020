import { readData, round, isSame, countOccupied } from "./helpers";

const solve = async () => {
  const seats = await readData();

  let before: string[][] = seats;
  let after: string[][] = seats;
  let isFirstRun = true;
  let bothSame = false;

  while (isFirstRun || !bothSame) {
    if (isFirstRun) {
      isFirstRun = false;
    } else {
      before = after.map((row) => row.map((cell) => cell));
    }

    after = round(before);
    bothSame = isSame(before, after);
  }

  console.log("Part 1:", countOccupied(after));
};

solve();
