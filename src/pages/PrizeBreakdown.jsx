import "./PrizeBreakdown.css";
import { useState, useEffect } from "react";
import { GetSettings } from "../API/SettingsAPI";
import { GetActiveRound } from "../API/RoundsAPI";

export default function PrizeBreakdown() {
  const [settings, setSettings] = useState({});
  const [activeRound, setActiveRound] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const settings = await GetSettings();
      const activeRoundResponse = await GetActiveRound();
      if (activeRoundResponse.ok) {
        const data = await activeRoundResponse.json();
        setActiveRound(data);
      } else {
        console.error("Vinstfördelning: Kunde inte hämta aktiv runda");
      }
      setSettings(settings[0]);
    };
    loadData();
  }, []);

  //find all users with position 1, 2 and 3 in activeround userdatas
  const findAllWinners = () => {
    const winners = [];
    activeRound?.userDatas?.forEach((userdata) => {
      if (
        userdata.position === 1 ||
        userdata.position === 2 ||
        userdata.position === 3
      ) {
        winners.push(userdata);
      }
    });
    return winners;
  };

  const getAllFirsts = () => {
    const firsts = [];
    findAllWinners().forEach((userdata) => {
      if (userdata.position === 1) {
        firsts.push(userdata);
      }
    });
    return firsts;
  };

  const getAllSeconds = () => {
    const seconds = [];
    findAllWinners().forEach((userdata) => {
      if (userdata.position === 2) {
        seconds.push(userdata);
      }
    });
    return seconds;
  };

  const getAllThirds = () => {
    const thirds = [];
    findAllWinners().forEach((userdata) => {
      if (userdata.position === 3) {
        thirds.push(userdata);
      }
    });
    return thirds;
  };

  //calculate winnerShare with settings winnerShare and prizePool, then divide with winners.length. calculate secondShare and thirdShare with same method
  const calculateWinnerShare = () => {
    const winners = findAllWinners()?.filter(
      (allWinners) => allWinners.position === 1
    );
    // const winnerSharePool = prizePool * (settings.winnerShare / 100);
    return settings.winnerShare / winners.length;
  };

  const calculateSecondShare = () => {
    const seconds = findAllWinners()?.filter(
      (allWinners) => allWinners.position === 2
    );
    return settings.secondShare / seconds.length;
  };

  const calculateThirdShare = () => {
    const thirds = findAllWinners()?.filter(
      (allWinners) => allWinners.position === 3
    );
    return settings.thirdShare / thirds.length;
  };

  return (
    <div>
      <br />
      {findAllWinners()?.length > 0 ? (
        <>
          <h2>Vinstfördelning</h2>

          {getAllFirsts()?.length > 0 ? (
            <>
              <h3>Första plats</h3>
              <div className="layout-align">
                <div>
                  {getAllFirsts()?.map((winner) => (
                    <div key={winner.id}>{winner.firstname}</div>
                  ))}
                </div>
                <div>
                  {getAllFirsts()?.map((winner) => (
                    <div key={winner.id}>
                      <div>{calculateWinnerShare()} kr</div>
                    </div>
                  ))}
                </div>
              </div>
              <br />
            </>
          ) : (
            <>
              <div>Ingen på första plats</div>
              <br />
            </>
          )}

          {getAllSeconds()?.length > 0 ? (
            <>
              <h3>Andra plats</h3>
              <div className="layout-align">
                <div>
                  {getAllSeconds()?.map((winner) => (
                    <div key={winner.id}>{winner.firstname}</div>
                  ))}
                </div>
                <div>
                  {getAllSeconds()?.map((winner) => (
                    <div key={winner.id}>
                      <div>{calculateSecondShare()} kr</div>
                    </div>
                  ))}
                </div>
              </div>
              <br />
            </>
          ) : (
            <>
              <div>Ingen på andra plats</div>
              <br />
            </>
          )}

          {getAllThirds()?.length > 0 ? (
            <>
              <h3>Tredje plats</h3>
              <div className="layout-align">
                <div>
                  {getAllThirds()?.map((winner) => (
                    <div key={winner.id}>{winner.firstname}</div>
                  ))}
                </div>
                <div>
                  {getAllThirds()?.map((winner) => (
                    <div key={winner.id}>
                      <div>{calculateThirdShare()} kr</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>Ingen på tredje plats</div>
            </>
          )}
        </>
      ) : (
        <>Fel vid inläsning av data</>
      )}
      <div></div>
    </div>
  );
}
