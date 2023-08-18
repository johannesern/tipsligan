import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//css
import "./UserRegistration.css";

//components
import Coupon from "../components/Coupon";
import { CreateUser } from "../API/CreateUser";

//functions
import { FormattedDate } from "../functions/FormattedDate";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Firstname: "Test",
    Lastname: "Testsson",
    Email: "test@test.com",
    Phone: "07011122233",
    HasPaid: false,
    Coupon: [],
    UserCreated: FormattedDate(),
  });
  const [coupon, setCoupon] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setData((prevState) => ({ ...prevState, Coupon: coupon }));
  }, [coupon]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateUser(data);
    navigate("/admin");
  };

  return (
    <div className="form">
      <h2>Registrera rad</h2>
      <form onSubmit={handleSubmit}>
        <div className="textfields">
          <label>
            Förnamn:
            <input
              className="inputTextBox"
              value={data.Firstname}
              type="text"
              name="Firstname"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Efternamn:
            <input
              className="inputTextBox"
              value={data.Lastname}
              type="text"
              name="Lastname"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              className="inputTextBox"
              value={data.Email}
              type="email"
              name="Email"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              className="inputTextBox"
              value={data.Phone}
              type="text"
              name="Phone"
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <Coupon setCouponSelections={setCoupon} />
        <br />
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
};

export default UserRegistration;
