export const calculate = (expression: string): number => {
  let tempExpression = expression;

  while (containsBrackets(tempExpression)) {
    tempExpression = removeBrackets(tempExpression);
  }

  while (containsAddition(tempExpression)) {
    tempExpression = removeAddition(tempExpression);
  }

  while (containsMultiplication(tempExpression)) {
    tempExpression = removeMultiplication(tempExpression);
  }

  return parseInt(tempExpression);
};

const containsBrackets = (expression: string): boolean =>
  /\(.*\)/.test(expression);

const containsAddition = (expression: string): boolean => /\+/.test(expression);
const containsMultiplication = (expression: string): boolean =>
  /\*/.test(expression);

const removeBrackets = (expression: string): string => {
  const [withBrackets, innerExpression] = expression.match(
    /\(([()]{0}[\d +*]+)\)/
  );
  const solution = calculate(innerExpression);
  return expression.replace(withBrackets, solution.toString());
};

const add = (expression: string): string => {
  const [a, , b] = expression.split(" ");
  const sum = parseInt(a) + parseInt(b);
  return sum.toString();
};

const multiply = (expression: string): string => {
  const [a, , b] = expression.split(" ");
  const sum = parseInt(a) * parseInt(b);
  return sum.toString();
};

const removeAddition = (expression: string): string => {
  const [innerExpression] = expression.match(/\d+ \+ \d+/);
  return expression.replace(innerExpression, add(innerExpression));
};

const removeMultiplication = (expression: string): string => {
  const [innerExpression] = expression.match(/\d+ \* \d+/);
  return expression.replace(innerExpression, multiply(innerExpression));
};

export const solvePart2 = (expressions: string[]): number => {
  return expressions.map(calculate).reduce((acc, cur) => acc + cur);
};
