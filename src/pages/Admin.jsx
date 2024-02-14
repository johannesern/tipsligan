import "./Home.css";

import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateFile from "../functions/CreateFile";
import { GetActiveRound } from "../API/RoundsAPI";

export default function Home() {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [activeBtn, setActiveBtn] = useState(null);

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
    const roundResponse = await GetActiveRound();
    if (roundResponse.ok) {
      const round = await roundResponse.json();
      CreateFile(round.userDatas);
    } else {
      console.error("Admin: Kunde inte hämta aktiv runda");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const handleClick = (btnName) => {
    navigate("/admin");
    setActiveBtn(activeBtn === btnName ? null : btnName);
  };

  return (
    <section>
      <article>
        <h2>Admin</h2>
        <button onClick={logout} type="button">
          Logga ut
        </button>
        <p>
          Här kan man skriva in saker som är bra för admins att veta eller
          tillvägagångssätt för hur vissa funktioner fungerar.
        </p>
        <div className="home-buttons">
          <button onClick={() => handleClick("userBtn")}>Användare</button>
          <button onClick={() => handleClick("roundBtn")}>Omgångar</button>
          <button onClick={() => handleClick("settingsBtn")}>
            Inställningar
          </button>
        </div>
        {activeBtn === "userBtn" && (
          <div className="admin_btn-layout">
            <Link to="deltagare">
              <button onClick={() => setActiveBtn(null)}>
                Lista alla användare
              </button>
            </Link>
            <Link to="registrera">
              <button onClick={() => setActiveBtn(null)}>
                Skapa ny användare
              </button>
            </Link>
          </div>
        )}
        {activeBtn === "roundBtn" && (
          <div className="admin_btn-layout admin_round">
            <Link to="rätta-omgång">
              <button onClick={() => setActiveBtn(null)}>
                Rätta pågående omgång
              </button>
            </Link>
            <Link to="alla-omgångar">
              <button onClick={() => setActiveBtn(null)}>
                Administrera omgångar
              </button>
            </Link>
            <Link to="omgång-veckovis">
              <button onClick={() => setActiveBtn(null)}>
                Visa omgång veckovis
              </button>
            </Link>
            <Link onClick={() => setActiveBtn(null)}>
              <button onClick={handleFileCreation}>
                Skapa fil för inlämning
              </button>
            </Link>
            <Link to="skapa-ny-omgång">
              <button onClick={() => setActiveBtn(null)}>
                Skapa ny omgång
              </button>
            </Link>
            <Link to="vinstfördelning">
              <button onClick={() => setActiveBtn(null)}>
                Vinstfördelning
              </button>
            </Link>
          </div>
        )}
        {activeBtn === "settingsBtn" && (
          <div className="admin_btn-layout admin_settings">
            <Link to="inställningar">
              <button onClick={() => setActiveBtn(null)}>
                Förenings fördelning
              </button>
            </Link>
          </div>
        )}
        <div>
          <Outlet />
        </div>
      </article>
    </section>
  );
}
