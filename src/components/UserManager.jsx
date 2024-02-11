/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import "./UserManager.css";

import useStore from "../store/useStore";

export default function UserManager() {
  const users = useStore((state) => state.userDataModelsCollection);
  const round = useStore((state) => state.roundToUpdate);
  const updateRound = useStore((state) => state.addRoundToUpdate);
  const [filter, setFilter] = useState("");
  const [filteredRoundUsers, setFilteredRoundUsers] = useState([]);
  const [filteredAvailableUser, setFilteredAvailableUser] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState(null);

  useEffect(() => {
    mainFilter();
  }, [round, filter, paymentFilter]);

  useEffect(() => {
    mainFilter();
  }, []);

  const mainFilter = () => {
    const tmpfilteredRoundUser = round.userDatas?.filter((user) =>
      user.firstname.toLowerCase().includes(filter.toLowerCase())
    );
    const tmpfilteredAvUser = filteringAvailablePlayers().filter((aUser) =>
      aUser.firstname.toLowerCase().includes(filter.toLowerCase())
    );
    if (paymentFilter) {
      const usersHasPaid = tmpfilteredRoundUser?.filter(
        (user) => paymentFilter === user.hasPaid
      );
      setFilteredRoundUsers(usersHasPaid);
    } else if (paymentFilter === false) {
      const usersNotPaid = tmpfilteredRoundUser?.filter(
        (user) => paymentFilter === user.hasPaid
      );
      setFilteredRoundUsers(usersNotPaid);
    } else {
      setFilteredRoundUsers(tmpfilteredRoundUser);
    }
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

  const handlePaymentFilter = (condition) => {
    if (paymentFilter === null || paymentFilter === Boolean.condition) {
      if (condition === "true") {
        setPaymentFilter(true);
      } else {
        setPaymentFilter(false);
      }
    } else {
      setPaymentFilter(null);
    }
  };

  return (
    <div className="user-manager">
      <div className="filter-elements">
        <div>
          <h3 className="text-color">Sök</h3>
          <input
            className="usermanager-input-field"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="paid-and-points">
            <h3 className="text-color">Betalat</h3>
          </div>
          <div className="filter-payment">
            <button
              type="button"
              className={`text-color ${
                paymentFilter === true
                  ? "filter-payment-button-active"
                  : "filter-payment-button"
              }`}
              onClick={() => handlePaymentFilter("true")}
            >
              Ja
            </button>
            <button
              type="button"
              className={`text-color ${
                paymentFilter === false
                  ? "filter-payment-button-active"
                  : "filter-payment-button"
              }`}
              onClick={() => handlePaymentFilter("false")}
            >
              Nej
            </button>
          </div>
        </div>
      </div>
      <div className="users-columns">
        <div className="added-users-column">
          <h2 className="text-color">Anmälda spelare</h2>
          <table>
            {filteredRoundUsers ? (
              filteredRoundUsers.map((player) => (
                <tbody key={player.id}>
                  <tr className="player-row">
                    <td className="table-item-column text-color firstname-min-width">
                      {player.firstname}
                    </td>
                    <td className="table-item-column text-color lastname-min-width">
                      {player.lastname}
                    </td>
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
                    <td className="table-item-column text-color">
                      {player.lastname}
                    </td>
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
    </div>
  );
}
