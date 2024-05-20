// const baseUrl = import.meta.env.VITE_API_URL
const baseUrl = "https://tipsligan-api-twilight-glitter-4832.fly.dev";

export async function LoginAdmin(credentials) {
  try {
    const response = await fetch(baseUrl + "/Admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return response;
  } catch (error) {
    console.error("API:Login user error", error);
  }
}
