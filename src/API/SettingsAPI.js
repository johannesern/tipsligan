// import { baseUrl } from "../config";
const baseUrl = "https://tipsligan-api-twilight-glitter-4832.fly.dev";

export async function GetSettings() {
  try {
    const response = await fetch(baseUrl + "/AssociationSettings/settings");
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}

export async function UpdateSettings(settings) {
  try {
    const response = await fetch(
      `${baseUrl}/AssociationSettings/${settings.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      }
    );
    return response;
  } catch (error) {
    console.error("API:UpdateRound error", error);
  }
}
