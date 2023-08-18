import "./Home.css";

import HomeTitleAndButtons from "../components/HomeTitleAndButtonsManager";
import SiteInfo from "../components/SiteInfo";

import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <article>
        <HomeTitleAndButtons />
        <SiteInfo />
        <Outlet />
      </article>
    </section>
  );
}
