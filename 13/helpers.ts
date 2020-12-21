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

interface BusAndOffset {
  busId: number;
  offset: number;
}

export const readDataPart2 = async (): Promise<BusAndOffset[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    const lines = data.split("\n");
    const buses = lines[1]
      .split(",")
      .map((id) => (id === "x" ? null : parseInt(id)));

    return parseBuses(buses);
  } catch (e) {
    console.error(e);
  }
};

export const parseBuses = (buses: number[]): BusAndOffset[] => {
  const busesWithOffsets: BusAndOffset[] = [];

  let offset = 0;
  let offsetOffset = 0;
  buses.forEach((bus) => {
    if (bus) {
      busesWithOffsets.push({ busId: bus, offset: offset + offsetOffset });
      offsetOffset++;
    } else {
      offset++;
    }
  });

  return busesWithOffsets;
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

  const timeToWait = targetTime - startingTime;

  return busId * timeToWait;
};

export const solvePart2 = (
  buses: BusAndOffset[],
  minimumTimestamp?: number
): number => {
  let iteration = minimumTimestamp
    ? Math.floor(minimumTimestamp / buses[0].busId)
    : 1;

  let solved = false;

  while (!solved) {
    solved =
      buses
        .map(({ busId, offset }) => (busId * iteration + offset) % busId === 0)
        .filter((x) => x === false).length === 0;
    iteration++;
  }

  return iteration;
};
