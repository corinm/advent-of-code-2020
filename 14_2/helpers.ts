const padWithZeroes = (str: string): string => {
  const zeroesNeeded = 36 - str.length;
  return new Array(zeroesNeeded).fill("0").join("") + str;
};
export const decimalToBinary = (num: number): string =>
  padWithZeroes((num >>> 0).toString(2));

export const binaryToDecimal = (str: string): number => parseInt(str, 2);

export const identifyAddresses = (mask: string, position: number): number[] => {
  const addressAsBinary = decimalToBinary(position);
  let addresses: string[] = [addressAsBinary];

  mask.split("").forEach((char, i) => {
    if (char === "X") {
      const addressesWith0s = addresses.map(
        (addr) => addr.substr(0, i) + "0" + addr.substr(i + 1)
      );
      const addressesWith1s = addresses.map(
        (addr) => addr.substr(0, i) + "1" + addr.substr(i + 1)
      );
      addresses = [...addressesWith0s, ...addressesWith1s];
    } else if (char === "1") {
      addresses = addresses.map(
        (addr) => addr.substr(0, i) + "1" + addr.substr(i + 1)
      );
    }
  });

  return addresses.map(binaryToDecimal);
};

interface MaskCommand {
  type: "mask";
  mask: string;
}

export interface WriteCommand {
  type: "write";
  position: number;
  value: number;
}

export type Command = MaskCommand | WriteCommand;

type Memory = { [key: string]: number };

export const solvePart2 = (commands: Command[]): number => {
  const memory: Memory = {};
  let currentMask;

  commands.forEach((command) => {
    if (command.type === "mask") {
      currentMask = command.mask;
    } else if (command.type === "write") {
      identifyAddresses(currentMask, command.position).forEach((pos) => {
        memory[pos] = command.value;
      });
    }
  });

  const answer = Object.values(memory).reduce(
    (acc: number, cur: number, i) => acc + cur,
    0
  );

  return answer;
};
