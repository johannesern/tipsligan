/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import "./UserManager.css";

export default function UserManager() {
  const users = useStore((state) => state.usersDataModelsCollection);
  const round = useStore((state) => state.roundToUpdate);
  const updateRound = useStore((state) => state.addRoundToUpdate);
  const [filter, setFilter] = useState("");
  const [filteredRoundUsers, setFilteredRoundUsers] = useState([]);
  const [filteredAvailableUser, setFilteredAvailableUser] = useState([]);

  const mainFilter = () => {
    const tmpfilteredRoundUser = round.userDatas?.filter((user) =>
      user.firstname.toLowerCase().includes(filter.toLowerCase())
    );
    const tmpfilteredAvUser = filteringAvailablePlayers().filter((aUser) =>
      aUser.firstname.toLowerCase().includes(filter.toLowerCase())
    );
    // console.log("TMPFR", tmpfilteredRoundUser);´
    setFilteredRoundUsers(tmpfilteredRoundUser);
    // console.log("TMPAU", tmpfilteredAvUser);
    setFilteredAvailableUser(tmpfilteredAvUser);
  };

  const filteringAvailablePlayers = () => {
    if (round.userDatas) {
      const tmpAvailablePlayers = users.filter(
        (user) => !round.userDatas.some((player) => player.id === user.id)
      );
      return tmpAvailablePlayers;
    } else {
      return users;
    }
  };

  const handleAddPlayer = (user) => {
    if (round.userDatas === null) {
      round.userDatas = [];
      const newRound = {
        ...round,
        userDatas: [...round.userDatas, user],
      };
      updateRound(newRound);
    } else {
      const newRound = {
        ...round,
        userDatas: [...round.userDatas, user],
      };
      updateRound(newRound);
    }
    mainFilter();
  };

  const handleRemovePlayer = (player) => {
    const newRound = {
      ...round,
      userDatas: round.userDatas.filter((p) => p.id !== player.id),
    };
    updateRound(newRound);
    mainFilter();
  };

  const handlePlayerChange = (updatedPlayer) => {
    const updatedPlayers = round.userDatas.map((player) => {
      if (player.id === updatedPlayer.id) {
        return {
          ...player,
          hasPaid: !player.hasPaid,
        };
      }
      return player;
    });

    const newRound = {
      ...round,
      userDatas: updatedPlayers,
    };

    updateRound(newRound);
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    mainFilter();
  }, []);

  useEffect(() => {
    mainFilter();
  }, [round, filter]);

  return (
    <div className="user-manager">
      <div>
        <h2 className="text-color">Anmälda spelare</h2>
        <table>
          <thead>
            <tr>
              <th className="text-color">Förnamn</th>
              <th className="text-color">Efternamn</th>
              <th className="text-color">Betalat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  className="text-color"
                  type="text"
                  onChange={handleChange}
                />
              </td>
              <td></td>
              <td className="filter-payment">
                <button
                  type="button"
                  className="filter-payment-button text-color"
                >
                  Ja
                </button>
                <button
                  type="button"
                  className="filter-payment-button text-color"
                >
                  Nej
                </button>
              </td>
            </tr>
          </tbody>

          {filteredRoundUsers ? (
            filteredRoundUsers.map((player) => (
              <tbody key={player.id}>
                <tr className="player-row">
                  <td className="table-item-column text-color">
                    {player.firstname}
                  </td>
                  <td className="text-color">Efternamn</td>
                  <td className="table-item-column">
                    <div className="paid-element text-color">
                      {player.hasPaid ? (
                        <>
                          <button type="button">Ja</button>
                          <button
                            type="button"
                            onClick={() => handlePlayerChange(player)}
                            className="unfilled-button"
                          >
                            Nej
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handlePlayerChange(player)}
                            className="unfilled-button"
                          >
                            Ja
                          </button>
                          <button type="button">Nej</button>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="table-item-column">
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(player)}
                    >
                      Ta bort
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <></>
          )}
        </table>
      </div>

      <div>
        <h2 className="text-color">Tillgängliga spelare</h2>
        <table>
          <tbody>
            {filteredAvailableUser ? (
              filteredAvailableUser.map((player) => (
                <tr className="player-row" key={player.id}>
                  <td className="table-item-column text-color">
                    {player.firstname}
                  </td>
                  <td className="table-item-column"></td>
                  <td className="table-item-column">
                    <button
                      type="button"
                      onClick={() => handleAddPlayer(player)}
                    >
                      Lägg till
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
