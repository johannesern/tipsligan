import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function AuthenticateUser(credentials) {
    const baseUrl = TipsliganAPIURL();
    try {
        const response = await fetch(baseUrl + "/users/authentication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            // console.log("Fetch one user response:", responseData);
            return response;
        } else {
            console.error("Failed to get data");
            return response;
        }
    } catch (error) {
        console.error("API:GetUserByEmail error", error);
    }
}
