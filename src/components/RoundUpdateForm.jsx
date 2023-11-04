/* eslint-disable react/prop-types */
import "./RoundUpdateForm.css";
import UpdateRound from "../API/UpdateRound";
import StartDatepicker from "./datepicker/StartDatepicker";
import EndDatepicker from "./datepicker/EndDatePicker";
import UserManager from "./UserManager";
import useStore from "../store/useStore";
import { FormattedDate } from "../functions/FormattedDate";

export function RoundUpdateForm({ refreshRounds, closeForm }) {
  const round = useStore((state) => state.roundToUpdate);
  const updateRound = useStore((state) => state.addRoundToUpdate);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
          <div>
            <UserManager />
          </div>
        </div>
        <button type="submit">Uppdatera rundan</button>
      </form>
    </>
  );
}
