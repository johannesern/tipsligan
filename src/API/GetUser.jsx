import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function GetUser(userId) {
  const baseUrl = DevURL();
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`);

    if (response.ok) {
      const responseData = await response.json();
      // console.log("Fetch one user response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get one data");
    }
  } catch (error) {
    console.error("API:GetUser error", error);
  }
}
