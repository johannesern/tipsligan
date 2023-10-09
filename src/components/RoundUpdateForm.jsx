/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./RoundUpdateForm.css";
import UpdateRound from "../API/UpdateRound";
import { FormattedDate } from "../functions/FormattedDate";
import StartDatepicker from "./DatePicker/StartDatePicker";
import EndDatepicker from "./datePicker/EndDatePicker";
import UserManager from "./UserManager";

export function RoundUpdateForm({
  updateRound,
  updateRoundsInList,
  allUserDatas,
  closeForm,
}) {
  const [responseFromUpdate, setResponseFromUpdate] = useState();
  const [round, setRound] = useState({
    id: updateRound.id,
    title: updateRound.title,
    startDate: updateRound.startDate,
    endDate: updateRound.endDate,
    userDatas: updateRound.userDatas,
    isActive: updateRound.isActive,
    isOpen: updateRound.isOpen,
    periodInWeeks: updateRound.periodInWeeks,
  });

  const getStartDate = (childStartDate) => {
    setRound({
      ...round,
      startDate: FormattedDate(childStartDate),
    });
  };

  const getEndDate = (childEndDate) => {
    setRound({
      ...round,
      endDate: FormattedDate(childEndDate),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRound((prevState) => ({ ...prevState, [name]: value }));
    updateRoundsInList(round);
  };

  const handleUpdateUserDatas = (updatedUserDatas) => {
    // Update the updateRound.userDatas prop in the parent component
    setRound({
      ...round,
      userDatas: updatedUserDatas,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseFromUpdate(await UpdateRound(round));
    closeForm();
    updateRoundsInList(round);
  };

  return (
    <>
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="close" type="button" onClick={closeForm}></div>
        <div>
          <label className="text-color">
            Titel:
            <input
              className="text-color"
              value={round.title}
              type="text"
              name="title"
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="text-color">
            Startdatum:
            <StartDatepicker getStartDate={getStartDate} />
          </label>
          <br />
          <label className="text-color">
            Slutdatum:
            <EndDatepicker getEndDate={getEndDate} />
          </label>
          <br />
          <div className="round-open-element text-color">
            Öppen för registrering:{" "}
            {round.isOpen ? (
              <>
                <button type="button">Ja</button>
                <button
                  type="button"
                  name="isOpen"
                  value={!updateRound.isOpen}
                  onClick={() =>
                    handleChange({ target: { name: "isOpen", value: false } })
                  }
                  className="unfilled-button"
                >
                  Nej
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  name="isOpen"
                  value={!updateRound.isOpen}
                  onClick={() =>
                    handleChange({ target: { name: "isOpen", value: true } })
                  }
                  className="unfilled-button"
                >
                  Ja
                </button>
                <button type="button">Nej</button>
              </>
            )}
          </div>
          <div className="round-active-element text-color">
            Runda är aktiv:{" "}
            {round.isActive ? (
              <>
                <button type="button">Ja</button>
                <button
                  type="button"
                  name="isActive"
                  value={!updateRound.isActive}
                  onClick={() =>
                    handleChange({ target: { name: "isActive", value: false } })
                  }
                  className="unfilled-button"
                >
                  Nej
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  name="isActive"
                  value={!updateRound.isActive}
                  onClick={() =>
                    handleChange({ target: { name: "isActive", value: true } })
                  }
                  className="unfilled-button"
                >
                  Ja
                </button>
                <button type="button">Nej</button>
              </>
            )}
          </div>
          <div>
            <UserManager
              roundUserDatas={updateRound.userDatas}
              allUserDatas={allUserDatas}
              updateUserDatasCallback={handleUpdateUserDatas}
            />
          </div>
        </div>
        <button type="submit">Uppdatera rundan</button>
      </form>
    </>
  );
}
