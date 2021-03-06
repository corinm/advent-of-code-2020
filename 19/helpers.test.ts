import { getCombinations, solvePart1 } from "./helpers";
import { Rules } from "./types";

describe("getCombinations", () => {
  test.each([
    [
      {
        0: { type: "exact", char: "a" },
      } as Rules,
      "^a$",
    ],
    [
      {
        0: { type: "sub", rules: [1, 2] },
        1: { type: "exact", char: "a" },
        2: { type: "exact", char: "b" },
      } as Rules,
      "^ab$",
    ],
    // [
    //   {
    //     0: { type: "subor", rules1: [1, 2], rules2: [2, 1] },
    //     1: { type: "exact", char: "a" },
    //     2: { type: "subor", rules1: [1, 3], rules2: [3, 1] },
    //     3: { type: "exact", char: "b" },
    //   } as Rules,
    //   "^(?:a(?:(?:ab)|(?:ba))|(?:(?:ab)|(?:ba))a)$",
    // ],
  ])("basics", (rules, validationString) => {
    expect(getCombinations(rules)).toEqual(validationString);
  });

  // (a(ab|ba)|(ab|ba)a)

  // "(?:a(?: (?:ab) | (?:ba) )|(?: (?:ab) | (?:ba) )a)"
  // (?:a XXX (?:ab) | (?:ba) )|(?: (?:ab) | (?:ba) X a)

  xtest.each([
    [
      {
        0: { type: "sub", rules: [1, 2] },
        1: { type: "exact", char: "a" },
        2: { type: "subor", rules1: [1, 3], rules2: [3, 1] },
        3: { type: "exact", char: "b" },
      } as Rules,
      "^a(?:(?:ab)|(?:ba))$",
    ],
    [
      {
        0: { type: "sub", rules: [4, 1, 5] },
        1: { type: "subor", rules1: [2, 3], rules2: [3, 2] },
        2: { type: "subor", rules1: [4, 4], rules2: [5, 5] },
        3: { type: "subor", rules1: [4, 5], rules2: [5, 4] },
        4: { type: "exact", char: "a" },
        5: { type: "exact", char: "b" },
      } as Rules,
      "^a(?:(?:(?:aa)|(?:bb))(?:(?:ab)|(?:ba))|(?:(?:ab)|(?:ba))(?:(?:aa)|(?:bb)))b$",
    ],
  ])("examples", (rules, validationString) => {
    expect(getCombinations(rules)).toEqual(validationString);
  });
});

describe("solvePart1", () => {
  test("example 2", () => {
    const rules: Rules = {
      0: { type: "sub", rules: [4, 1, 5] },
      1: { type: "subor", rules1: [2, 3], rules2: [3, 2] },
      2: { type: "subor", rules1: [4, 4], rules2: [5, 5] },
      3: { type: "subor", rules1: [4, 5], rules2: [5, 4] },
      4: { type: "exact", char: "a" },
      5: { type: "exact", char: "b" },
    };
    const strings = ["ababbb", "bababa", "abbbab", "aaabbb", "aaaabbb"];
    expect(solvePart1(rules, strings)).toEqual(2);
  });

  test("works with a | b", () => {
    const rules: Rules = {
      0: { type: "subor", rules1: [1], rules2: [2] },
      1: { type: "exact", char: "a" },
      2: { type: "exact", char: "b" },
    };
    const strings = ["a", "b", "ab"];
    expect(solvePart1(rules, strings)).toEqual(2);
  });
});
