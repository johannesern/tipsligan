import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function LoginUser(credentials) {
    const baseUrl = DevURL();
    try {
        const response = await fetch(baseUrl + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        return response;

    } catch (error) {
        console.error("API:Login user error", error);
    }
}
