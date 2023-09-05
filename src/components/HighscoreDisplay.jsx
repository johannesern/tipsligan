import { useEffect, useState } from "react";
import GetAllRounds from "../API/GetAllRounds";
import "./HighscoreDisplay.css";

const HighscoreDisplay = () => {
  const [users, setUsers] = useState();
  const [usersLength, setUsersLength] = useState(0);
  const noPlayers = "Inga spelare";
  // console.log("Users:", users);

  useEffect(() => {
    const getAllRounds = async () => {
      const data = await GetAllRounds();
      // console.log("Data:", data);
      setUsers(data.users);
      setUsersLength(data.users.length);
      // console.log("Users display:", data.users);
    };
    getAllRounds();
  }, []);

  return (
    <article className="highscore-list">
      <h1>Topplista för denna omgång</h1>
      {usersLength != 0 ? (
        <div>
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
      ) : (
        <>
          <br />
          <div>{noPlayers}</div>
        </>
      )}
    </article>
  );
};

export default HighscoreDisplay;
