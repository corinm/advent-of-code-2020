import { readData } from "./helpers";

type PersonDict = { [key: string]: boolean };

const countQuestionsAnsweredByAnyone = (group: string[]): number => {
  const personDicts = group.map(
    (person: string): PersonDict =>
      person.split("").reduce((acc, cur) => ({ ...acc, [cur]: true }), {})
  );

  const groupDict = personDicts.reduce(
    (acc, cur: PersonDict) => ({ ...acc, ...cur }),
    {}
  );

  return Object.keys(groupDict).length;
};

const solvePart1 = (groups: string[][]): number => {
  return groups
    .map(countQuestionsAnsweredByAnyone)
    .reduce((acc, cur) => acc + cur, 0);
};

const countQuestionsAnsweredByEveryone = (group: string[]): number => {
  const personDicts = group.map(
    (person: string): PersonDict =>
      person.split("").reduce((acc, cur) => ({ ...acc, [cur]: true }), {})
  );

  const questionsAnsweredByEveryone = personDicts.reduce(
    (acc, cur: PersonDict) => acc.filter((key) => cur[key]),
    [...Object.keys(personDicts[0])]
  );

  return questionsAnsweredByEveryone.length;
};

const solvePart2 = (groups: string[][]): number => {
  return groups
    .map(countQuestionsAnsweredByEveryone)
    .reduce((acc, cur) => acc + cur, 0);
};

const main = async () => {
  const data = await readData();
  console.log(solvePart1(data));
  console.log(solvePart2(data));
};

main();
