/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import "./Datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import useStore from "../store/useStore";

export default function StartDatepicker() {
  const round = useStore((state) => state.roundToUpdate);
  const updateRoundInStore = useStore((state) => state.addRoundToUpdate);
  const [chosenDate, setChosenDate] = useState(round.startDate ? new Date(round.startDate): new Date());

  const handleChange = (date) => {
    setChosenDate(date);
    const newRound = {
      ...round,
      startDate: date,
    };
    updateRoundInStore(newRound);
  };

  return (
    <>
      <ReactDatePicker
        className="datepicker"
        value={chosenDate}
        selected={chosenDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => handleChange(date)}
      />
    </>
  );
}
