import "./Coupon.css";

/* eslint-disable react/prop-types */
import "./Coupon.css";

const ExistingCoupon = ({
  setExistingCouponSelections,
  coupon,
  couponEditable,
}) => {
  const numRows = 13;

  const handleCheckboxChange = (rowIndex, value) => {
    const newCouponArray = [...coupon];
    newCouponArray[rowIndex] = value;
    setExistingCouponSelections(newCouponArray);
  };

  const renderRows = () => {
    const rows = [];

    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      rows.push(
        <div key={rowIndex} className="coupon-row">
          <div className="index">{rowIndex + 1}.</div>
          {renderColumns(rowIndex, coupon[rowIndex])}
        </div>
      );
    }

    return rows;
  };

  const renderColumns = (rowIndex) => {
    const columns = [];

    columns.push(
      <div key={rowIndex} className="coupon-row-partial">
        <input
          className="checkbox"
          type="checkbox"
          disabled={!couponEditable}
          checked={coupon[rowIndex] === "1"}
          onChange={() => handleCheckboxChange(rowIndex, "1")}
        />
        <input
          className="checkbox"
          type="checkbox"
          disabled={!couponEditable}
          checked={coupon[rowIndex] === "X"}
          onChange={() => handleCheckboxChange(rowIndex, "X")}
        />
        <input
          className="checkbox"
          type="checkbox"
          disabled={!couponEditable}
          checked={coupon[rowIndex] === "2"}
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
      <div>{coupon ? renderRows() : <div>No coupon</div>}</div>
    </div>
  );
};

export default ExistingCoupon;
