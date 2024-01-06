import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function CreateRound(data) {
  const baseUrl = TipsliganAPIURL();
  try {
    const response = await fetch(baseUrl + "/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Failed to post data");
    }
  } catch (error) {
    console.error("API:Create round error", error);
  }
}
