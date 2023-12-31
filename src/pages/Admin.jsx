import "./Home.css";

import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateFile from "../functions/CreateFile";
import GetActiveRound from "../API/GetActiveRound";

export default function Home() {
  const navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setToken(adminToken);
    } else {
      navigate("/login"); // You can also return a loading spinner or message here if needed
    }
  }, [navigate]);

  useEffect(() => {}, [token]);

  const handleFileCreation = async () => {
    const round = await GetActiveRound();
    CreateFile(round.userDatas, "Stryktipset");
  };

  return (
    <section>
      <article>
        <h2>Adminsidan</h2>
        <p>
          Här kan man skriva in saker som är bra för admins att veta eller
          tillvägagångssätt för hur vissa funktioner fungerar.
        </p>
        <div className="home-buttons">
          <button onClick={handleFileCreation}>Skapa fil för inlämning</button>
          <Link to="deltagare">
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
          <Link to="rätta-omgång">
            <button>Rätta pågående omgång</button>
          </Link>
          <Link to="veckorundor">
            <button>Visa alla veckor</button>
          </Link>
          <Link to="vinstfördelning">
            <button>Vinstfördelning</button>
          </Link>
          <Link to="inställningar">
            <button>Inställningar</button>
          </Link>
        </div>
        <div>
          <Outlet />
        </div>
      </article>
    </section>
  );
}
