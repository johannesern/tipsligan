import { useState, useEffect } from "react";
import "./CorrectionRound.css";
import { EnableCorrection } from "../functions/EnableCorrection";
import CorrectionRound from "../API/CorrectionRound";
import useStore from "../store/useStore";
import UpdateRound from "../API/UpdateRound";
import GetActiveRound from "../API/GetActiveRound";
import Coupon from "../components/Coupon";

export default function RoundToCorrect() {
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [enableCorrectionButton, setEnableCorrectionButton] = useState(false);
  const [semiauto, setSemiAuto] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [coupon, setCoupon] = useState([]);

  //Store
  const addRound = useStore((state) => state.addRoundActive);
  const round = useStore((state) => state.roundActive);

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
    setManualMode(false);
    setSemiAuto(!semiauto);
  };

  const handleManualMode = () => {
    setSemiAuto(false);
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

  // useEffect(() => {
  //   console.log(coupon);
  // }, [coupon]);

  const handleSemiCorrection = async () => {
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
    };

    addRound(newRound);
    await UpdateRound(round);
    setSemiAuto(false);
    getActiveRound();
  };

  return (
    <main>
      {!enableCorrectionButton && (
        <div className={"message" + (isError ? "error" : "")}>
          Automatisk rättning tillgänglig på söndag kl 20:00
        </div>
      )}
      <div className="correction-area">
        <button
          type="button"
          onClick={handleClick}
          className={enableCorrectionButton ? "" : "disabled"}
        >
          Automatisk rättning
        </button>
        <button onClick={handleSemiAutoMode}>Semi Automatisk</button>
        <button onClick={handleManualMode}>Manuell rättning</button>
      </div>
      {semiauto && (
        <p>
          <i>
            Knappa in rätt rad och klicka på Rätta, alla spelares poäng kommer
            att uppdateras
          </i>
        </p>
      )}
      {manualMode && (
        <p>
          <i>Rätta en eller flera spelares poäng och klicka sedan på Spara</i>
        </p>
      )}
      {!semiauto && !manualMode && <br />}
      <div className="mid-content">
        <div>
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
        </div>
        {semiauto && (
          <div className="coupon-correction">
            <Coupon setCouponSelections={setCoupon} />
            <button onClick={handleSemiCorrection}>Rätta</button>
          </div>
        )}
      </div>
      {manualMode && <button onClick={handleSave}>Spara</button>}
    </main>
  );
}
