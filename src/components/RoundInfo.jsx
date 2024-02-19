/* eslint-disable react/prop-types */
import "./RoundInfo.css";

import { useEffect, useState } from "react";
import { GetAllWeekliesByRoundId } from "../API/WeeklysAPI";
import { useParams } from "react-router-dom";
import ListWeeklyResult from "./ListWeeklyResult";

const RoundInfo = () => {
  const { roundid } = useParams();
  const [weekly, setWeekly] = useState();

  useEffect(() => {
    const getWeeklysByRoundId = async (roundId) => {
      const result = await GetAllWeekliesByRoundId(roundId);
      console.log("RESPONSE: ", result);
      const data = await result.json();
      console.log("DATA: ", data);
      setWeekly(data);
    };
    getWeeklysByRoundId(roundid);
  }, []);

  const closeForm = () => {
    setWeekly();
  };

  return (
    <div>
      <br />
      <h1>{weekly?.round?.title || "HEJ"}</h1>
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
        <tbody></tbody>
      </table>
    </div>
  );
};

export default RoundInfo;
