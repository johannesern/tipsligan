import { useEffect, useState } from "react";
import GetAllRounds from "../API/GetAllRounds";
import "./HighscoreDisplay.css";

const HighscoreDisplay = () => {
  const [users, setUsers] = useState();
  const noActiveRound = "Ingen aktiv omgång";
  // console.log("Users:", users);

  useEffect(() => {
    const getAllRounds = async () => {
      const data = await GetAllRounds();
      // console.log("Data:", data);
      setUsers(data.users);
      // console.log("Roundsdisplay:", data.users);
    };
    getAllRounds();
  }, []);

  return (
    <article className="highscore-list">
      {users != null ? (
        <>
          <div>
            <h1>Topplista för denna omgång</h1>
            <table>
              <thead>
                <tr>
                  <th className="position-column">Placering</th>
                  <th className="column">Poäng</th>
                  <th className="column">Namn</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="position-column">{user.position}</td>
                    <td className="column">{user.points}</td>
                    <td className="column">{user.firstname}</td>
                  </tr>
                ))}
              </tbody>
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

export default HighscoreDisplay;
