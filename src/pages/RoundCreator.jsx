import { useEffect, useState } from "react";
import { CreateRound } from "../API/RoundsAPI";
import "./RoundCreator.css";

import DatePicker from "react-datepicker";

import "./Datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

export default function RoundCreator() {
  const [round, setRound] = useState({
    title: "",
    start_date: new Date().toISOString(),
    periodInWeeks: "10",
    is_open: "true",
    is_active: "true",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultPeriodInWeeks = "10";

  const fail = "Kunde inte skapa ny runda";
  const success = "Ny runda skapad!";
  const dateError = "start date must be in the future";
  const titleError = "title is required";

  const handleDateChange = (date) => {
    setRound({
      ...round,
      start_date: date.toISOString(),
    });
  };

  useEffect(() => {
    console.log("round", round);
  }, [round]);

  const handleChange = (e) => {
    const value = e.target.value;
    setRound({
      ...round,
      [e.target.name]: value,
    });
  };

  const weeks = Array.from({ length: 50 }, (_, index) =>
    (index + 3).toString()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const modifiedround = {
      ...round,
      is_active: round.is_active === "true",
      is_open: round.is_open === "true",
    };

    const response = await CreateRound(
      modifiedround,
      modifiedround.periodInWeeks
    );
    if (response.ok) {
      setMessage(success);
      setIsSuccess(true);
    } else {
      const error = await response.json();
      console.error("Failed to create round");
      setMessage(fail);
      setIsSuccess(false);
      if (error.error === dateError) {
        setMessage("Startdatum måste vara i framtiden");
      }
      if (error.error === titleError) {
        setMessage("Titel är obligatoriskt");
      }
    }
  };

  return (
    <>
      <br />
      <div className="roundcreator_main-content">
        <h2>Skapa ny omgång</h2>
        <form className="create-new-round" onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Titel:</label>
                </td>
                <td className="round-title">
                  <input
                    className="round-input-field"
                    value={round.title}
                    type="text"
                    name="title"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="input-label">Startdatum:</label>
                </td>
                <td>
                  <DatePicker
                    selected={new Date(round.start_date)}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="datepicker"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="input-label">Antal veckor:</label>
                </td>
                <td>
                  <select
                    onChange={handleChange}
                    defaultValue={defaultPeriodInWeeks}
                    className="round-input-field"
                    name="periodInWeeks"
                  >
                    {weeks.map((week, index) => (
                      <option key={index} value={week}>
                        {week}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="input-label">Öppen för registrering:</label>
                </td>
                <td>
                  <select
                    className="round-input-field"
                    name="is_open"
                    onChange={handleChange}
                    defaultValue="true"
                  >
                    <option value="true">Ja</option>
                    <option value="false">Nej</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="input-label">Rundan aktiv:</label>
                </td>
                <td>
                  <select
                    className="round-input-field"
                    name="is_active"
                    onChange={handleChange}
                    defaultValue="true"
                  >
                    <option value="true">Ja</option>
                    <option value="false">Nej</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Skapa omgång</button>
        </form>
        {message && (
          <>
            <h3 className={isSuccess ? "" : "roundcreator_error"}>{message}</h3>
          </>
        )}
      </div>
    </>
  );
}
