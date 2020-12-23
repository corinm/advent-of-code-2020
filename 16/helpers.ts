import { Rule, Ticket } from "./types";

export const getInvalidValues = (rules: Rule[], ticket: Ticket): number[] => {
  const validityByField = ticket
    .map((field) => rules.map((rule) => validate(rule, field)))
    .map(
      (rulesPassedByField) =>
        rulesPassedByField.filter((isValid) => isValid).length > 0
    );

  return validityByField
    .map((isValid, i) => (!isValid ? ticket[i] : null))
    .filter((v) => v);
};

const validate = (rule: Rule, field: number): boolean =>
  isBetweenInclusive(field, rule.min1, rule.max1) ||
  isBetweenInclusive(field, rule.min2, rule.max2);

const isBetweenInclusive = (num: number, min: number, max: number): boolean =>
  num >= min && num <= max;

export const solvePart1 = (rules: Rule[], tickets: Ticket[]): number => {
  return tickets
    .map((ticket) => getInvalidValues(rules, ticket))
    .reduce((acc, cur) => [...acc, ...cur], [])
    .reduce((acc, cur) => acc + cur, 0);
};
