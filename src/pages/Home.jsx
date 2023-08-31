import "./Home.css";

import HomeTopContent from "../components/HomeTopContent";
import SiteInfo from "../components/SiteInfo";

import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <article>
        <HomeTopContent />
        <Outlet />
        <SiteInfo />
      </article>
    </section>
  );
}
