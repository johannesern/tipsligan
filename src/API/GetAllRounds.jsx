export default async function GetAllRounds() {
  try {
    const response = await fetch("https://tipsligan-api.fly.dev/rounds");
    console.log("Rounds response:", response);
    if (response.ok) {
      const responseData = await response.json();
      console.log("Fetch rounds response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error("Roundsdisplay error", error);
    return error;
  }
}
