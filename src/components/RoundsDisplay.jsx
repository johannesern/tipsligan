import { useEffect, useState } from "react";
import GetAllRounds from "../API/GetAllRounds";
import "./RoundsDisplay.css";

const RoundsDisplay = () => {
  const [round, setRound] = useState();
  const noActiveRound = "Ingen aktiv omgång";

  useEffect(() => {
    const getAllRounds = async () => {
      const data = await GetAllRounds();
      console.log("Data:", data);
      setRound(data);
    };
    getAllRounds();
  }, []);

  return (
    <article className="highscore-list">
      {round != null ? (
        <>
          <div>
            <h1>Topplista för denna omgång</h1>
            <table>
              <tr>
                <th>Placering</th>
                <th>Poäng</th>
                <th>Namn</th>
              </tr>
              {round.userId.map((user) => (
                <>
                  <tr>
                    <td key={user}>{user}</td>
                    <td key={user}>testPoäng</td>
                    <td key={user}>testNamn</td>
                  </tr>
                </>
              ))}
            </table>
          </div>
        </>
      ) : (
        <div>{noActiveRound}</div>
      )}
      <ol></ol>
    </article>
  );
};

export default RoundsDisplay;
