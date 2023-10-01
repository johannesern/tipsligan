/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./UserManager.css";

export default function UserManager({
  roundUserDatas,
  allUserDatas,
  updateUserDatasCallback,
}) {
  // Sample data
  const [addedPlayers, setAddedPlayers] = useState(
    roundUserDatas ? roundUserDatas : []
  );

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

  const filteringPlayers = () => {
    if (addedPlayers) {
      const filteredPlayers = allUserDatas.filter(
        (user) =>
          !addedPlayers.some((addedPlayer) => addedPlayer.id === user.id)
      );
      setAvailablePlayers(filteredPlayers);
    }
  };

  useEffect(() => {
    updateUserDatasCallback(addedPlayers);
    filteringPlayers();
  }, [addedPlayers]);

  return (
    <div className="user-manager">
      <div className="column">
        <h2>Anmälda spelare</h2>
        <ul>
          {addedPlayers ? (
            addedPlayers.map((player) => (
              <li key={player.id}>
                {player.firstname}

                <button onClick={() => handleRemovePlayer(player)}>
                  Ta bort
                </button>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="column">
        <h2>Tillgängliga spelare</h2>
        <ul>
          {availablePlayers ? (
            availablePlayers.map((player) => (
              <li key={player.id}>
                {player.firstname}
                <button onClick={() => handleAddPlayer(player)}>
                  Lägg till
                </button>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
}
