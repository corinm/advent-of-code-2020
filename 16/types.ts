export interface Rule {
  name: string;
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

export type Ticket = number[];

export type Positions = { [key: string]: number };
