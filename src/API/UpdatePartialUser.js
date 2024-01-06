import { DevURL } from "../constants/Constants";
import { TipsliganAPIURL } from "../constants/Constants";

export async function UpdatePartialUser(user) {
    const baseUrl = TipsliganAPIURL();
    try {
        const response = await fetch(`${baseUrl}/users/partial-user/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        // console.log("Response:", response);
        return response;
    } catch (error) {
        console.error("API:UpdateUser error", error);
    }
}
