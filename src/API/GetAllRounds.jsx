import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function GetAllRounds() {
  const baseUrl = DevURL();
  try {
    const response = await fetch(baseUrl + "/rounds/all-rounds");

    if (response.ok) {
      const responseData = await response.json();
      //   console.log("Fetchuser response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}
