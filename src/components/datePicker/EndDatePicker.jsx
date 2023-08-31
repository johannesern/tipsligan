import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import "./Datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

export default function EndDatepicker({ getEndDate }) {
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (date) => {
    setEndDate(date);
    getEndDate(date);
  };

  return (
    <>
      <ReactDatePicker
        className="datepicker"
        value={endDate}
        selected={endDate}
        dateFormat="dd-MM-yyyy"
        onChange={(date) => handleChange(date)}
      />
    </>
  );
}
