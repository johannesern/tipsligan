import { useEffect, useState } from "react";
import GetAllRounds from "../API/GetAllRounds";
import GetAllUsersAsDataModels from "../API/GetAllUsersAsDataModels";
import { DeleteRound } from "../API/DeleteRound";
import { RoundUpdateForm } from "../components/RoundUpdateForm";
import useStore from "../store/useStore";
import "./DisplayAllRounds.css";

const DisplayAllRounds = () => {
  const addUserDataModels = useStore((state) => state.addUserDataModels);
  const addRounds = useStore((state) => state.addRounds);
  const addRoundToUpdate = useStore((state) => state.addRoundToUpdate);
  const rounds = useStore((state) => state.roundsCollection);
  const [deleteThisRound, setDeleteThisRound] = useState("");
  const [openFormIds, setOpenFormIds] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  useEffect(() => {
    getRounds();
    getUserDataModels();
  }, []);

  const refreshRounds = async () => {
    await getRounds();
    await getUserDataModels();
  };

  const getRounds = async () => {
    const allRounds = await GetAllRounds();
    addRounds(allRounds);
  };

  const getUserDataModels = async () => {
    const dataModels = await GetAllUsersAsDataModels();
    addUserDataModels(dataModels);
  };

  const handleToggleForm = (round) => {
    // Check if the clicked round is already open
    if (openFormIds.includes(round.id)) {
      // If it's already open, close it
      setOpenFormIds([]);
    } else {
      // If it's not open, close any open forms first
      setOpenFormIds([round.id]);
      // Set the currently selected round
      addRoundToUpdate(round);
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
                    refreshRounds={refreshRounds}
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
