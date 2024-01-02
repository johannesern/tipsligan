import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export default async function UpdateSettings(settings) {
    const baseUrl = DevURL();
    try {
        // console.log("API:UpdateRound", round);
        const response = await fetch(`${baseUrl}/AssociationSettings/${settings.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(settings),
        });

        // console.log("API:UpdateSettings", response);
        return response;
    } catch (error) {
        console.error("API:UpdateRound error", error);
    }
}
