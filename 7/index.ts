import { flipLogic, FlippedRules, readData, Rule } from "./helpers";

const findParents = (bagsToParents: FlippedRules, bag: string): string[] => {
  const parents = bagsToParents[bag];

  if (!parents) {
    return [];
  } else {
    const parentsOfParents = parents
      .map((parentBag) => findParents(bagsToParents, parentBag))
      .reduce((acc, cur) => [...acc, ...cur], []);
    return [...parents, ...parentsOfParents];
  }
};

const solve = (bagsToParents: FlippedRules): number => {
  const parents = findParents(bagsToParents, "shiny gold");
  return new Set(parents).size;
};

const main = async () => {
  const rules: Rule[] = await readData();
  const bagsToParents = flipLogic(rules);
  const result = solve(bagsToParents);
  console.log(result);
};

main();
