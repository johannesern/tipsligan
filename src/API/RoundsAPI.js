import { baseUrl } from "../config";
import Cookies from "js-cookie";

export async function CreateRound(data, weeks) {
  const queryParam = new URLSearchParams({ weeks }).toString();
  const url = `${baseUrl}/rounds?${queryParam}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("API:Create round error", error);
  }
}

export async function GetActiveRound() {
  try {
    const response = await fetch(baseUrl + "/rounds/active");
    if (response.ok) {
      return response;
    } else {
      console.error("Failed to get data");
      return response;
    }
  } catch (error) {
    console.error("API:GetActiveRound error", error);
    return error;
  }
}

export async function GetAllRounds() {
  try {
    const response = await fetch(baseUrl + "/rounds", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Failed to get data");
      return null;
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}

export async function UpdateRound(round) {
  try {
    const response = await fetch(`${baseUrl}/rounds/${round.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
      body: JSON.stringify(round),
    });

    if (response.ok) {
      return response;
    } else {
      console.error("Failed to update data");
      return response;
    }
  } catch (error) {
    console.error("API:UpdateRound error", error);
  }
}

export async function DeleteRound(roundId) {
  try {
    const response = await fetch(`${baseUrl}/rounds/${roundId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
    });

    if (response.ok) {
      return "Rundan raderad!";
    } else {
      console.error("Failed to delete data");
    }
  } catch (error) {
    console.error("API:Delete round error", error);
  }
}

export async function CorrectionRound(roundId) {
  const url = `${baseUrl}/rounds/manual-coupon/${roundId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
    });

    if (response.ok) {
      return response;
    } else {
      console.error("Failed to get data", response);
      return response;
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}

export async function CorrectionRoundSemiAuto(correctRow, roundId) {
  const queryParam = new URLSearchParams({ correctRow }).toString();
  const url = `${baseUrl}/rounds/manual-coupon/${roundId}?${queryParam}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("userToken"),
      },
      body: JSON.stringify(correctRow),
    });

    if (response.ok) {
      return response;
    } else {
      console.error("Failed to update: ", response);
      return response;
    }
  } catch (error) {
    console.error("API:GetAllUsers error", error);
  }
}
