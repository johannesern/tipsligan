/* eslint-disable react/prop-types */
import { useState } from "react";

import "./RoundUpdateForm.css";

import UserManager from "./UserManager";
import useStore from "../store/useStore";
import EndDatepicker from "./EndDatePicker";
import StartDatepicker from "./StartDatePicker";

import { UpdateRound } from "../API/RoundsAPI";

export function RoundUpdateForm({ refreshRounds, closeForm }) {
  const round = useStore((state) => state.roundToUpdate);
  const updateRound = useStore((state) => state.addRoundToUpdate);
  const allRounds = useStore((state) => state.roundsCollection);
  const [error, setError] = useState();

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    if (name === "isOpen" || name === "isActive") {
      const activeRound = allRounds.find(
        (round) => round.isActive === true && round.isOpen === true
      );
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
      startDate: round.startDate,
      endDate: round.endDate,
    };
    await UpdateRound(newRound);
    refreshRounds();
    closeForm();
  };

  return (
    <>
      <div className="modal-content">
        <h2 className="text-color-black">Omgångens data</h2>
        <div className="close" type="button" onClick={closeForm} />
        <form className="roundupdate_form" onSubmit={handleSubmit}>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label className="text-color-black">Titel:</label>
                  </td>
                  <td>
                    <input
                      className="round-update-field"
                      value={round.title}
                      type="text"
                      name="title"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="text-color-black">Startdatum:</label>
                  </td>
                  <td>
                    <StartDatepicker />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="text-color-black">Slutdatum:</label>
                  </td>
                  <td>
                    <EndDatepicker />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="text-color-black">
                      Öppen för registrering:
                    </label>
                  </td>
                  <td>
                    {round.isOpen ? (
                      <>
                        <button type="button">Ja</button>
                        <button
                          type="button"
                          name="isOpen"
                          value={!round.isOpen}
                          onClick={() =>
                            handleChange({
                              target: { name: "isOpen", value: false },
                            })
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
                            handleChange({
                              target: { name: "isOpen", value: true },
                            })
                          }
                          className="unfilled-button"
                        >
                          Ja
                        </button>
                        <button type="button">Nej</button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="text-color-black">Runda är aktiv:</label>
                  </td>
                  <td>
                    {round.isActive ? (
                      <>
                        <button type="button">Ja</button>
                        <button
                          type="button"
                          name="isActive"
                          value={!round.isActive}
                          onClick={() =>
                            handleChange({
                              target: { name: "isActive", value: false },
                            })
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
                            handleChange({
                              target: { name: "isActive", value: true },
                            })
                          }
                          className="unfilled-button"
                        >
                          Ja
                        </button>
                        <button type="button">Nej</button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="divider" />
            <h2 className="text-color-black">Spelardata</h2>
            <div>
              {error && <p>{error}</p>}
              <div>
                <UserManager />
              </div>
            </div>
          </div>
          <button
            className={`roundupdate_update-btn ${error ? "disabled" : ""}`}
            disabled={error}
            type="submit"
          >
            Uppdatera rundan
          </button>
        </form>
      </div>
    </>
  );
}
