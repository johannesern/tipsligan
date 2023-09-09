import "./Home.css";

import SiteInfo from "../components/SiteInfo";

import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <article>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, a
          esse amet eaque perferendis repellat? Quae accusantium nostrum
          voluptatem numquam quod. Explicabo aliquid commodi, est aliquam soluta
          nemo corporis necessitatibus dolorem quo non veritatis a quia incidunt
          quos corrupti repudiandae! Porro consequuntur aliquam consectetur
          numquam iste recusandae dolore. Repellendus, saepe?
        </p>
        {/* <HomeTopContent /> */}
        <Outlet />
        <SiteInfo />
      </article>
    </section>
  );
}
