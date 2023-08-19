export async function DeleteUser(userId) {
  try {
    const response = await fetch(
      `https://tipsligan-api.fly.dev/users/${userId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      return "Användare borttagen!";
    } else {
      console.error("Failed to delete data");
    }
  } catch (error) {
    console.error(error);
  }
}
