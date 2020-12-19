import { Instruction, Point } from "./ShipPart1";

class Waypoint {
  private x = 10; // 10 east
  private y = -1; // 1 north

  public move = (instruction: Instruction): void => {
    const { action: direction, value: distance } = instruction;

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

  public getPosition = (): Point => ({ x: this.x, y: this.y });

  public setX = (value: number): void => {
    this.x = value;
  };
  public setY = (value: number): void => {
    this.y = value;
  };

  public rotate = (instruction: Instruction): void => {
    const { action: direction, value } = instruction;
    const timesToRotate = value / 90;

    let newX = this.x;
    let newY = this.y;

    if (direction === "R") {
      for (let i = 0; i < timesToRotate; i++) {
        const tempX = -newY;
        const tempY = newX;

        newX = tempX;
        newY = tempY;
      }
    } else if (direction === "L") {
      for (let i = 0; i < timesToRotate; i++) {
        const tempX = newY;
        const tempY = -newX;

        newX = tempX;
        newY = tempY;
      }
    }

    this.x = newX;
    this.y = newY;
  };
}

export default class Ship {
  private x = 0;
  private y = 0;
  private waypoint: Waypoint;

  constructor() {
    this.waypoint = new Waypoint();
  }

  public navigate = (instructions: Instruction[]): void => {
    instructions.forEach(this.processInstruction);
  };

  public getPosition = (): Point => ({ x: this.x, y: this.y });
  public getWaypoint = (): Point => ({ ...this.waypoint.getPosition() });

  private processInstruction = (instruction: Instruction): void => {
    if (["N", "E", "S", "W"].includes(instruction.action)) {
      this.waypoint.move(instruction);
    } else if (["L", "R"].includes(instruction.action)) {
      this.waypoint.rotate(instruction);
    } else if (instruction.action === "F") {
      this.moveToWaypointTimes(instruction);
    }
  };

  private moveToWaypointTimes = (instruction: Instruction): void => {
    const { value: times } = instruction;

    const { x: wX, y: wY } = this.waypoint.getPosition();
    const newX = wX * times;
    const newY = wY * times;

    this.x += newX;
    this.y += newY;
  };
}
