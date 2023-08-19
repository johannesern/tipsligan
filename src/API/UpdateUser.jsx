export async function UpdateUser(user) {
  // console.log("The user to update:", user);
  try {
    const response = await fetch(`https://tipsligan-api.fly.dev/${user.Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // console.log("Response:", response);

    if (response.ok) {
      return response.ok;
    } else {
      return response.ok;
    }
  } catch (error) {
    console.error(error);
  }
}
