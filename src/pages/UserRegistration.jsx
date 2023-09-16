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
  const [newUser, setNewUser] = useState({
    Firstname: "Test",
    Lastname: "Testsson",
    Email: "test@test.com",
    Phone: "07011122233", //LÄGG IN HOMETOPCONTENT FUNKTION SOM GRÅAR REGISTRERA KNAPP OCH GER FLEMEDDELANDE
    HasPaid: false, //GÄLLER OCKSÅ HOMEBUTTONS
    Coupon: [],
    UserCreated: FormattedDate(),
  });
  const [coupon, setCoupon] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setNewUser((prevState) => ({ ...prevState, Coupon: coupon }));
  }, [coupon]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateUser(newUser);
    navigate("/");
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
              value={newUser.Firstname}
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
              value={newUser.Lastname}
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
              value={newUser.Email}
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
              value={newUser.Phone}
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
