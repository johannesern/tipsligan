/* eslint-disable react/prop-types */
import { useState } from "react";

import "./RoundUpdateForm.css";

import DatePicker from "react-datepicker";

import "./Datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

import UserManager from "./UserManager";
import useStore from "../store/useStore";

import { UpdateRound } from "../API/RoundsAPI";

export function RoundUpdateForm({ refreshRounds, closeForm }) {
  const round = useStore((state) => state.roundToUpdate);
  const updateRound = useStore((state) => state.addRoundToUpdate);
  const [error, setError] = useState();

  const handleChange = (e) => {
    setError("");
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
      start_date: round.start_date,
      end_date: round.end_date,
    };
    const response = await UpdateRound(newRound);
    if (!response.ok) {
      setError("Kunde inte uppdatera rundan");
      return;
    } else {
      refreshRounds();
      closeForm();
    }
  };

  return (
    <>
      <div className="roundupdate_modal-content">
        <h2 className="roundupdate_text-color-black">Omgångens data</h2>
        <div className="roundupdate_close" type="button" onClick={closeForm} />
        <form className="roundupdate_form" onSubmit={handleSubmit}>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label className="roundupdate_text-color-black">
                      Titel:
                    </label>
                  </td>
                  <td>
                    <input
                      className="roundupdate_round-update-field"
                      value={round.title}
                      type="text"
                      name="title"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="roundupdate_text-color-black">
                      Startdatum:
                    </label>
                  </td>
                  <td>
                    <DatePicker
                      selected={new Date(round.start_date)}
                      onChange={handleChange}
                      dateFormat="yyyy-MM-dd"
                      className="datepicker"
                      name="start_date"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="roundupdate_text-color-black">
                      Slutdatum:
                    </label>
                  </td>
                  <td>
                    <DatePicker
                      selected={
                        round.end_date
                          ? new Date(round.end_date)
                          : new Date(round.start_date)
                      }
                      onChange={handleChange}
                      dateFormat="yyyy-MM-dd"
                      className="datepicker"
                      name="end_date"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="roundupdate_text-color-black">
                      Öppen för registrering:
                    </label>
                  </td>
                  <td>
                    {round.is_open ? (
                      <>
                        <button type="button">Ja</button>
                        <button
                          type="button"
                          name="is_open"
                          value={!round.is_open}
                          onClick={() =>
                            handleChange({
                              target: { name: "is_open", value: false },
                            })
                          }
                          className="roundupdate_unfilled-button"
                        >
                          Nej
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          name="is_open"
                          value={!round.is_open}
                          onClick={() =>
                            handleChange({
                              target: { name: "is_open", value: true },
                            })
                          }
                          className="roundupdate_unfilled-button"
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
                    <label className="roundupdate_text-color-black">
                      Runda är aktiv:
                    </label>
                  </td>
                  <td>
                    {round.is_active ? (
                      <>
                        <button type="button">Ja</button>
                        <button
                          type="button"
                          name="is_active"
                          value={!round.is_active}
                          onClick={() =>
                            handleChange({
                              target: { name: "is_active", value: false },
                            })
                          }
                          className="roundupdate_unfilled-button"
                        >
                          Nej
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          name="is_active"
                          value={!round.is_active}
                          onClick={() =>
                            handleChange({
                              target: { name: "is_active", value: true },
                            })
                          }
                          className="roundupdate_unfilled-button"
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
            <div className="roundupdate_divider" />
            <h2 className="roundupdate_text-color-black">Spelardata</h2>
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
