import { readData } from "./helpers";

export interface PasswordRecord {
  char: string;
  min: number;
  max: number;
  password: string;
}

const isPasswordValid = (passwordRecord: PasswordRecord) => {
  const { password, char, min, max } = passwordRecord;
  const charCount = password
    .split("")
    .reduce((acc, cur) => (cur === char ? acc + 1 : acc), 0);
  return charCount >= min && charCount <= max;
};

const main = async () => {
  const passwordRecords = await readData();
  const answer = passwordRecords
    .map(isPasswordValid)
    .reduce((acc, cur) => (cur ? acc + 1 : acc), 0);

  console.log(answer);
};

main();
