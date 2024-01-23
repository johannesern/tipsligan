import "./Userpage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExistingCoupon from "../components/ExistingCoupon";
import useStore from "../store/useStore";
import { UpdateUser } from "../API/UsersAPI";
import { GetUserByToken } from "../API/UsersAPI";
import { GetActiveRound } from "../API/RoundsAPI";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [existingCoupon, setExistingCoupon] = useState([]);
  const [updateStatus, setUpdateStatus] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [foundUser, setFoundUser] = useState(false);
  const [foundUserMessage, setFoundUserMessage] = useState("");

  //Store
  const adminTokenInStore = useStore((state) => state.adminToken);
  const userTokenInStore = useStore((state) => state.userToken);
  const addAdminToken = useStore((state) => state.addAdminToken);
  const addUserToken = useStore((state) => state.addUserToken);

  useEffect(() => {
    addAdminToken(localStorage.getItem("adminToken"));
    addUserToken(localStorage.getItem("userToken"));
  }, [adminTokenInStore, userTokenInStore]);

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        await getUser(userToken);
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (userLoaded()) {
      setExistingCoupon(user.coupon);
    } else {
      setExistingCoupon([]);
    }
  }, [user]);

  const getActiveRound = async () => {
    const response = await GetActiveRound();
    if (response.ok) {
      const data = await response.json();
      const foundUser = data.userDatas.find(
        (userdata) => userdata.id === user.id
      );
      if (foundUser) {
        setFoundUser(true);
      }
    } else {
      setMessage("Något gick fel vid inläsning, uppdatera sidan");
    }
  };

  const getUser = async (userToken) => {
    const response = await GetUserByToken(userToken);
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      setMessage("Något gick fel vid inläsning, uppdatera sidan");
    }
  };

  const userLoaded = () => {
    const test = Object.keys(user).length > 0;
    return test;
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      coupon: existingCoupon,
    };
    console.log("Updated user: ", updatedUser);
    const response = await UpdateUser(updatedUser);

    if (response.ok)
      setUpdateStatus({
        message: "Uppdatering lyckades",
        success: response.ok,
      });
    else
      setUpdateStatus({
        message: "Uppdatering misslyckades",
        success: response.ok,
      });
    getUser(localStorage.getItem("userToken"));
    cleanup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {}, [user, editMode]);

  const changeMode = async () => {
    if (!foundUser) {
      await getActiveRound();
    }
    setEditMode(!editMode);
  };

  const cleanup = () => {
    setTimeout(() => {
      changeMode();
    }, 5000);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const isEditable = () => {
    if (editMode && !foundUser) {
      return true;
    }
    return false;
  };

  return (
    <section>
      <article>
        {message ? <p>{message}</p> : <h2>Välkommen {user?.firstname}</h2>}
        <button onClick={logout} type="button">
          Logga ut
        </button>
        <div className="userpage_player-content">
          {userLoaded() && (
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
                            className="user-input-field"
                            value={user.firstname}
                            type="text"
                            name="firstname"
                            id="firstname"
                            onChange={handleChange}
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
                            className="user-input-field"
                            value={user.lastname}
                            type="text"
                            name="lastname"
                            id="lastname"
                            onChange={handleChange}
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
                            className="user-input-field"
                            value={user.email}
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
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
                            className="user-input-field"
                            value={user.phone}
                            type="text"
                            name="phone"
                            id="phone"
                            onChange={handleChange}
                          />
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>Grupp:</td>
                      {!editMode ? (
                        <td>{user.group}</td>
                      ) : (
                        <td>
                          <input
                            className="user-input-field"
                            value={user.group || ""}
                            type="text"
                            name="group"
                            id="text"
                            onChange={handleChange}
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
                  couponEditable={isEditable()}
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
