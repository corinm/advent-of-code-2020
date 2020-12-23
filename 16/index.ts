import { solvePart1, solvePart2 } from "./helpers";
import { readData } from "./readData";

const main = async () => {
  const [rules, myTicket, otherTickets] = await readData();
  console.log("Part 1:", solvePart1(rules, otherTickets));
  console.log("Part 2:", solvePart2(rules, otherTickets, myTicket));
};

main();
