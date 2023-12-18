import { useState, useEffect } from "react";
import "./CorrectionRound.css";
import { EnableCorrection } from "../functions/EnableCorrection";
import CorrectionRound from "../API/CorrectionRound";
import useStore from "../store/useStore";
import UpdateRound from "../API/UpdateRound";
import GetActiveRound from "../API/GetActiveRound";

export default function RoundToCorrect() {
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [enableCorrectionButton, setEnableCorrectionButton] = useState(false);
  const [manualMode, setManualMode] = useState(false);

  //Store
  const addRound = useStore((state) => state.addRoundActive);
  const round = useStore((state) => state.roundActive);

  //First time loading
  useEffect(() => {
    getActiveRound();
    if (EnableCorrection()) {
      setEnableCorrectionButton(true);
    } else {
      setMessage("Automatisk rättning tillgänglig söndag kl 20:00");
    }
  }, []);

  const getActiveRound = async () => {
    const activeRound = await GetActiveRound();
    addRound(activeRound);
  };

  const handleClick = async () => {
    const response = await CorrectionRound();
    if (response.ok) {
      setMessage("Omgången är rättad!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      setMessage("Kunde inte rätta omgången");
      setIsError(true);
      setTimeout(() => {
        setMessage("");
        setIsError(false);
      }, 5000);
    }
  };

  const handleManualMode = () => {
    setManualMode(!manualMode);
  };

  const handleChange = (updatedUser, e) => {
    const newPoints = e.target.value;

    const updatedUsers = round.userDatas.map((player) => {
      if (player.id === updatedUser.id) {
        return {
          ...player,
          points: newPoints,
        };
      }
      return player;
    });

    const newRound = {
      ...round,
      userDatas: updatedUsers,
    };

    addRound(newRound);
  };

  const handleSave = async () => {
    await UpdateRound(round);
    setManualMode(!manualMode);
    getActiveRound();
  };

  return (
    <main>
      {message && (
        <div className={"message" + (isError ? "error" : "")}>{message}</div>
      )}
      <div className="correction-area">
        <button
          type="button"
          onClick={handleClick}
          className={enableCorrectionButton ? "" : "disabled"}
        >
          Automatisk rättning
        </button>
        <button onClick={handleManualMode}>Manuell rättning</button>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Antal poäng</th>
            <th>Namn</th>
          </tr>
        </thead>
        <tbody>
          {round ? (
            round?.userDatas?.map((user) => (
              <tr key={user.id || user.Id}>
                <td>{user.position}</td>
                {manualMode ? (
                  <td>
                    <input
                      className="editedable"
                      value={user.points}
                      type="text"
                      name="userpoints"
                      onChange={(e) => handleChange(user, e)}
                    />
                  </td>
                ) : (
                  <td>{user.points}</td>
                )}
                <td>{user.firstname}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className={manualMode ? "" : "hide"} onClick={handleSave}>
        Spara
      </button>
    </main>
  );
}
