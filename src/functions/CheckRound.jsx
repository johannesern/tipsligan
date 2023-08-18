import CheckDate from "./CheckDate";
import UpdateRound from "../API/UpdateRound";
import { RoundIsOpen, RoundIsActive } from "./Round";

export default async function CheckRound(data) {
  // console.log("Checkround incoming data:", data);
  const startDateIsPassed = CheckDate(data.startDate);
  // console.log("startdate passed:", startDateIsPassed);
  const endDateIsPassed = CheckDate(data.endDate);
  // console.log("enddate passed:", endDateIsPassed);
  if (startDateIsPassed && data.isOpen) {
    // console.log("Incoming data:", data);
    const updatedRound = RoundIsOpen(data, false);
    // console.log("Updated round:", updatedRound);
    const result = await UpdateRound(updatedRound);
    // console.log("Updated data:", result);

    return true;
  } else if (startDateIsPassed === false && data.isOpen === false) {
    console.log("Incoming data:", data);
    const updatedRound = RoundIsOpen(data, true);
    console.log("Updated round:", updatedRound);
    const result = await UpdateRound(updatedRound);
    console.log("Updated data:", result);
  }

  if (endDateIsPassed && data.isActive) {
    // console.log("Incoming data:", data);
    const updatedRound = RoundIsActive(data, false);
    // console.log("Updated round:", updatedRound);
    const result = await UpdateRound(updatedRound);
    // console.log("Updated data:", result);

    return true;
  }
  return false;
}
