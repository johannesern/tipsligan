import { useEffect } from "react";
import GetActiveRound from "../API/GetActiveRound";
import "./HighscoreDisplay.css";
import useStore from "../store/useStore";

const HighscoreDisplay = () => {
  const round = useStore((state) => state.roundToUpdate);
  const addRound = useStore((state) => state.addRoundToUpdate);

  const noPlayers = "Inga spelare";
  // console.log("Users:", users);

  useEffect(() => {
    const tmp = async () => {
      getRound();
    };
    tmp();
  }, []);

  const getRound = async () => {
    const activeRound = await GetActiveRound();
    console.log(activeRound);
    addRound(activeRound);
  };

  return (
    <article className="highscore-list">
      <h1>Topplista för denna omgång</h1>
      {round ? (
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
              {round.userDatas?.map((user) => (
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
