import { useEffect } from "react";
import useStore from "../store/useStore";

import "./HighscoreDisplay.css";

import { GetActiveRound } from "../API/RoundsAPI";

const HighscoreDisplay = () => {
  //Store
  const round = useStore((state) => state.roundActive);
  const addRound = useStore((state) => state.addRoundActive);
  const addWeeklySnapshot = useStore((state) => state.addWeeklySnapshot);
  const weeklySnapshot = useStore((state) => state.weeklySnapshot);

  useEffect(() => {
    getRound();
  }, []);

  const getRound = async () => {
    const activeRoundResponse = await GetActiveRound();
    if (activeRoundResponse.ok) {
      const data = await activeRoundResponse.json();
      addRound(data);
    } else {
      console.error("Topplista: Kunde inte hämta aktiv runda");
    }
    addWeeklySnapshot(weeklySnapshot);
  };

  return (
    <>
      <article>
        <p>Välkommen till Tipsligan!</p>
        <p>Här nedanför ser du topplistan för pågående omgång </p>
      </article>
      <article className="highscore-list">
        <div className="highscore-area">
          {/* <div className="table-layout">
          <h1>Veckans resultat</h1>
          {weeklySnapshot.id !== null ? (
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
                  {weeklySnapshot?.weeklyUserResults?.map((user) => (
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
            <div>Inget</div>
          )}
        </div> */}
          {round.id !== null && (
            <div className="table-layout">
              <h1>Topplista total</h1>
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
                        <td className="column">{user.points || 0}</td>
                        <td className="column">{user.firstname}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default HighscoreDisplay;
