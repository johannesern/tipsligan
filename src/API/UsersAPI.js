// import { baseUrl } from "../config";
const baseUrl = "https://tipsligan-api-twilight-glitter-4832.fly.dev";

export async function CreateUser(data) {
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(baseUrl + "/users", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
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
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(baseUrl + "/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
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

// export async function GetUser(userId) {
//   const token = localStorage.getItem("userToken");
//   try {
//     const response = await fetch(`${baseUrl}/users/${userId}`, {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     });

//     if (response.ok) {
//       const responseData = await response.json();
//       // console.log("Fetch one user response:", responseData);
//       return responseData;
//     } else {
//       console.error("Failed to get one data");
//     }
//   } catch (error) {
//     console.error("API:GetUser error", error);
//   }
// }

export async function GetUserById(userId) {
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
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
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(baseUrl + "/users/userDataModels", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
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
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(`${baseUrl}/users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
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
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
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
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(baseUrl + "/auth/login", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return response;
  } catch (error) {
    console.error("API:Login user error", error);
  }
}

export async function Logout() {
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(baseUrl + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return response;
  } catch (error) {
    console.error("API:Login user error", error);
  }
}
