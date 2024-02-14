/* eslint-disable react/prop-types */
import "./RoundInfo.css";

import { useEffect, useState } from "react";
import { GetAllWeeklysByRoundId } from "../API/WeeklysAPI";
import { useParams } from "react-router-dom";
import ListWeeklyResult from "./ListWeeklyResult";

const RoundInfo = () => {
  const { roundid } = useParams();
  const [roundInfo, setRoundInfo] = useState([]);
  const [weekly, setWeekly] = useState();

  useEffect(() => {
    const getWeeklysByRoundId = async (roundId) => {
      const result = await GetAllWeeklysByRoundId(roundId);
      const data = await result.json();
      setRoundInfo(data);
    };
    getWeeklysByRoundId(roundid);
  }, []);

  const closeForm = () => {
    setWeekly();
  };

  return (
    <div>
      <br />
      <h1>{roundInfo[0]?.round?.title || "HEJ"}</h1>
      {weekly && (
        <>
          <div className="roundinfo_form-overlay">
            <div className="roundinfo_modal-content">
              <div
                className="roundinfo_close"
                type="button"
                onClick={closeForm}
              />
              <div className="roundinfo_round-content--header">
                <h3>Veckans resultat</h3>
              </div>
              <div>
                <ListWeeklyResult weekly={weekly} />
              </div>
            </div>
          </div>
        </>
      )}
      <table>
        <tbody>
          {roundInfo.map((weeklyRound, index) => (
            <tr key={index}>
              <td
                className="roundinfo_list-item"
                onClick={() => setWeekly(weeklyRound)}
              >
                - Vecka {index + 1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoundInfo;
