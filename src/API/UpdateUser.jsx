import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function UpdateUser(user) {
  const baseUrl = DevURL();
  try {
    const response = await fetch(`${baseUrl}/users/${user.Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // console.log("Response:", response);

    if (response.ok) {
      return response.ok;
    } else {
      return response.ok;
    }
  } catch (error) {
    console.error("API:UpdateUser error", error);
  }
}
