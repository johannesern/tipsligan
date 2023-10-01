/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./RoundUpdateForm.css";
import UpdateRound from "../API/UpdateRound";
import { FormattedDate } from "../functions/FormattedDate";
import StartDatepicker from "./DatePicker/StartDatePicker";
import EndDatepicker from "./datePicker/EndDatePicker";

export function RoundUpdateForm({ updateRound, updateRoundsInList }) {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseFromUpdate(await UpdateRound(round));
    updateRoundsInList(round);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="textfields">
          <label>
            Titel:
            <input
              className="inputTextBox"
              value={round.title}
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
          <label>
            Öppen för registrering:
            <select
              defaultValue={round.isOpen}
              className="inputSelect"
              name="isOpen"
              onChange={handleChange}
            >
              <option value={true}>Ja</option>
              <option value={false}>Nej</option>
            </select>
          </label>
          <label>
            Runda aktiv:
            <select
              defaultValue={round.isActive}
              className="inputSelect"
              name="isActive"
              onChange={handleChange}
            >
              <option value={true}>Ja</option>
              <option value={false}>Nej</option>
            </select>
          </label>
        </div>
        <button type="submit">Uppdatera rundan</button>
      </form>
    </>
  );
}
