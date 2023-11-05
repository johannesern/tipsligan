import { useEffect, useState } from "react";
import StartDatepicker from "../components/datepicker/StartDatePicker.jsx";
import { CreateRound } from "../API/CreateRound.jsx";
import { FormattedDate } from "../functions/FormattedDate.jsx";
import "./RoundCreator.css";

export default function RoundCreator() {
  const defaultStartDate = FormattedDate();
  const defaultPeriodInWeeks = "10";
  const [createdRound, setCreatedRound] = useState();
  const [roundData, setRoundData] = useState({
    title: "",
    periodInWeeks: defaultPeriodInWeeks,
    startDate: defaultStartDate,
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

  useEffect(() => {
    // console.log('Round data:', roundData);
  }, [roundData]);

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
          <div className="title-weeks">
            <label>
              Titel:
              <input
                className="input-field"
                value={roundData.title}
                type="text"
                name="title"
                onChange={handleChange}
              />
            </label>
            <label>
              Antal veckor:
              <select
                onChange={handleChange}
                defaultValue={10}
                className="input-field"
                name="periodInWeeks"
              >
                {weeks.map((week, index) => (
                  <option key={index} value={week}>
                    {week}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Öppen för registrering:
              <select
                className="input-field"
                name="isOpen"
                onChange={handleChange}
                defaultValue={true}
              >
                <option value="true">Ja</option>
                <option value="false">Nej</option>
              </select>
            </label>
            <label>
              Rundan aktiv:
              <select
                className="input-field"
                name="isActive"
                onChange={handleChange}
                defaultValue={true}
              >
                <option value="true">Ja</option>
                <option value="false">Nej</option>
              </select>
            </label>
          </div>

          <label>
            Startdatum:
            <StartDatepicker getStartDate={getStartDate} />
          </label>
          <br />
          <br />
          <button onSubmit={handleSubmit} type="submit">
            Skapa omgång
          </button>
        </form>
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
