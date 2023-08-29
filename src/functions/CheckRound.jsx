import CheckDate from "./CheckDate";
import UpdateRound from "../API/UpdateRound";
import { RoundIsOpen, RoundIsActive } from "./Round";

export default async function CheckRound(round) {
  const startDateIsPassed = CheckDate(round.startDate);
  const endDateIsPassed = CheckDate(round.endDate);
  if (startDateIsPassed && round.isOpen) {
    const updatedRound = RoundIsOpen(round, false);
    await UpdateRound(updatedRound);

    return true;
  } else if (startDateIsPassed === false && round.isOpen === false) {
    const updatedRound = RoundIsOpen(round, true);
    await UpdateRound(updatedRound);
  }

  if (endDateIsPassed && round.isActive) {
    const updatedRound = RoundIsActive(round, false);
    await UpdateRound(updatedRound);

    return true;
  }
  return false;
}
