import { Rules } from "./types";

export const getCombinations = (rules: Rules): string => {
  return `^${recurse("", rules, 0)}$`;
};

const recurse = (expression: string, rules: Rules, index: number): string => {
  const rule = rules[index];

  if (!rule) {
    console.error("Rule not found: ", index);
  }

  if (rule.type === "exact") {
    return rule.char;
  }

  if (rule.type === "sub") {
    return rule.rules
      .map((rule) => {
        const inner = recurse(expression, rules, rule);
        return inner.length > 1 ? `(?:${inner})` : inner;
      })
      .reduce((acc, cur) => acc + cur, "");
  }

  if (rule.type === "subor") {
    let part1 = "";
    let part2 = "";

    if (rule.rules1.length === 1) {
      part1 = `${recurse(expression, rules, rule.rules1[0])}`;
    } else {
      const inner1 = recurse(expression, rules, rule.rules1[0]);
      const inner2 = recurse(expression, rules, rule.rules1[1]);
      part1 = `(?:${inner1}${inner2})`;
    }

    if (rule.rules2.length === 1) {
      part2 = `${recurse(expression, rules, rule.rules2[0])}`;
    } else {
      const inner3 = recurse(expression, rules, rule.rules2[0]);
      const inner4 = recurse(expression, rules, rule.rules2[1]);
      part2 = `(?:${inner3}${inner4})`;
    }

    return `(?:${part1}|${part2})`;
  }
};

export const solvePart1 = (rules: Rules, strings: string[]): number => {
  const regex = new RegExp(getCombinations(rules));
  return strings.map((str) => str.match(regex)).filter((v) => v).length;
};
