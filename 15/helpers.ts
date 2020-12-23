export const getNextNumberSpoken = (
  turnNumber: number,
  startingNumbers: number[],
  lastNumberSpokenOnce: boolean,
  differenceInTurnsOfLastNumber: number
): number => {
  if (turnNumber <= startingNumbers.length) {
    return startingNumbers[turnNumber - 1];
  }

  if (lastNumberSpokenOnce) {
    return 0;
  } else {
    return differenceInTurnsOfLastNumber;
  }
};

export const solvePart1 = (
  startingNumbers: number[],
  nthTurn: number
): number => {
  let turnNumber = 1;
  let numberSpoken = null;
  let lastNumberSpoken = null;
  const timesSpoken = new Map();
  const turnLastSpoken = new Map();
  const turnPreviousSpoken = new Map();

  while (turnNumber <= nthTurn) {
    const lastNumberSpokenOnce = timesSpoken.get(lastNumberSpoken);
    const differenceInTurnsOfLastNumber =
      turnLastSpoken.get(lastNumberSpoken) -
      turnPreviousSpoken.get(lastNumberSpoken);

    numberSpoken = getNextNumberSpoken(
      turnNumber,
      startingNumbers,
      lastNumberSpokenOnce,
      differenceInTurnsOfLastNumber
    );

    lastNumberSpoken = numberSpoken;

    if (timesSpoken.get(numberSpoken) === undefined) {
      timesSpoken.set(numberSpoken, true);
    } else if (timesSpoken.get(numberSpoken) === true) {
      timesSpoken.set(numberSpoken, false);
    }

    turnPreviousSpoken.set(numberSpoken, turnLastSpoken.get(lastNumberSpoken));
    turnLastSpoken.set(numberSpoken, turnNumber);

    turnNumber++;
  }

  return numberSpoken;
};

export const solvePart2 = solvePart1;
