import { solvePart1 } from "./helpers";
import { readData } from "./readData";

const main = async () => {
  const [rules, myTicket, otherTickets] = await readData();
  console.log("Part 1:", solvePart1(rules, otherTickets));
};

main();
