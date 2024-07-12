import { baseUrl } from "../config";
import Cookies from "js-cookie";

export async function GetSettings() {
  try {
    const response = await fetch(baseUrl + "/admin/associations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Failed to get data");
      return null;
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}

export async function UpdateSettings(settings) {
  try {
    const response = await fetch(
      `${baseUrl}/admin/associations/${settings.associationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("userToken"),
        },
        body: JSON.stringify(settings),
      }
    );
    return response;
  } catch (error) {
    console.error("API:UpdateRound error", error);
  }
}
