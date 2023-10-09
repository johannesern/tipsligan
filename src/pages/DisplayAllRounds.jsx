import { useEffect, useState } from "react";
import GetAllRounds from "../API/GetAllRounds";
import GetAllUsersAsDataModels from "../API/GetAllUsersAsDataModels";
import { DeleteRound } from "../API/DeleteRound";
import { RoundUpdateForm } from "../components/RoundUpdateForm";
import "./DisplayAllRounds.css";

const DisplayAllRounds = () => {
  const [deleteThisRound, setDeleteThisRound] = useState("");
  const [rounds, setRounds] = useState([]);
  const [round, setRound] = useState("");
  const [allUserDataModels, setAllUserDataModels] = useState([]);
  const [openFormIds, setOpenFormIds] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  //First time loading
  useEffect(() => {
    getRounds();
    getUserDataModels();
  }, []);

  const getRounds = async () => {
    const allRounds = await GetAllRounds();
    setRounds(allRounds);
  };

  const getUserDataModels = async () => {
    const allUserDataModels = await GetAllUsersAsDataModels();
    if (allUserDataModels) {
      setAllUserDataModels(allUserDataModels);
    }
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

  const closeForm = () => {
    setOpenFormIds([]);
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
      <ul className="rounds-list">
        {rounds != null ? (
          rounds.map((round) => (
            <li className="rounds-list-item" key={round.id}>
              {" "}
              <h3>{round.title}</h3>
              {openFormIds.includes(round.id) && (
                <div className="form-overlay">
                  <RoundUpdateForm
                    closeForm={closeForm}
                    updateRound={round}
                    updateRoundsInList={updateRoundsInList}
                    allUserDatas={allUserDataModels}
                  />
                </div>
              )}
              <div className="round-buttons">
                <button
                  name="edit"
                  className="round-button"
                  onClick={() => handleToggleForm(round)}
                >
                  Ändra
                </button>
                <button
                  name="delete"
                  className="round-button"
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
