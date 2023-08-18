import { Link } from "react-router-dom";
import { useState } from "react";

export default function HomeButtons({ passRoundToButtons }) {
  console.log("Homebuttons incoming:", passRoundToButtons);
  const [tryToRegistrateMessage, setTryToRegistrateMessage] = useState("");

  const handleNoRoundAvailable = () => {
    setTryToRegistrateMessage("Omgång låst för registrering, kontakta admin");
    setTimeout(() => {
      setTryToRegistrateMessage("");
    }, 2500);
  };
  return (
    <>
      <div className="home-buttons">
        {passRoundToButtons != null &&
        passRoundToButtons.isActive &&
        passRoundToButtons.isOpen ? (
          <Link to="registrera">
            <button>Registrera rad</button>
          </Link>
        ) : (
          <button
            onClick={handleNoRoundAvailable}
            style={{ backgroundColor: "gray" }}
          >
            Registrera rad
          </button>
        )}
        <Link to="topplista">
          <button>Topplista</button>
        </Link>
      </div>
      <br />
      {tryToRegistrateMessage != null ? (
        <h3>{tryToRegistrateMessage}</h3>
      ) : (
        <p></p>
      )}
    </>
  );
}
