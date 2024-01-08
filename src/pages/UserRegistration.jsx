import { useState, useEffect } from "react";

//css
import "./UserRegistration.css";

//components
import Coupon from "../components/Coupon";
import { CreateUser } from "../API/UsersAPI";

const UserRegistration = () => {
  const [newUser, setNewUser] = useState({
    Firstname: "Test",
    Lastname: "Testsson",
    Email: "test@test.com",
    Phone: "07011122233",
    Coupon: [],
    Password: "testtest",
  });
  const [coupon, setCoupon] = useState([]);
  const [createStatus, setCreateStatus] = useState({});
  const [isUserComplete, setIsUserComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setNewUser((prevState) => ({ ...prevState, Coupon: coupon }));
  }, [coupon]);

  useEffect(() => {
    setIsUserComplete(() => {
      const newUserComplete = determineUserComplete();
      return newUserComplete;
    });
  }, [newUser]);

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    const response = await CreateUser(newUser);
    if (response.ok)
      setCreateStatus({
        message: "Användare skapad",
        success: response.ok,
      });
    else {
      const data = await response.json();
      setCreateStatus({
        message: data,
        success: response.ok,
      });
    }
    cleanup();
  };

  const cleanup = () => {
    setTimeout(() => {
      setCreateStatus({});
      setNewUser({
        Firstname: "",
        Lastname: "",
        Email: "",
        Phone: "",
        Coupon: [],
        Password: "",
      });
      setCoupon([]);
    }, 5000);
  };

  const determineUserComplete = () => {
    if (
      newUser.Firstname === "" ||
      newUser.Lastname === "" ||
      newUser.Email === "" ||
      newUser.Phone === "" ||
      newUser.Password.length < 8 ||
      coupon.includes(null) ||
      coupon.length === 0
    )
      return false;
    return true;
  };

  return (
    <>
      <br />
      <div className="registration-content">
        <div name="new-player">
          <h3>Ny deltagare</h3>
          <form onSubmit={handleNewSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Förnamn:</label>
                  </td>
                  <td>
                    <input
                      className="user-input-field"
                      value={newUser.Firstname}
                      type="text"
                      name="Firstname"
                      id="firstname"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Efternamn:</label>
                  </td>
                  <td>
                    <input
                      className="user-input-field"
                      value={newUser.Lastname}
                      type="text"
                      name="Lastname"
                      id="lastname"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email:</label>
                  </td>
                  <td>
                    <input
                      className="user-input-field"
                      value={newUser.Email}
                      type="email"
                      name="Email"
                      id="email"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Telefon:</label>
                  </td>
                  <td>
                    <input
                      className="user-input-field"
                      value={newUser.Phone}
                      type="text"
                      name="Phone"
                      id="phone"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Lösenord:</label>
                  </td>
                  <td>
                    <input
                      className="user-input-field"
                      value={newUser.Password}
                      type="text"
                      name="Password"
                      id="password"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <div className="center-coupon">
              <Coupon setCouponSelections={setCoupon} />
            </div>
            <br />
            <div className="align-submit-button">
              <button
                className={isUserComplete ? "" : "registration-button-disabled"}
                type="submit"
              >
                Registrera
              </button>
            </div>
          </form>
          <br />
          <div className="align-message">
            {createStatus.success ? (
              <div className="registration-success">{createStatus.message}</div>
            ) : (
              <div className="registration-error">{createStatus.message}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;
