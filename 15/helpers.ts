interface PreviousTurns {
  last: number;
  prev: number;
}

type TimesSpoken = { [key: string]: boolean };

export const getNextNumberSpoken = (
  turnNumber: number,
  startingNumbers: number[],
  lastNumberSpoken: number,
  timesSpoken: TimesSpoken,
  turnNumbersLastSpoken: { [key: string]: PreviousTurns }
): number => {
  if (turnNumber <= startingNumbers.length) {
    return startingNumbers[turnNumber - 1];
  }

  if (timesSpoken[lastNumberSpoken]) {
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
  const timesSpoken: TimesSpoken = {};
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

    if (timesSpoken[numberSpoken] === undefined) {
      timesSpoken[numberSpoken] = true;
    } else if (timesSpoken[numberSpoken] === true) {
      timesSpoken[numberSpoken] = false;
    }

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

export const solvePart2 = solvePart1;
