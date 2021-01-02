import * as fs from "fs";

export const calculate = (expression: string): number => {
  if (!containsBrackets(expression) && !containsOperators(expression)) {
    return parseInt(expression);
  }

  if (!containsBrackets(expression)) {
    const [firstPart] = expression.match(/\d+ [\+\*] \d+/);
    const [a, operator, b] = firstPart.split(" ");

    const newExpression = expression.replace(
      /\d+ [\+\*] \d+/,
      calculatePart(a, operator, b)
    );

    return calculate(newExpression);
  }

  // Contains brackets
  return calculate(removeBrackets(expression));
};

export const calculatePart = (
  a: string,
  operator: string,
  b: string
): string => {
  const result =
    operator === "+" ? parseInt(a) + parseInt(b) : parseInt(a) * parseInt(b);
  return result.toString();
};

export const containsOperators = (expression: string): boolean =>
  /[\*\+]/.test(expression);

export const containsBrackets = (expression: string): boolean =>
  /\(.*\)/.test(expression);

export const removeBrackets = (expression: string): string => {
  let tempExpression = expression;

  while (containsBrackets(tempExpression)) {
    const [withBrackets, innerExpression] = tempExpression.match(
      /\(([()]{0}[\d +*]+)\)/
    );
    const solution = calculate(innerExpression);
    tempExpression = tempExpression.replace(withBrackets, solution.toString());
  }

  return tempExpression;
};

export const readData = async (): Promise<string[]> => {
  try {
    const data = await fs.promises.readFile(`${__dirname}/data.txt`, {
      encoding: "utf-8",
    });
    return data.split("\n");
  } catch (e) {
    console.error(e);
  }
};

export const solvePart1 = (expressions: string[]): number => {
  return expressions.map(calculate).reduce((acc, cur) => acc + cur);
};
