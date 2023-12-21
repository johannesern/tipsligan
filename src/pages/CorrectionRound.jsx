import { useState, useEffect } from "react";
import "./CorrectionRound.css";
import { EnableCorrection } from "../functions/EnableCorrection";
import CorrectionRound from "../API/CorrectionRound";
import useStore from "../store/useStore";
import UpdateRound from "../API/UpdateRound";
import GetActiveRound from "../API/GetActiveRound";
import Coupon from "../components/Coupon";
import { FormattedDate } from "../functions/FormattedDate";

export default function RoundToCorrect() {
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [enableCorrectionButton, setEnableCorrectionButton] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [semiautoMode, setSemiAutoMode] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [coupon, setCoupon] = useState([]);

  //Store
  const addRound = useStore((state) => state.addRoundActive);
  const round = useStore((state) => state.roundActive);
  const clearActiveRound = useStore((state) => state.clearRoundActive);

  //First time loading
  useEffect(() => {
    getActiveRound();
    if (EnableCorrection()) {
      setEnableCorrectionButton(true);
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
      getActiveRound();
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

  const handleSemiAutoMode = () => {
    setAutoMode(false);
    setSemiAutoMode(!semiautoMode);
    if (manualMode) {
      setManualMode(false);
    }
  };

  const handleManualMode = () => {
    setAutoMode(false);
    setManualMode(!manualMode);
    if (semiautoMode) {
      setSemiAutoMode(false);
    }
  };

  useEffect(() => {
    if (!manualMode && !semiautoMode) {
      setAutoMode(true);
    }
  }, [manualMode, semiautoMode, autoMode]);

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

  const handleManualSave = async () => {
    const now = new Date();
    const newdate = FormattedDate(now.toString());
    const newRound = {
      ...round,
      correctedAt: newdate,
    };
    clearActiveRound;
    addRound(newRound);
    await UpdateRound(newRound);
    setManualMode(!manualMode);
    getActiveRound();
  };

  const handleSemiSave = async () => {
    const now = new Date();
    const newdate = FormattedDate(now.toString());

    const newUserDatas = round.userDatas;
    newUserDatas.forEach((user) => {
      for (let i = 0; i < coupon.length; i++) {
        if (user.coupon[i] === coupon[i]) {
          user.points += 1;
        }
      }
    });

    const newRound = {
      ...round,
      userDatas: newUserDatas,
      correctedAt: newdate,
    };
    clearActiveRound;
    addRound(newRound);
    await UpdateRound(newRound);
    setSemiAutoMode(false);
    getActiveRound();
  };

  return (
    <main>
      {round.correctedAt && (
        <div className="corrected-date">
          Rättades senast den {round.correctedAt}
        </div>
      )}

      <div className="correction-area">
        <button
          type="button"
          onClick={handleClick}
          className={enableCorrectionButton ? "" : "disabled"}
          disabled={!enableCorrectionButton}
        >
          Automatisk rättning
        </button>
        <button onClick={handleSemiAutoMode}>Semi Automatisk</button>
        <button onClick={handleManualMode}>Manuell rättning</button>
        {message && (
          <div className={"message" + (isError ? "error" : "")}>{message}</div>
        )}
      </div>
      {enableCorrectionButton && (
        <div className={"message" + (isError ? "error" : "")}>
          Automatisk rättning är blockerad tills alla matcher är spelade
        </div>
      )}
      {autoMode && (
        <p>
          <i>
            Automatisk rättning hämtar senaste resultatet från Svenska Spel och
            uppdaterar alla spelares poäng
          </i>
        </p>
      )}
      {semiautoMode && (
        <p>
          <i>
            Semi Automatisk rättning: Fyll i rätt rad och klicka på Rätta, alla
            spelares poäng kommer att uppdateras
          </i>
        </p>
      )}
      {manualMode && (
        <p>
          <i>
            Manuell rättning: Rätta en eller flera spelares poäng och klicka
            sedan på Spara
          </i>
        </p>
      )}
      {!semiautoMode && !manualMode}
      <div className="mid-content">
        <div>
          <table name="total">
            <thead>
              <tr>
                <th>Position</th>
                <th>Poäng</th>
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
        </div>
        {semiautoMode && (
          <div className="coupon-correction">
            <Coupon setCouponSelections={setCoupon} />
            <button onClick={handleSemiSave}>Rätta</button>
          </div>
        )}
      </div>
      {manualMode && <button onClick={handleManualSave}>Spara</button>}
    </main>
  );
}
