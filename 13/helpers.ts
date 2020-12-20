import * as fs from "fs";

export interface BusData {
  startingTime: number;
  buses: number[];
}

export const readDataPart1 = async (): Promise<BusData> => {
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

export const readDataPart2 = async (): Promise<number[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    const lines = data.split("\n");
    return lines[1].split(",").map((id) => (id === "x" ? null : parseInt(id)));
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

export const solvePart2 = (
  buses: number[],
  minimumTimestamp?: number
): number => {
  let iteration = minimumTimestamp
    ? Math.floor(minimumTimestamp / buses[0])
    : 1;
  let found = false;

  while (!found) {
    const startingTimestamp = buses[0] * iteration;
    // console.log({ iteration, startingTimestamp });

    const isAMatch =
      buses
        .map((bus, i) =>
          bus === null ? true : (startingTimestamp + i) % bus === 0
        )
        .filter((leavesAtThisTime) => !leavesAtThisTime).length === 0;

    if (isAMatch) {
      found = true;
      return startingTimestamp;
    } else {
      iteration++;
    }
  }
};
