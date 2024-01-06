import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function CreateUser(data) {
  const baseUrl = TipsliganAPIURL();
  try {
    const response = await fetch(baseUrl + "/users/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.error("API:Create user error", error);
  }
}
