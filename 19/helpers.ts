export const getCombinations = (rules: Rules): string => {
  return `^${recurse("", rules, 0)}$`;
};

const recurse = (expression: string, rules: Rules, index: number): string => {
  const rule = rules[index];

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
    const inner1 = recurse(expression, rules, rule.rules1[0]);
    const inner2 = recurse(expression, rules, rule.rules1[1]);
    const inner3 = recurse(expression, rules, rule.rules2[0]);
    const inner4 = recurse(expression, rules, rule.rules2[1]);

    return `(?:(?:${inner1}${inner2})|(?:${inner3}${inner4}))`;
  }
};
