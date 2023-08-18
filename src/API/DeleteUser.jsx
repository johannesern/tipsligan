export async function DeleteUser(userId) {
  try {
    const response = await fetch(`users/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return "Användare borttagen!";
    } else {
      console.error("Failed to delete data");
    }
  } catch (error) {
    console.error(error);
  }
}
