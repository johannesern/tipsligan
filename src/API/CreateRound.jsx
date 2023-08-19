export async function CreateRound(data) {
  try {
    const response = await fetch("https://tipsligan-api.fly.dev/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      //   console.log("Response data success!", responseData);
      return responseData;
    } else {
      console.error("Failed to post data");
    }
  } catch (error) {
    console.error(error);
  }
}
