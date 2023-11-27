/* eslint-disable react/prop-types */
import "./RoundUpdateForm.css";
import UpdateRound from "../API/UpdateRound";
import StartDatepicker from "./StartDatePicker";
import EndDatepicker from "./EndDatePicker";
import UserManager from "./UserManager";
import useStore from "../store/useStore";
import { FormattedDate } from "../functions/FormattedDate";
import { useEffect, useState } from "react";

export function RoundUpdateForm({ refreshRounds, closeForm }) {
  const round = useStore((state) => state.roundToUpdate);
  const updateRound = useStore((state) => state.addRoundToUpdate);
  const allRounds = useStore((state) => state.roundsCollection);
  const [error, setError] = useState();

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    if(name === "isOpen" || name === "isActive") {
      const activeRound = allRounds.find((round) => round.isActive === true && round.isOpen === true);
      if (activeRound && activeRound.id !== round.id) {
          setError("Du kan inte ha två aktiva rundor samtidigt");
      }
    }
    const newRound = {
      ...round,
      [name]: value,
    };
    updateRound(newRound);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRound = {
      ...round,
      startDate: FormattedDate(round.startDate),
      endDate: FormattedDate(round.endDate),
    };
    await UpdateRound(newRound);
    refreshRounds();
    closeForm();
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
            <StartDatepicker />
          </label>
          <br />
          <label className="text-color">
            Slutdatum:
            <EndDatepicker />
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
                  value={!round.isOpen}
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
                  value={!round.isOpen}
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
                  value={!round.isActive}
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
                  value={!round.isActive}
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
          {error && <p>{error}</p>}
          <div>
            <UserManager />
          </div>
        </div>
        <button className={`${error ? "disabled" : ""}`} disabled={error} type="submit">Uppdatera rundan</button>
      </form>
    </>
  );
}
