import { useEffect, useState } from "react";
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

  //First time loading
  useEffect(() => {
    getRounds();
  }, []);

  const getRounds = async () => {
    const allRounds = await GetAllRounds();
    setRounds(allRounds);
  };

  const updateRound = (round) => {
    setRound(round);
  };

  const updateRoundsInList = async () => {
    await getRounds();
  };

  useEffect(() => {}, [rounds]);

  //Handle functions
  const handleToggleForm = (round) => {
    if (openFormIds.includes(round.id)) {
      setOpenFormIds(openFormIds.filter((id) => id !== round.id));
    } else {
      setOpenFormIds([...openFormIds, round.id]);
      updateRound(round);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteThisRound(id);
    setIsConfirmationVisible(!isConfirmationVisible);
  };

  const handleConfirm = async (remove) => {
    if (remove === "true") {
      await DeleteRound(deleteThisRound);
      setIsConfirmationVisible(!isConfirmationVisible);
      await getRounds();
    }

    setIsConfirmationVisible(!isConfirmationVisible);
  };

  return (
    <main>
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
                <RoundUpdateForm
                  updateRound={round}
                  updateRoundsInList={updateRoundsInList}
                />
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
