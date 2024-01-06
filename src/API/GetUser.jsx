import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function GetUser(userId) {
  const baseUrl = TipsliganAPIURL();
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

export async function GetUserByToken(token) {
  const baseUrl = DevURL();
  try {
    const response = await fetch(`${baseUrl}/users/by-token/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response;
  } catch (error) {
    console.error("API:GetUser error", error);
  }
}
