import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import "./Datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { useRoundStore } from "../store/useStore";

export default function StartDatepicker() {
  const { round, updateRound } = useRoundStore();
  const [chosenDate, setChosenDate] = useState(
    round.start_date ? new Date(round.start_date) : new Date()
  );

  const handleChange = (date) => {
    setChosenDate(date);
    const newRound = {
      ...round,
      start_date: date.toISOString(),
    };
    updateRound(newRound);
  };

  return (
    <>
      <ReactDatePicker
        className="datepicker"
        selected={chosenDate}
        dateFormat="yyyy-MM-dd"
        onChange={handleChange}
      />
    </>
  );
}
