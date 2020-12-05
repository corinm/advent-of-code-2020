import { readData } from "./helpers";

const findRow = (code: string): number => {
  let possibleRows = new Array(128).fill(0).map((_, i) => i);

  code.split("").forEach((char) => {
    const indexToSplitOn = possibleRows.length / 2;
    if (char === "F") {
      possibleRows = possibleRows.slice(0, indexToSplitOn);
    } else {
      possibleRows = possibleRows.slice(indexToSplitOn);
    }
  });

  return possibleRows[0];
};

const findColumn = (code: string): number => {
  let possibleColumns = new Array(8).fill(0).map((_, i) => i);

  code.split("").forEach((char) => {
    const indexToSplitOn = possibleColumns.length / 2;
    if (char === "L") {
      possibleColumns = possibleColumns.slice(0, indexToSplitOn);
    } else {
      possibleColumns = possibleColumns.slice(indexToSplitOn);
    }
  });

  return possibleColumns[0];
};

interface Seat {
  row: number;
  column: number;
}

const findSeat = (code: string): Seat => {
  const rowCode = code.slice(0, 7);
  const columnCode = code.slice(7);

  return {
    row: findRow(rowCode),
    column: findColumn(columnCode),
  };
};

const getSeatCode = (seat: Seat): number => seat.row * 8 + seat.column;

const main = async () => {
  const boardingPasses: string[] = await readData();

  const sortedCodes = boardingPasses
    .map(findSeat)
    .map(getSeatCode)
    .sort((a, b) => (a < b ? 1 : -1));

  const presentCodes = sortedCodes.reduce(
    (acc, cur) => ({ ...acc, [cur]: true }),
    {}
  );

  const [highest] = sortedCodes;
  console.log(highest);

  const allCodes = new Array(128 * 8).fill("0").map((_, i) => i);
  const missingCodes = allCodes.filter((code) => !presentCodes[code]);
  const [mySeat] = missingCodes.filter((code) => {
    const seatToLeftTaken = presentCodes[code - 1];
    const seatToRightTaken = presentCodes[code + 1];
    return seatToLeftTaken && seatToRightTaken;
  });

  console.log(mySeat);
};

main();
