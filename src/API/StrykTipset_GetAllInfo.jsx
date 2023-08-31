export default async function Stryktipset_GetRow() {
  const stryktipsUrl =
    "https://api.spela.svenskaspel.se/draw/1/stryktipset/draws/result";

  try {
    const response = await fetch(stryktipsUrl);

    if (response.ok) {
      const responseData = await response.json();
      // console.log("Fetching from stryket:", responseData);
      return responseData;
    } else {
      console.error("Failed to get one data");
    }
  } catch (error) {
    console.error(error);
  }
}
