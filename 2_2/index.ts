import { readData } from "./helpers";

export interface PasswordRecord {
  char: string;
  min: number;
  max: number;
  password: string;
}

const isPasswordValid = (passwordRecord: PasswordRecord) => {
  const { password, char, min, max } = passwordRecord;

  const p1Matches = password[min - 1] === char;
  const p2Matches = password[max - 1] === char;

  return (p1Matches && !p2Matches) || (!p1Matches && p2Matches);
};

const main = async () => {
  const passwordRecords = await readData();
  const answer = passwordRecords
    .map(isPasswordValid)
    .reduce((acc, cur) => (cur ? acc + 1 : acc), 0);

  console.log(answer);
};

main();
