import "./Home.css";

import SiteInfo from "../components/SiteInfo";

import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <article>
        <Outlet />
        <SiteInfo />
      </article>
    </section>
  );
}
