const baseUrl = import.meta.env.VITE_API_URL

export default async function GetSiteInfo() {
  try {
    const response = await fetch(baseUrl + "/siteinfo");
    // console.log("Rounds response:", response);
    if (response.ok) {
      const responseData = await response.json();
      // console.log("Fetch rounds response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error("API:GetSiteInfo error", error);
  }
}
