import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function GetAllWeekly() {
    const baseUrl = DevURL();
    try {
        const response = await fetch(baseUrl + "/weeklysnapshot");
        // console.log("User response:", response);

        if (response.ok) {
            const responseData = await response.json();
            //   console.log("Fetchuser response:", responseData);
            return responseData;
        } else {
            console.error("Failed to get data");
        }
    } catch (error) {
        console.error("API:GetAllUsers error", error);
    }
}
