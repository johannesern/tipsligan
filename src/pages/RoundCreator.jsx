import { useEffect, useState } from "react";
import StartDatepicker from "../components/DatePicker/StartDatePicker.jsx";
import { CreateRound } from "../API/CreateRound.jsx";
import { FormattedDate } from "../functions/FormattedDate.jsx";
import "./RoundCreator.css";

export default function RoundCreator() {
  const [roundData, setRoundData] = useState({
    title: "",
    periodInWeeks: "",
    startDate: "",
    isOpen: true,
    isActive: true,
  });
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
    console.log("Round data:", roundData);
  }, [roundData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Send data:", roundData);
    const response = await CreateRound(roundData);
    console.log("Createround response:", response);
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
                <option value={true}>Ja</option>
                <option value={false}>Nej</option>
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
                <option value={true}>Ja</option>
                <option value={false}>Nej</option>
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
      </div>
    </>
  );
}
