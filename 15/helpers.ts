interface PreviousTurns {
  last: number;
  prev: number;
}

export const getNextNumberSpoken = (
  turnNumber: number,
  startingNumbers: number[],
  lastNumberSpoken: number,
  timesSpoken: { [key: string]: number },
  turnNumbersLastSpoken: { [key: string]: PreviousTurns }
): number => {
  if (turnNumber <= startingNumbers.length) {
    return startingNumbers[turnNumber - 1];
  }

  if (timesSpoken[lastNumberSpoken] === 1) {
    return 0;
  } else {
    return (
      turnNumbersLastSpoken[lastNumberSpoken].last -
      turnNumbersLastSpoken[lastNumberSpoken].prev
    );
  }
};

export const solvePart1 = (
  startingNumbers: number[],
  nthTurn: number
): number => {
  let turnNumber = 1;
  let numberSpoken = null;
  let lastNumberSpoken = null;
  const timesSpoken = {};
  const turnNumbersLastSpoken: { [key: string]: PreviousTurns } = {};

  while (turnNumber <= nthTurn) {
    numberSpoken = getNextNumberSpoken(
      turnNumber,
      startingNumbers,
      lastNumberSpoken,
      timesSpoken,
      turnNumbersLastSpoken
    );

    lastNumberSpoken = numberSpoken;
    timesSpoken[numberSpoken] = timesSpoken[numberSpoken]
      ? timesSpoken[numberSpoken] + 1
      : 1;

    if (!turnNumbersLastSpoken[numberSpoken]) {
      turnNumbersLastSpoken[numberSpoken] = { prev: null, last: turnNumber };
    }

    turnNumbersLastSpoken[numberSpoken].prev =
      turnNumbersLastSpoken[numberSpoken].last;
    turnNumbersLastSpoken[numberSpoken].last = turnNumber;

    turnNumber++;
  }

  return numberSpoken;
};
