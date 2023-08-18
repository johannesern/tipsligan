export default async function GetAllUsers() {
  try {
    const response = await fetch("users");
    console.log("User response:", response);

    if (response.ok) {
      const responseData = await response.json();
      //   console.log("Fetchuser response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error(error);
  }
}
