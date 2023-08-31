import { useState } from "react";
import StartDatepicker from "../components/DatePicker/StartDatePicker.jsx";
import EndDatepicker from "../components/DatePicker/EndDatePicker.jsx";

export default function RoundCreator() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const getStartDate = (childStartDate) => {
    setStartDate(childStartDate);
  };

  const getEndDate = (childEndData) => {
    setEndDate(childEndData);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {};
  return (
    <>
      <div className="form">
        <h1>{startDate.toLocaleDateString("en-GB")}</h1>
        <h1>{endDate.toLocaleDateString("en-GB")}</h1>
        <h2>Skapa ny omgång</h2>
        <form onSubmit={handleSubmit}>
          <div className="textfields">
            <label>
              Titel:
              <input
                className="inputTextBox"
                value={title}
                type="text"
                name="title"
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Startdatum:
              <StartDatepicker getStartDate={getStartDate} />
            </label>
            <br />
            <label>
              Slutdatum:
              <EndDatepicker getEndDate={getEndDate} />
            </label>
            <br />
          </div>
          <br />
          <button type="submit">Skapa omgång</button>
        </form>
      </div>
    </>
  );
}
