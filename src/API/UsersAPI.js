// const baseUrl = import.meta.env.VITE_API_URL
// const baseUrl = "https://tipsligan-api-twilight-glitter-4832.fly.dev";
const baseUrl = "https://tipsligan-api-green-sunset-8728.fly.dev";

export async function CreateUser(data) {
  try {
    const response = await fetch(baseUrl + "/users/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.error("API:Create user error", error);
  }
}

export async function GetAllUsers() {
  try {
    const response = await fetch(baseUrl + "/users");
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}

export async function GetUser(userId) {
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`);

    if (response.ok) {
      const responseData = await response.json();
      // console.log("Fetch one user response:", responseData);
      return responseData;
    } else {
      console.error("Failed to get one data");
    }
  } catch (error) {
    console.error("API:GetUser error", error);
  }
}

export async function GetUserByToken(token) {
  try {
    const response = await fetch(`${baseUrl}/users/by-token/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response;
  } catch (error) {
    console.error("API:GetUser error", error);
  }
}

export async function GetAllUsersAsDataModels() {
  try {
    const response = await fetch(baseUrl + "/users/userDataModels");
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Failed to get data");
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}

export async function UpdateUser(user) {
  try {
    console.log("API:UpdateUser", user);
    const response = await fetch(`${baseUrl}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    console.error("API:UpdateUser error", error);
  }
}

export async function DeleteUser(userId) {
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return "Användare borttagen!";
    } else {
      console.error("Failed to delete data");
    }
  } catch (error) {
    console.error("API:Delete user error", error);
  }
}

export async function LoginUser(credentials) {
  try {
    const response = await fetch(baseUrl + "/users/login", {
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
