import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function GetActiveRound() {
  const baseUrl = TipsliganAPIURL();
  try {
    const response = await fetch(baseUrl + "/rounds/active");
    // console.log("Rounds response:", response);
    if (response.ok) {
      const responseData = await response.json();
      // console.log("Fetch rounds response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error("API:GetActiveRound error", error);
    return error;
  }
}
