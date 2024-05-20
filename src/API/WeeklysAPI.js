// const baseUrl = import.meta.env.VITE_API_URL;
const baseUrl = "https://tipsligan-api-twilight-glitter-4832.fly.dev";

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
    console.error("API:GetWeeklies error", error);
  }
}

export async function GetAllWeekliesByRoundId(roundId) {
  try {
    const response = await fetch(
      baseUrl + `/weeklysnapshot/weekly-by-round-id/${roundId}`
    );
    if (response.ok) {
      return response;
    } else {
      console.error("Failed to get data");
      return response;
    }
  } catch (error) {
    console.error("API:GetWeeklies error", error);
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
