import "./Home.css";

import HomeTitleAndButtons from "../components/HomeTitleAndButtonsManager";
import SiteInfo from "../components/SiteInfo";

import { Outlet } from "react-router-dom";

import { TipsliganAPIURL } from "../constants/Constants";
import { DevURL } from "../constants/Constants";

export default function Home() {
  const testerButton = () => {
    const data = DevURL();
    console.log("is this url:", data);
  };
  return (
    <section>
      {/* <button onClick={testerButton}>Testa här</button> */}
      <article>
        <HomeTitleAndButtons />
        <Outlet />
        <SiteInfo />
      </article>
    </section>
  );
}
