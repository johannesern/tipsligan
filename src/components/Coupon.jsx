/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Coupon.css";

const Coupon = ({ setCouponSelections }) => {
  const numRows = 13;

  const [couponArray, setCouponArray] = useState(
    Array(numRows)
      .fill(null)
      .map(() => [])
  );

  const handleCheckboxChange = (rowIndex, value) => {
    const newCouponArray = [...couponArray];
    newCouponArray[rowIndex] = value;
    setCouponArray(newCouponArray);
    setCouponSelections(newCouponArray);
  };

  const renderRows = () => {
    const rows = [];

    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      rows.push(
        <div key={rowIndex} className="coupon-row">
          <div className="index">{rowIndex + 1}.</div>
          {renderColumns(rowIndex)}
        </div>
      );
    }

    return rows;
  };

  const renderColumns = (rowIndex) => {
    const columns = [];

    const value = couponArray[rowIndex] || "";
    columns.push(
      <div key={rowIndex} className="coupon-row-partial">
        <input
          className="checkbox"
          type="checkbox"
          checked={value === "1"}
          onChange={() => handleCheckboxChange(rowIndex, "1")}
        />
        <input
          className="checkbox"
          type="checkbox"
          checked={value === "X"}
          onChange={() => handleCheckboxChange(rowIndex, "X")}
        />
        <input
          className="checkbox"
          type="checkbox"
          checked={value === "2"}
          onChange={() => handleCheckboxChange(rowIndex, "2")}
        />
      </div>
    );

    return columns;
  };

  return (
    <div className="coupon">
      <div className="coupon-title">
        <h3>1</h3>
        <h3>X</h3>
        <h3>2</h3>
      </div>
      <div>{renderRows()}</div>
    </div>
  );
};

export default Coupon;
