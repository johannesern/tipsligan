const baseUrl = import.meta.env.VITE_API_URL

export async function CreateRound(data) {
    try {
        const response = await fetch(baseUrl + "/rounds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error("Failed to post data");
        }
    } catch (error) {
        console.error("API:Create round error", error);
    }
}

export async function GetActiveRound() {
    try {
        const response = await fetch(baseUrl + "/rounds/active");
        if (response.ok) {
            return response;
        } else {
            console.error("Failed to get data");
            return response;
        }
    } catch (error) {
        console.error("API:GetActiveRound error", error);
        return error;
    }
}

export async function GetAllRounds() {
    try {
        const response = await fetch(baseUrl + "/rounds/all-rounds");

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

export async function UpdateRound(round) {
    try {
        const response = await fetch(`${baseUrl}/rounds/${round.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(round),
        });

        if (response.ok) {
            return response.ok;
        } else {
            return response.ok;
        }
    } catch (error) {
        console.error("API:UpdateRound error", error);
    }
}

export async function DeleteRound(roundId) {
    try {
        const response = await fetch(`${baseUrl}/rounds/${roundId}`, {
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

export async function CorrectionRound() {
    try {
        const response = await fetch(baseUrl + "/Coupon");

        if (response.ok) {
            return response;
        } else {
            console.error("Failed to get data", response);
            return response;
        }
    } catch (error) {
        console.error("API:GetAllUsers error", error);
    }
}
