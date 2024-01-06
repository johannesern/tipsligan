import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function DeleteRound(roundId) {
  const baseUrl = TipsliganAPIURL();
  try {
    const response = await fetch(`${baseUrl}/rounds/${roundId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return "Rundan raderad!";
    } else {
      console.error("Failed to delete data");
    }
  } catch (error) {
    console.error("API:Delete round error", error);
  }
}
