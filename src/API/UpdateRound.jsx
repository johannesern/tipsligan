export default async function UpdateRound(round) {
  // console.log("The round to update:", round);
  try {
    const response = await fetch(`rounds/${round.Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(round),
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
