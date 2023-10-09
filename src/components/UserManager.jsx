/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./UserManager.css";

export default function UserManager({
  roundUserDatas,
  allUserDatas,
  updateUserDatasCallback,
}) {
  // Sample data
  const [filter, setFilter] = useState("");

  const [addedPlayers, setAddedPlayers] = useState(
    roundUserDatas ? roundUserDatas : []
  );

  const [filteredAddedPlayers, setFilteredAddedPlayers] = useState();

  const [availablePlayers, setAvailablePlayers] = useState(
    allUserDatas ? allUserDatas : []
  );

  const handleAddPlayer = (player) => {
    // Remove player from available players
    const newAvailablePlayers = availablePlayers.filter(
      (p) => p.id !== player.id
    );
    setAvailablePlayers(newAvailablePlayers);

    // Add player to added players
    setAddedPlayers([...addedPlayers, player]);
  };

  const handleRemovePlayer = (player) => {
    // Remove player from added players
    const newAddedPlayers = addedPlayers.filter((p) => p.id !== player.id);
    setAddedPlayers(newAddedPlayers);

    // Add player to available players
    setAvailablePlayers([...availablePlayers, player]);
  };

  const handlePlayerChange = (updatedPlayer) => {
    const updatedPlayers = addedPlayers.map((player) => {
      if (player.id === updatedPlayer.id) {
        return {
          ...player,
          hasPaid: !player.hasPaid, // Update the score for the selected player
        };
      }
      return player; // Return unchanged players
    });

    // Update the state with the new array
    setAddedPlayers(updatedPlayers);
  };

  const filteringAvailablePlayers = () => {
    if (addedPlayers) {
      const filteredPlayers = allUserDatas.filter(
        (user) =>
          !addedPlayers.some((addedPlayer) => addedPlayer.id === user.id)
      );
      setAvailablePlayers(filteredPlayers);
    }
  };

  const updateFilteredPlayers = () => {
    let filteredPlayers;
    if (addedPlayers && filter) {
      filteredPlayers = filteredAddedPlayers.filter((player) => {
        const playerNameLower = player.firstname.toLowerCase();
        const filterLowerCase = filter.toLowerCase();
        return playerNameLower.includes(filterLowerCase);
      }, setAddedPlayers(filteredPlayers));
    } else {
      setAddedPlayers(addedPlayers);
    }
  };

  useEffect(() => {
    console.log("ON MOUNT");
    console.log("FILTERED ADDED:", filteredAddedPlayers);
    updateUserDatasCallback(
      filteredAddedPlayers ? filteredAddedPlayers : addedPlayers
    );
    filteringAvailablePlayers();
  }, [addedPlayers]);

  useEffect(() => {
    // Call the filter function when the filter value changes

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

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
                  value={filter}
                  type="text"
                  onChange={handleChange}
                />
              </td>
              <td>
                <input className="text-color" type="text" />
              </td>
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

          {addedPlayers ? (
            addedPlayers.map((player) => (
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
            {availablePlayers ? (
              availablePlayers.map((player) => (
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

{
  /* <ul className="users-list">
  {addedPlayers ? (
    addedPlayers.map((player) => (
      <li key={player.id}>
        <div className="usermanager-list-item">
          {player.firstname}
          <label>
            <div className="paid-element">
              Betalat:{" "}
              {player.hasPaid ? (
                <>
                  <button>Ja</button>
                  <button className="unfilled-button">Nej</button>
                </>
              ) : (
                <>
                  <button className="unfilled-button">Ja</button>
                  <button>Nej</button>
                </>
              )}
            </div>
          </label>

          <button onClick={() => handleRemovePlayer(player)}>Ta bort</button>
        </div>
      </li>
    ))
  ) : (
    <></>
  )}
</ul>; */

  {
    /* <ul className="users-list">
  {availablePlayers ? (
    availablePlayers.map((player) => (
      <li key={player.id}>
        <div className="usermanager-list-item">
          {player.firstname}
          <button onClick={() => handleAddPlayer(player)}>Lägg till</button>
        </div>
      </li>
    ))
  ) : (
    <></>
  )}
</ul>; */
  }
}
