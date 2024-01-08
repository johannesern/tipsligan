const baseUrl = import.meta.env.VITE_API_URL

export async function GetAllWeekly() {
    try {
        const response = await fetch(baseUrl + "/weeklysnapshot");
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

export async function GetLatestWeekly() {
    try {
        const response = await fetch(baseUrl + "/weeklysnapshot/latest");
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error("Failed to get data");
        }
    } catch (error) {
        console.error("API:GetActiveRound error", error);
        return error;
    }
}

export async function DeleteWeekly(weeklyId) {
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