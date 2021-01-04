interface SingleCharacterRule {
  type: "exact";
  char: string;
}

interface SubRuleRule {
  type: "sub";
  rules: number[];
}

interface SubRuleOrRule {
  type: "subor";
  rules1: number[];
  rules2: number[];
}

export type Rule = SingleCharacterRule | SubRuleRule | SubRuleOrRule;
export type Rules = { [key: number]: Rule };
