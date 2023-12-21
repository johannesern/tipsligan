import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function DeleteRound(weeklyId) {
    const baseUrl = DevURL();
    try {
        const response = await fetch(`${baseUrl}/weeklySnapshot/${weeklyId}`, {
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
