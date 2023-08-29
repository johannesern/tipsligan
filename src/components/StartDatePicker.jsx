import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import "./Datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

export default function StartDatepicker({ getStartDate }) {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    getStartDate(date);
  };

  return (
    <>
      <ReactDatePicker
        className="datepicker"
        value={startDate}
        selected={startDate}
        dateFormat="dd-MM-yyyy"
        onChange={(date) => handleChange(date)}
      />
    </>
  );
}
