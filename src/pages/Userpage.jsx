// import "./Home.css";
import "./Userpage.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserByToken } from "../API/GetUser";
import ExistingCoupon from "../components/ExistingCoupon";
import { UpdateUser } from "../API/UpdateUser";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [existingCoupon, setExistingCoupon] = useState([]);
  const [updateStatus, setUpdateStatus] = useState({});

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      getUser(userToken);
    } else {
      navigate("/login"); // You can also return a loading spinner or message here if needed
    }
  }, [navigate]);

  useEffect(() => {
    if (userLoaded()) {
      setExistingCoupon(user.coupon);
    } else {
      setExistingCoupon([]);
    }
  }, [user]);

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
  };

  return (
    <section>
      <article>
        {message ? <p>{message}</p> : <h2>Välkommen {user?.firstname}</h2>}
        <br />
        <div className="userpage_player-content">
          {userLoaded() && (
            <>
              <div className="userpage_center-coupon">
                <ExistingCoupon
                  setExistingCouponSelections={setExistingCoupon}
                  coupon={existingCoupon ? existingCoupon : []}
                />
              </div>
              <br />
              <div className="userpage_align-submit-update-button">
                <button onClick={handleUserUpdate} type="submit">
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
