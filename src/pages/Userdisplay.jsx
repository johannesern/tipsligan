import "./Userdisplay.css";
import { useState, useEffect, useRef } from "react";
import { DeleteUser } from "../API/UsersAPI";
import { GetAllUsers } from "../API/UsersAPI";
import { UpdateUser } from "../API/UsersAPI";
import ExistingCoupon from "../components/ExistingCoupon";
import { useUserStore } from "../store/useStore";

const Userdisplay = () => {
  const [selectedUser, setSelectedUser] = useState("");
  // const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [existingCoupon, setExistingCoupon] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const modalRef = useRef(null);

  //Store
  const { allUsers, setAllUsers } = useUserStore();

  //First time loading
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await GetAllUsers();
    if (data) {
      setAllUsers(data);
    } else {
      console.error("Failed to get users");
      setMessage("Kunde inte hämta användare");
    }
  };

  useEffect(() => {
    if (user) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      setExistingCoupon(user.coupon);
    } else {
      setExistingCoupon([]);
    }
  }, [user]);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      coupon: existingCoupon,
    };
    const isUpdate = await UpdateUser(updatedUser);

    if (isUpdate) {
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

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeForm();
    }
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
            <div className="userdisplay_modal-content" ref={modalRef}>
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
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Grupp:</td>
                      <td>
                        <input
                          className="userdisplay_user-input-field"
                          value={user.team || ""}
                          type="text"
                          name="team"
                          id="text"
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Automatisk anmälning:</td>
                      <td>
                        <input
                          className="userdisplay_checkbox"
                          checked={user.opt_in}
                          type="checkbox"
                          name="opt_in"
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
                    editMode={editMode}
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
          {allUsers != null ? (
            allUsers.map((user) => (
              <tr
                className="userdisplay_user-list-item"
                onClick={() => {
                  setUser(user);
                }}
                key={user.id}
              >
                <td>
                  <h3>{user.firstname}</h3>
                </td>
                <td className="userdisplay_list-button">
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
            <tr>{message}</tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Userdisplay;
