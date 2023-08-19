import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function UpdateRound(round) {
  const baseUrl = DevURL();

  try {
    const response = await fetch(`${baseUrl}/${round.Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(round),
    });
    // console.log("Response:", response);

    if (response.ok) {
      return response.ok;
    } else {
      return response.ok;
    }
  } catch (error) {
    console.error(error);
  }
}
