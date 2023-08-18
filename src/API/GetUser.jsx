export async function GetUser(userId) {
  try {
    const response = await fetch(`users/${userId}`);

    if (response.ok) {
      const responseData = await response.json();
      // console.log("Fetch one user response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get one data");
    }
  } catch (error) {
    console.error(error);
  }
}
