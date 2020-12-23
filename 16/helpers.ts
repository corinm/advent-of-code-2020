import { Positions, Rule, Ticket } from "./types";

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

export const isValid = (rules: Rule[], ticket: Ticket): boolean => {
  const invalidValues = getInvalidValues(rules, ticket);
  return invalidValues.length === 0;
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

export const identifyPositions = (
  rules: Rule[],
  tickets: Ticket[]
): Positions => {
  const numberOfFields = rules.length;
  const valuesByField = new Array(numberOfFields)
    .fill(0)
    .map((_, i) => tickets.map((ticket, j) => ticket[i]));

  const possibleValidFieldsByField = valuesByField.map(
    (fieldValues) =>
      new Set(
        rules
          .map((rule) => {
            const allValid =
              fieldValues.map((v) => validate(rule, v)).filter((v) => !v)
                .length === 0;
            return allValid ? rule.name : null;
          })
          .filter((v) => v !== null)
      )
  );

  const result = {};

  possibleValidFieldsByField
    .map((v, i) => ({ set: v, index: i }))
    .sort((a, b) => a.set.size - b.set.size)
    .forEach((field) => {
      if (field.set.size === 1) {
        const fieldName = field.set.values().next().value;
        result[fieldName] = field.index + 1;
        possibleValidFieldsByField.map((s) => s.delete(fieldName));
      }
    });

  return result;
};

export const solvePart2 = (
  rules: Rule[],
  tickets: Ticket[],
  myTicket: Ticket
): number => {
  const validTickets = tickets.filter((ticket) => isValid(rules, ticket));
  const positions = identifyPositions(rules, validTickets);

  const departures = Object.entries(positions).filter(([key]) =>
    /^departure/.test(key)
  );

  return departures
    .map(([_, v]) => v)
    .map((position) => myTicket[position - 1])
    .reduce((acc, cur) => acc * cur, 1);
};
