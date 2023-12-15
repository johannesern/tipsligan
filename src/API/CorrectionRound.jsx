import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function CorrectionRound() {
  const baseUrl = DevURL();
  try {
    const response = await fetch(baseUrl + "/Coupon");

    if (response.ok) {      
      console.log("coupon response:", response);
      return response;
    } else {      
      console.error("Failed to get data", response);
      return response;
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}
