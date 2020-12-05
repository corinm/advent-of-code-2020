import { readData } from "./helpers";

export interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

const containsRequiredFields = (p: Passport) =>
  p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid;

const isExactLength = (len: number, v: string): boolean => v.length === len;
const isAtLeast = (num: number, v: string) => parseInt(v) >= num;
const isAtMost = (num: number, v: string) => parseInt(v) <= num;

const isByrValid = (v: string): boolean =>
  isExactLength(4, v) && isAtLeast(1920, v) && isAtMost(2002, v);
const isIyrValid = (v: string): boolean =>
  isExactLength(4, v) && isAtLeast(2010, v) && isAtMost(2020, v);
const isEyrValid = (v: string): boolean =>
  isExactLength(4, v) && isAtLeast(2020, v) && isAtMost(2030, v);
const isHgtValid = (v: string) => {
  const num = v.slice(0, v.length - 2);
  const units = v.slice(v.length - 2);
  if (units === "cm") {
    return isAtLeast(150, num) && isAtMost(193, num);
  } else {
    return isAtLeast(59, num) && isAtMost(76, num);
  }
};
const isHclValid = (v: string) => /^#[0-9a-f]{6}$/.test(v);
const isEclValid = (v: string) =>
  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v);
const isPidValid = (v: string) => /^[0-9]{9}$/.test(v);

const solve = (passports: Passport[]): number => {
  return passports.filter(
    (p) =>
      containsRequiredFields(p) &&
      isByrValid(p.byr) &&
      isIyrValid(p.iyr) &&
      isEyrValid(p.eyr) &&
      isHgtValid(p.hgt) &&
      isHclValid(p.hcl) &&
      isEclValid(p.ecl) &&
      isPidValid(p.pid)
  ).length;
};

const main = async () => {
  const data = await readData();
  console.log(solve(data));
};

main();
