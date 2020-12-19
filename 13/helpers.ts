import * as fs from "fs";

export interface BusData {
  startingTime: number;
  buses: number[];
}

export const readData = async (): Promise<BusData> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    const lines = data.split("\n");
    return {
      startingTime: parseInt(lines[0]),
      buses: lines[1]
        .split(",")
        .filter((bus) => bus !== "x")
        .map((id) => parseInt(id)),
    };
  } catch (e) {
    console.error(e);
  }
};

export const solvePart1 = (data: BusData): number => {
  const { startingTime, buses } = data;

  let targetTime = startingTime;
  let busId: number;

  while (busId === undefined) {
    for (const bus of buses) {
      if (targetTime % bus === 0) {
        busId = bus;
        break;
      }
    }
    if (busId === undefined) {
      targetTime++;
    }
  }

  console.log({ startingTime, busId, targetTime });

  const timeToWait = targetTime - startingTime;

  return busId * timeToWait;
};
