import { useState } from "react";
import GetAllRounds from "../API/GetAllRounds";
import { DeleteRound } from "../API/DeleteRound";
import { RoundUpdateForm } from "../components/RoundUpdateForm";
import "./DisplayAllRounds.css";

const DisplayAllRounds = () => {
  const [deleteThisRound, setDeleteThisRound] = useState("");
  const [rounds, setRounds] = useState([]);
  const [round, setRound] = useState("");
  const [openFormIds, setOpenFormIds] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleFetchRounds = async () => {
    const allRounds = await GetAllRounds();
    console.log("ALL ROUNDS:", allRounds);
    setRounds(allRounds);
  };

  const handleToggleForm = (round) => {
    if (openFormIds.includes(round.id)) {
      setOpenFormIds(openFormIds.filter((id) => id !== round.id));
    } else {
      setOpenFormIds([...openFormIds, round.id]);
      incomingRound(round);
    }
  };

  const incomingRound = (round) => {
    setRound(round);
  };

  const handleDeleteClick = (id) => {
    setDeleteThisRound(id);
    setIsConfirmationVisible(!isConfirmationVisible);
  };

  const handleConfirm = async (remove) => {
    if (remove === "true") {
      await DeleteRound(deleteThisRound);
      setIsConfirmationVisible(!isConfirmationVisible);
    }

    setIsConfirmationVisible(!isConfirmationVisible);
  };

  return (
    <main>
      <button onClick={handleFetchRounds}>Hämta rundor</button>
      {isConfirmationVisible && (
        <>
          <div className="confirmation-buttons">
            <button onClick={() => handleConfirm("true")}>Ja</button>
            <button onClick={() => handleConfirm("false")}>Nej</button>
          </div>
        </>
      )}
      <ul>
        {rounds != null ? (
          rounds.map((round) => (
            <li className="list-item" key={round.id}>
              {" "}
              <h3>{round.title}</h3>
              {openFormIds.includes(round.id) && (
                <RoundUpdateForm incomingRound={round} />
              )}
              <div className="user-buttons">
                <button name="edit" onClick={() => handleToggleForm(round)}>
                  Ändra
                </button>
                <button
                  name="delete"
                  onClick={() => handleDeleteClick(round.id)}
                >
                  Ta bort
                </button>
              </div>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </main>
  );
};

export default DisplayAllRounds;
