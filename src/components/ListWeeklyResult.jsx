import "./ListWeeklyResult.css";

import { useState, useEffect } from "react";

const ListWeeklyResult = ({ weekly }) => {
  const [weeklyUserResult, setWeeklyUserResult] = useState([]);
  useEffect(() => {
    console.log("LISTWEEKLY: ", weekly?.round?.userDatas);
    setWeeklyUserResult(weekly?.round?.userDatas);
  }, [weekly]);

  const uneven = (index) => {
    return index % 2 === 0;
  };

  return (
    <div>
      <table cellSpacing="0">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Veckans Poäng</th>
            <th>Veckans Position</th>
            <th>Total Poäng</th>
          </tr>
        </thead>
        <tbody>
          {weeklyUserResult?.map((user, index) => (
            <tr
              className={uneven(index) ? `listweeklyresult_darken-row` : ``}
              key={index}
            >
              <td>{user?.firstname}</td>
              <td className="listweeklyresult_center-text">
                {user?.weeklyResult || 0}
              </td>
              <td className="listweeklyresult_center-text">{user?.position}</td>
              <td className="listweeklyresult_center-text">{user?.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListWeeklyResult;
