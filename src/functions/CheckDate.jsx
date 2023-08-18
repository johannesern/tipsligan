import { FormattedDate } from "../functions/FormattedDate";

export default function CheckDate(date) {
  // console.log("Checkdate data:", date);
  const today = FormattedDate();
  // console.log("Today:", today);
  if (today > date) {
    return true;
  } else {
    return false;
  }
}
