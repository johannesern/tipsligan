import "./Home.css";

import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <article>
        <h2>Adminsidan</h2>
        <div className="home-buttons">
          <Link to="användare">
            <button>Hämta alla användare</button>
          </Link>
          <Link to="registrera">
            <button>Skapa ny användare</button>
          </Link>
          <Link to="skapa-ny-omgång">
            <button>Skapa ny omgång</button>
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit molestiae
          dignissimos voluptates vero placeat incidunt unde, sequi, facere atque
          quam, quos corrupti cum mollitia officia tempora a cupiditate
          voluptate accusantium.
        </p>
        <div>
          <Outlet />
        </div>
      </article>
    </section>
  );
}
