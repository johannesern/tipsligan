import "./Userdisplay.css";
import { useState, useEffect } from "react";
import { DeleteUser } from "../API/UsersAPI";
import { GetAllUsers } from "../API/UsersAPI";
import { UpdateUser } from "../API/UsersAPI";
import ExistingCoupon from "../components/ExistingCoupon";

const Userdisplay = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [existingCoupon, setExistingCoupon] = useState([]);
  const [editMode, setEditMode] = useState(false);

  //First time loading
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (user) {
      setExistingCoupon(user.coupon);
    } else {
      setExistingCoupon([]);
    }
  }, [user]);

  const getUsers = async () => {
    const data = await GetAllUsers();
    setUsers(data);
  };

  useEffect(() => {}, [users]);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      coupon: existingCoupon,
    };
    const response = await UpdateUser(updatedUser);

    if (response.ok) {
      setUpdateStatus("Uppdatering lyckades");
    } else {
      setUpdateStatus("Uppdatering misslyckades");
    }
    getUsers();
    setTimeout(() => {
      setUpdateStatus("");
    }, 2500);
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
    setEditMode(false);
  };

  const isEditable = () => {
    if (editMode) {
      return true;
    }
    return false;
  };

  return (
    <main className="userdisplay_main-content">
      {isConfirmationVisible && (
        <>
          <div className="userdisplay_confirmation-buttons">
            <div>
              <h2>Vill du verkligen radera?</h2>
            </div>
            <div className="userdisplay_confirmation-buttons--btndiv">
              <button onClick={() => handleConfirm("true")}>Ja</button>
              <button onClick={() => handleConfirm("false")}>Nej</button>
            </div>
          </div>
        </>
      )}
      {user && (
        <>
          <div className="userdisplay_form-overlay">
            <div className="userdisplay_modal-content">
              <button type="button" onClick={() => setEditMode(!editMode)}>
                Ändra
              </button>
              <div
                className="userdisplay_close"
                type="button"
                onClick={closeForm}
              />
              <div className="userdisplay_player-content--header">
                <h3>Uppgifter</h3>
              </div>
              <div>
                <table>
                  <tbody className="userdisplay_center-table-body">
                    <tr>
                      <td>Förnamn:</td>
                      <td>
                        <input
                          className="userdisplay_user-input-field"
                          value={user.firstname}
                          type="text"
                          name="firstname"
                          id="firstname"
                          disabled={!isEditable()}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Efternamn:</td>
                      <td>
                        <input
                          className="userdisplay_user-input-field"
                          value={user.lastname}
                          type="text"
                          name="lastname"
                          id="lastname"
                          disabled={!isEditable()}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>E-post:</td>
                      <td>
                        <input
                          className="userdisplay_user-input-field"
                          value={user.email}
                          type="email"
                          name="email"
                          id="email"
                          disabled={!isEditable()}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Telefon:</td>
                      <td>
                        <input
                          className="userdisplay_user-input-field"
                          value={user.phone}
                          type="text"
                          name="phone"
                          id="phone"
                          disabled={!isEditable()}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Grupp:</td>
                      <td>
                        <input
                          className="userdisplay_user-input-field"
                          value={user.group || ""}
                          type="text"
                          name="group"
                          id="text"
                          disabled={!isEditable()}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Automatisk anmälning:</td>
                      <td>
                        <input
                          className="userdisplay_checkbox"
                          checked={user.optIn}
                          type="checkbox"
                          name="optIn"
                          disabled={!isEditable()}
                          onChange={handleCheckboxChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="userdisplay_center-coupon">
                  <ExistingCoupon
                    setExistingCouponSelections={setExistingCoupon}
                    coupon={existingCoupon ? existingCoupon : []}
                    couponEditable={isEditable()}
                  />

                  <div className="userdisplay_align-submit-update-button">
                    <button onClick={handleUserUpdate} type="button">
                      Uppdatera
                    </button>
                  </div>
                </div>
                {updateStatus !== "" && (
                  <div className="userdisplay_update-status">
                    <p>{updateStatus}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <table className="userdisplay_table-content">
        <tbody>
          {users != null ? (
            users.map((user) => (
              <tr
                className="userdisplay_user-list-item"
                onClick={() => setUser(user)}
                key={user.id}
              >
                <td>
                  <h3>{user.firstname}</h3>
                </td>
                <td className="userdisplay_list-button">
                  <button name="edit" onClick={() => setUser(user)}>
                    Ändra
                  </button>
                  <button
                    name="delete"
                    onClick={(e) => {
                      handleDeleteClick(user.id);
                      e.stopPropagation();
                    }}
                  >
                    Ta bort
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>Loading...</tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Userdisplay;
