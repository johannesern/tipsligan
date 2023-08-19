import "./Home.css";

import HomeTitleAndButtons from "../components/HomeTitleAndButtonsManager";
import SiteInfo from "../components/SiteInfo";

import { Outlet } from "react-router-dom";

export default function Home() {
  const fetchTester = async () => {
    try {
      const response = await fetch("https://localhost:5000/users");
      console.log("Rounds response:", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log("Fetch rounds response:", responseData);
        return responseData;
      } else {
        console.error("Failed to get data");
      }
    } catch (error) {
      console.error("Roundsdisplay error", error);
      return error;
    }
  };
  return (
    <section>
      <article>
        <button onClick={fetchTester}>Hämta rundor</button>
        <HomeTitleAndButtons />
        <SiteInfo />
        <Outlet />
      </article>
    </section>
  );
}
