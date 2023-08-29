import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function GetAllRounds() {
  const baseUrl = DevURL();
  try {
    const response = await fetch(baseUrl + "/rounds");
    // console.log("Rounds response:", response);
    if (response.ok) {
      const responseData = await response.json();
      // console.log("Fetch rounds response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error("Roundsdisplay error", error);
    return error;
  }
}