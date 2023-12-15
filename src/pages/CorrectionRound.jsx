import { useState, useEffect } from "react";
import GetActiveRound from "../API/GetActiveRound";
import "./CorrectionRound.css";
import { EnableCorrection } from "../functions/EnableCorrection";
import CorrectionRound from "../API/CorrectionRound";

const Userdisplay = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [enableCorrectionButton, setEnableCorrectionButton] = useState(true);

  //First time loading
  useEffect(() => {
    userDatas();
    if (EnableCorrection()) {
      setEnableCorrectionButton(true);
    }
  }, []);

  const userDatas = async () => {
    const round = await GetActiveRound();
    setUsers(round.userDatas);
  };

  const handleClick = async () => {
    const response = await CorrectionRound();
    if (response.ok) {
      console.log("success", response);
      setMessage("Omgången är rättad!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      console.log("error", response);
      setMessage("Kunde inte rätta omgången");
      setIsError(true);
      setTimeout(() => {
        setMessage("");
        setIsError(false);
      }, 5000);
    }
    userDatas();
  };

  useEffect(() => {}, [users]);

  return (
    <main>
      <div className="correction-area">
        <button
          type="button"
          onClick={handleClick}
          className={enableCorrectionButton ? "" : "disabled"}
        >
          Rätta omgång
        </button>
        {message && (
          <div className={"message" + (isError ? "error" : "")}>{message}</div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Antal poäng</th>
            <th>Namn</th>
          </tr>
        </thead>
        <tbody>
          {users != null ? (
            users.map((user) => (
              <tr key={user.id || user.Id}>
                <td>{user.position}</td>
                <td>{user.points}</td>
                <td>{user.firstname}</td>
              </tr>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Userdisplay;
