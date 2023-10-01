import "./Home.css";

import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <article>
        <h2>Adminsidan</h2>
        <p>
          Här kan man skriva in saker som är bra för admins att veta eller
          tillvägagångssätt för hur vissa funktioner fungerar.
        </p>
        <div className="home-buttons">
          <Link to="användare">
            <button>Hämta alla användare</button>
          </Link>
          <Link to="registrera">
            <button>Skapa ny användare</button>
          </Link>
          <Link to="alla-omgångar">
            <button>Hämta alla omgångar</button>
          </Link>
          <Link to="skapa-ny-omgång">
            <button>Skapa ny omgång</button>
          </Link>
        </div>
        <div>
          <Outlet />
        </div>
      </article>
    </section>
  );
}
