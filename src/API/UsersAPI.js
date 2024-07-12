import { baseUrl } from "../config";
import Cookies from "js-cookie";

export async function CreateUser(payload) {
  try {
    const response = await fetch(baseUrl + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.error("API:Create user error", error);
  }
}

export async function GetAllUsers() {
  try {
    const response = await fetch(baseUrl + "/admin/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("userToken"),
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("API:GetAllUsers failed", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}

export async function GetUserById(userId) {
  console.log("API:GetUserById", userId);
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      console.error("UserAPI: GetUserById: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("UserAPI: GetUserById: ", error);
  }
}

export async function GetAllUsersAsDataModels() {
  try {
    const response = await fetch(baseUrl + "/users/userDataModels", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("userToken"),
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
  console.log("API:UpdateUser", JSON.stringify(user));
  try {
    const response = await fetch(`${baseUrl}/users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + Cookies.get("userToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      return true;
    } else {
      console.error("API: UpdateUser failed:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("API:UpdateUser error", error);
  }
}

export async function DeleteUser(payload) {
  try {
    const response = await fetch(`${baseUrl}/users/${payload.user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Failed to delete user");
      return false;
    }
  } catch (error) {
    console.error("API:Delete user error", error);
  }
}

export async function LoginUser(credentials) {
  try {
    const response = await fetch(baseUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      console.log("User login successful");
      const result = await response.json();
      return result;
    } else {
      console.error("API: User login error: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("API: Login user error", error);
    return null;
  }
}

export async function Logout(id) {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("API:Login user error", error);
  }
}

export async function Verify() {
  try {
    const response = await fetch(baseUrl + "/auth/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("API:Login user error", error);
  }
}
