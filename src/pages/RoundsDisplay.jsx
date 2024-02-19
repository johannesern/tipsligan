import "./RoundsDisplay.css";
import { useEffect, useState } from "react";
import { RoundUpdateForm } from "../components/RoundUpdateForm";
import useStore from "../store/useStore";
import { DeleteRound } from "../API/RoundsAPI";
import { GetAllRounds } from "../API/RoundsAPI";
import { GetAllUsersAsDataModels } from "../API/UsersAPI";

const DisplayAllRounds = () => {
  const addUserDataModels = useStore((state) => state.addUserDataModels);
  const addRounds = useStore((state) => state.addRounds);
  const addRoundToUpdate = useStore((state) => state.addRoundToUpdate);
  const rounds = useStore((state) => state.roundsCollection);
  const [deleteThisRound, setDeleteThisRound] = useState("");
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [round, setRound] = useState();

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
    console.log(allRounds.length, "allRounds");
    addRounds(allRounds);
  };

  const getUserDataModels = async () => {
    const dataModels = await GetAllUsersAsDataModels();
    addUserDataModels(dataModels);
  };

  const handleToggleForm = (round) => {
    addRoundToUpdate(round);
    setRound(round);
  };

  const closeForm = () => {
    setRound(null);
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
    <main className="roundsdisplay_main-content">
      {isConfirmationVisible && (
        <>
          <div className="roundsdisplay_confirmation-buttons">
            <div>
              <h2>Vill du verkligen radera?</h2>
            </div>
            <div className="roundsdisplay_confirmation-buttons--btndiv">
              <button onClick={() => handleConfirm("true")}>Ja</button>
              <button onClick={() => handleConfirm("false")}>Nej</button>
            </div>
          </div>
        </>
      )}
      {round && (
        <>
          <div className="roundsdisplay_form-overlay">
            <RoundUpdateForm
              closeForm={closeForm}
              refreshRounds={refreshRounds}
            />
          </div>
        </>
      )}
      <table className="roundsdisplay_table-content">
        <tbody>
          {rounds.length > 0 ? (
            rounds
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((round) => (
                <tr
                  onClick={() => handleToggleForm(round)}
                  className="roundsdisplay_rounds-list-item"
                  key={round.id}
                >
                  <td className="roundsdisplay_row-title">
                    <h3>{round.title}</h3>
                    <h3>{round.isActive ? "<- aktiv" : ""}</h3>
                  </td>
                  <td className="roundsdisplay_list-button">
                    <button name="edit" onClick={() => handleToggleForm(round)}>
                      Ändra
                    </button>
                    <button
                      name="delete"
                      onClick={(e) => {
                        handleDeleteClick(round.id);
                        e.stopPropagation();
                      }}
                    >
                      Ta bort
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td>Inga rundor</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default DisplayAllRounds;
