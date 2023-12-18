import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function LoginUser(credentials) {
  const baseUrl = DevURL();
  try {
    const response = await fetch(baseUrl + "/Auth/authorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    // console.log("Response from API:LoginUser", response);

    if (response.ok) {
      const responseData = await response.json();
      // console.log("Response data success!", responseData);
      return responseData;
    } else {
      console.error("Failed to login user");
    }
  } catch (error) {
    console.error("API:Login user error", error);
  }
}
