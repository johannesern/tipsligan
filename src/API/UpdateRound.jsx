import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function UpdateRound(round) {
  const baseUrl = DevURL();
  try {
    // console.log("API:UpdateRound", round);
    const response = await fetch(`${baseUrl}/rounds/${round.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(round),
    });

    if (response.ok) {
      return response.ok;
    } else {
      return response.ok;
    }
  } catch (error) {
    console.error("API:UpdateRound error", error);
  }
}
