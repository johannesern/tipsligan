import "./Userpage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExistingCoupon from "../components/ExistingCoupon";
import { useUserStore } from "../store/useStore";
import { UpdateUser, GetUserById } from "../API/UsersAPI";
import { Logout } from "../API/UsersAPI";

export default function Home() {
  const navigate = useNavigate();
  const [existingCoupon, setExistingCoupon] = useState([]);
  const [updateStatus, setUpdateStatus] = useState({});
  const [editMode, setEditMode] = useState(false);

  //Store
  const { user, userRoles, updateUser, clearUser, clearAllUsers } =
    useUserStore();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchAndSetUser(user.id);
      setExistingCoupon(user.coupon);
    }
  }, [navigate]);

  const fetchAndSetUser = async (userId) => {
    const user = await GetUserById(userId);
    if (user) {
      const { setUser } = useUserStore.getState();
      setUser(user);
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      coupon: existingCoupon,
    };
    const isUpdated = await UpdateUser(updatedUser);
    if (isUpdated) {
      setUpdateStatus({
        success: true,
        message: "Uppdatering lyckades",
      });
      fetchAndSetUser(user.id);
      cleanup();
    } else {
      setUpdateStatus({
        success: false,
        message: "Uppdatering misslyckades",
      });
    }
    cleanup();
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    updateUser({ [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    updateUser({ [name]: checked });
  };

  const changeMode = () => {
    setEditMode(!editMode);
  };

  const cleanup = () => {
    setTimeout(() => {
      setUpdateStatus({});
      changeMode();
    }, 3000);
  };

  const logout = () => {
    console.log("Logging out");
    if (userRoles.includes("admin")) {
      clearAllUsers();
    }
    Logout(user.id);
    clearUser();
    navigate("/login");
  };

  return (
    <section>
      <article>
        {user && <h2>Välkommen {user?.firstname}</h2>}
        <button onClick={logout} type="button">
          Logga ut
        </button>
        <div className="userpage_player-content">
          {user && (
            <>
              <div className="userpage_player-content--header">
                <h3>Mina uppgifter</h3>
                <button onClick={changeMode} type="button">
                  Ändra
                </button>
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>Förnamn:</td>
                      {!editMode ? (
                        <td>{user.firstname}</td>
                      ) : (
                        <td>
                          <input
                            className="userpage_user-input-field"
                            value={user.firstname}
                            type="text"
                            name="firstname"
                            id="firstname"
                            onChange={handleUserChange}
                          />
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>Efternamn:</td>
                      {!editMode ? (
                        <td>{user.lastname}</td>
                      ) : (
                        <td>
                          <input
                            className="userpage_user-input-field"
                            value={user.lastname}
                            type="text"
                            name="lastname"
                            id="lastname"
                            onChange={handleUserChange}
                          />
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>E-post:</td>
                      {!editMode ? (
                        <td>{user.email}</td>
                      ) : (
                        <td>
                          <input
                            className="userpage_user-input-field"
                            value={user.email}
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleUserChange}
                          />
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>Telefon:</td>
                      {!editMode ? (
                        <td>{user.phone}</td>
                      ) : (
                        <td>
                          <input
                            className="userpage_user-input-field"
                            value={user.phone}
                            type="text"
                            name="phone"
                            id="phone"
                            onChange={handleUserChange}
                          />
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>Grupp:</td>
                      {!editMode ? (
                        <td>{user.team}</td>
                      ) : (
                        <td>
                          <input
                            className="userpage_user-input-field"
                            value={user.team || ""}
                            type="text"
                            name="team"
                            id="text"
                            onChange={handleUserChange}
                          />
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>Automatisk anmälning:</td>
                      {!editMode ? (
                        <td>
                          <input
                            className="userpage_checkbox"
                            type="checkbox"
                            checked={user.opt_in}
                            disabled
                          />
                        </td>
                      ) : (
                        <td>
                          <input
                            className="userpage_checkbox"
                            checked={user.opt_in}
                            type="checkbox"
                            name="opt_in"
                            onChange={handleCheckboxChange}
                          />
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* {foundUser && } */}
              <div className="userpage_center-coupon">
                <ExistingCoupon
                  setExistingCouponSelections={setExistingCoupon}
                  coupon={existingCoupon ? existingCoupon : []}
                  editMode={!editMode}
                />
              </div>
              <br />
              <div className="userpage_align-submit-update-button">
                <button onClick={handleUserUpdate} type="button">
                  Uppdatera
                </button>
              </div>
              <br />
              <div className="userpage_align-message">
                {updateStatus.success ? (
                  <div className="userpage_registration-success">
                    {updateStatus.message}
                  </div>
                ) : (
                  <div className="userpage_registration-error">
                    {updateStatus.message}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </article>
    </section>
  );
}
