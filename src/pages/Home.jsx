import "./Home.css";

import SiteInfo from "../components/SiteInfo";

import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <article>
        <p>
          Här är tanken att man ska kunna uppdatera texten beroende på den
          omgång som pågår samt kunna lägga in egen text man vill förmedla.
        </p>
        <Outlet />
        <SiteInfo />
      </article>
    </section>
  );
}
