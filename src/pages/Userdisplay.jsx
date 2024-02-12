import "./Userdisplay.css";
import { useState, useEffect } from "react";
import { DeleteUser } from "../API/UsersAPI";
import { GetAllUsers } from "../API/UsersAPI";
import { UpdateUser } from "../API/UsersAPI";

const Userdisplay = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");

  //First time loading
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await GetAllUsers();
    setUsers(data);
  };

  useEffect(() => {}, [users]);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    // const updatedUser = {
    //   ...user,
    //   coupon: existingCoupon,
    // };
    const response = await UpdateUser(user);

    if (response.ok) {
      setUpdateStatus("Uppdatering lyckades");
    } else {
      setUpdateStatus("Uppdatering misslyckades");
    }
    getUsers();
  };

  const handleDeleteClick = (id) => {
    setSelectedUser(id);
    setIsConfirmationVisible(!isConfirmationVisible);
  };

  const handleConfirm = async (remove) => {
    if (remove === "true") {
      await DeleteUser(selectedUser);
      setIsConfirmationVisible(!isConfirmationVisible);
      await getUsers();
    }
    setIsConfirmationVisible(!isConfirmationVisible);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const closeForm = () => {
    setUpdateStatus("");
    setUser();
  };

  return (
    <main>
      {isConfirmationVisible && (
        <>
          <div className="confirmation-buttons">
            <button onClick={() => handleConfirm("true")}>Ja</button>
            <button onClick={() => handleConfirm("false")}>Nej</button>
          </div>
        </>
      )}
      {user && (
        <>
          <div className="userdisplay_modal-content">
            <div
              className="userdisplay_close"
              type="button"
              onClick={closeForm}
            />
            <div className="userpage_player-content--header">
              <h3>Uppgifter</h3>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>Förnamn:</td>
                    <td>
                      <input
                        className="userpage_user-input-field"
                        value={user.firstname}
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Efternamn:</td>
                    <td>
                      <input
                        className="userpage_user-input-field"
                        value={user.lastname}
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>E-post:</td>
                    <td>
                      <input
                        className="userpage_user-input-field"
                        value={user.email}
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Telefon:</td>
                    <td>
                      <input
                        className="userpage_user-input-field"
                        value={user.phone}
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Grupp:</td>
                    <td>
                      <input
                        className="userpage_user-input-field"
                        value={user.group || ""}
                        type="text"
                        name="group"
                        id="text"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Automatisk anmälning:</td>
                    <td>
                      <input
                        className="userpage_checkbox"
                        checked={user.optIn}
                        type="checkbox"
                        name="optIn"
                        onChange={handleCheckboxChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="userpage_align-submit-update-button">
                <button onClick={handleUserUpdate} type="button">
                  Uppdatera
                </button>
              </div>
              {updateStatus !== "" && (
                <div className="userpage_update-status">
                  <p>{updateStatus}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <ul className="users-list">
        {users != null ? (
          users.map((user) => (
            <li
              className="list-item"
              onClick={() => setUser(user)}
              key={user.id || user.Id}
            >
              {" "}
              <div className="user-list-item">
                <h3>{user.firstname}</h3>
                <div className="user-buttons">
                  <button name="edit" onClick={() => setUser(user)}>
                    Ändra
                  </button>
                  <button
                    name="delete"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </main>
  );
};

export default Userdisplay;
