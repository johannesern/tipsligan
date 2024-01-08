import { useState } from "react";
import StartDatepicker from "../components/StartDatePicker.jsx";
import { CreateRound } from "../API/RoundsAPI";
// import { FormattedDate } from "../functions/FormattedDate.jsx";
import "./RoundCreator.css";

export default function RoundCreator() {
  // const defaultStartDate = FormattedDate(new Date());
  const defaultPeriodInWeeks = "10";
  const [createdRound, setCreatedRound] = useState();
  const [roundData, setRoundData] = useState({
    title: "",
    periodInWeeks: defaultPeriodInWeeks,
    // startDate: defaultStartDate,
    isOpen: "true",
    isActive: "true",
  });

  const activeRoundAlreadyExists =
    "En aktiv runda finns redan. Avvaktivera befintlig runda innan ny runda aktiveras.";
  const newRoundCreated = "Ny runda skapad!";

  const getStartDate = (childStartDate) => {
    setRoundData({
      ...roundData,
      startDate: FormattedDate(childStartDate),
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setRoundData({
      ...roundData,
      [e.target.name]: value,
    });
  };

  const weeks = Array.from({ length: 50 }, (_, index) =>
    (index + 3).toString()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // js is stupid... needs to convert string to bool before POST because
    // selects change a bool-value to string on the fly... stupid
    const modifiedRoundData = {
      ...roundData,
      isActive:
        roundData.isActive === "true"
          ? true
          : roundData.isActive === "false"
          ? false
          : null,
      isOpen:
        roundData.isOpen === "true"
          ? true
          : roundData.isOpen === "false"
          ? false
          : null,
    };

    const createdRound = await CreateRound(modifiedRoundData);
    displayRoundCreated(createdRound);
  };

  const displayRoundCreated = (round) => {
    setCreatedRound(round);
  };

  return (
    <>
      <div className="">
        <h2>Skapa ny omgång</h2>
        <form className="create-new-round" onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="input-label">Titel:</label>
                </td>
                <td className="round-title">
                  <input
                    className="round-input-field"
                    value={roundData.title}
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
                  <StartDatepicker getStartDate={getStartDate} />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="input-label">Antal veckor:</label>
                </td>
                <td>
                  <select
                    onChange={handleChange}
                    defaultValue={10}
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
                    name="isOpen"
                    onChange={handleChange}
                    defaultValue={true}
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
                    name="isActive"
                    onChange={handleChange}
                    defaultValue={true}
                  >
                    <option value="true">Ja</option>
                    <option value="false">Nej</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </form>
        <button onSubmit={handleSubmit} type="submit">
          Skapa omgång
        </button>
        {createdRound ? (
          <>
            {createdRound.isActive != false ? (
              <h3 className="">{newRoundCreated}</h3>
            ) : (
              <h3 className="">{activeRoundAlreadyExists}</h3>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
