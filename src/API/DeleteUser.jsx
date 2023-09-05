import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function DeleteUser(userId) {
  const baseUrl = DevURL();
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return "Användare borttagen!";
    } else {
      console.error("Failed to delete data");
    }
  } catch (error) {
    console.error("API:Delete user error", error);
  }
}
