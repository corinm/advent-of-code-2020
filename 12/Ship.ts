type Direction = "N" | "E" | "S" | "W";
type TurnDirection = "L" | "R";
export type Action = "N" | "E" | "S" | "W" | "L" | "R" | "F";
export interface Instruction {
  action: Action;
  value: number;
}
interface Point {
  x: number;
  y: number;
}

const EAST = 90;

export default class Ship {
  x = 0;
  y = 0;
  direction = EAST;

  public navigate = (instructions: Instruction[]): void => {
    instructions.forEach((instruction) => {
      if (["N", "E", "S", "W"].includes(instruction.action)) {
        this.move(instruction.action as Direction, instruction.value);
      } else if (["L", "R"].includes(instruction.action)) {
        this.turn(instruction.action as TurnDirection, instruction.value);
      } else if (instruction.action === "F") {
        this.moveForward(instruction.value);
      }
    });
  };

  public getPosition = (): Point => ({ x: this.x, y: this.y });

  move = (direction: Direction, distance: number): void => {
    if (direction === "N") {
      this.y -= distance;
    } else if (direction === "S") {
      this.y += distance;
    } else if (direction === "W") {
      this.x -= distance;
    } else {
      this.x += distance;
    }
  };

  turn = (direction: TurnDirection, degrees: number): void => {
    if (direction === "L") {
      this.subtractDegrees(degrees);
    } else {
      this.addDegrees(degrees);
    }
  };

  addDegrees = (amount: number): void => {
    const newDirection = this.direction + amount;
    this.direction = newDirection % 360;
  };

  subtractDegrees = (amount: number): void => {
    const newDirection = this.direction - amount;
    this.direction =
      newDirection < 0 ? Math.abs(newDirection + 360) : newDirection;
  };

  moveForward = (distance: number): void => {
    let dX = 0;
    let dY = 0;

    if (this.direction === 0) {
      dY = -distance;
    } else if (this.direction === 180) {
      dY = distance;
    } else if (this.direction === 90) {
      dX = distance;
    } else if (this.direction === 270) {
      dX = -distance;
    }

    this.x += dX;
    this.y += dY;
  };
}
