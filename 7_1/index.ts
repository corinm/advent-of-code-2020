import { flipLogic, FlippedRules, readData, Rule, RulesDict } from "./helpers";

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

const countBagsWithin = (rulesDict: RulesDict, bag: string): number => {
  const childBags = rulesDict[bag];

  if (!childBags) {
    return 0;
  } else {
    const childBagsOfChildren = childBags
      .map((childBag: string) => countBagsWithin(rulesDict, childBag))
      .reduce((acc, cur) => acc + cur, 0);

    console.log(childBagsOfChildren);

    return childBags.length + childBagsOfChildren;
  }
};

const solvePart1 = (bagsToParents: FlippedRules): number => {
  const parents = findParents(bagsToParents, "shiny gold");
  return new Set(parents).size;
};

const solvePart2 = (bagsToParents: RulesDict): number => {
  const result = countBagsWithin(bagsToParents, "shiny gold");
  return result;
};

const main = async () => {
  const rules: Rule[] = await readData();
  const bagsToParents = flipLogic(rules);
  console.log(solvePart1(bagsToParents));
  console.log(solvePart2(bagsToParents));
};

main();
