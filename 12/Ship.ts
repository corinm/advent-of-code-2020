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
      console.log({ x: this.x, y: this.y });
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
    if (this.direction + amount >= 360) {
      this.direction = this.direction + amount - 360;
    } else {
      this.direction = this.direction + amount;
    }
  };

  subtractDegrees = (amount: number): void => {
    if (this.direction - amount < 0) {
      this.direction = this.direction + amount + 360;
    } else {
      this.direction = this.direction + amount;
    }
  };

  moveForward = (distance: number): void => {
    const d = this.direction;
    let dX = 0;
    let dY = 0;

    if (d === 0) {
      dY = -distance;
    } else if (d === 180) {
      dY = distance;
    } else if (d === 90) {
      dX = distance;
    } else if (d === 270) {
      dX = -distance;
    }

    const h = distance;
    if (d > 0 && d <= 45) {
      dX = Math.sin(d) * h;
      dY = -Math.cos(d) * h;
    } else if (d > 45 && d < 90) {
      dX = Math.cos(d) * h;
      dY = -Math.sin(d) * h;
    } else if (d > 90 && d <= 135) {
      dX = Math.cos(d) * h;
      dY = Math.sin(d) * h;
    } else if (d > 135 && d < 180) {
      dX = Math.sin(d) * h;
      dY = Math.cos(d) * h;
    } else if (d > 180 && d <= 225) {
      dX = -Math.sin(d) * h;
      dY = Math.cos(d) * h;
    } else if (d > 225 && d < 270) {
      dX = -Math.cos(d) * h;
      dY = Math.sin(d) * h;
    } else if (d > 270 && d <= 315) {
      dX = -Math.cos(d) * h;
      dY = -Math.sin(d) * h;
    } else if (d > 315 && d < 360) {
      dX = -Math.sin(d) * h;
      dY = -Math.cos(d) * h;
    }

    console.log({ dX, dY });

    this.x += dX;
    this.y += dY;
  };
}

const xIsOpposite = (degrees: number) =>
  degrees <= 45 || (degrees > 135 && degrees <= 225) || degrees > 315;
