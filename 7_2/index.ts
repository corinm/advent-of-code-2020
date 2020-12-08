import { readData, createRules, Rules } from "./helpers";

const countBagsWithin = (rules: Rules, bag: string): number => {
  const children = rules[bag];

  return children.reduce((acc, cur) => {
    return acc + cur.count + countBagsWithin(rules, cur.colour) * cur.count;
  }, 0);
};

const solve = (rules: Rules): number => {
  const result = countBagsWithin(rules, "shiny gold");
  return result;
};

const main = async () => {
  const data = await readData();
  const rules = createRules(data);
  const result = solve(rules);
  console.log(result);
};

main();
