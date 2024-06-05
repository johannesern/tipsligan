import "./Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import { LoginAdmin } from "../API/AdminsAPI";
import { LoginUser } from "../API/UsersAPI";

export default function Login() {
  const navigate = useNavigate();
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();
  const [isUser, setIsUser] = useState(false);
  const [choiceMade, setChoiceMade] = useState(false);

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
    const timer = setTimeout(() => {
      setLoginError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [loginError]);

  useEffect(() => {}, [isUser, password, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUser) {
      const response = await LoginUser({
        email,
        password,
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.user_id);
        addUserToken(data.token);
        navigate("/användare");
      } else {
        setLoginError("Felaktig email eller lösenord");
      }
    } else {
      const response = await LoginAdmin({
        email,
        password,
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        addAdminToken(data.token);
        navigate("/admin");
      } else {
        setLoginError("Felaktig email eller lösenord");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Logga in</h1>
      <br />
      {!choiceMade && (
        <>
          <div>
            <i>Markera en användare</i>
          </div>
          <br />
          <div className="login_user-type">
            <button
              type="button"
              className="login_inactive"
              onClick={() => {
                setIsUser(true), setChoiceMade(true);
              }}
            >
              Deltagare
            </button>
            <button
              type="button"
              className="login_inactive"
              onClick={() => {
                setIsUser(false), setChoiceMade(true);
              }}
            >
              Administratör
            </button>
          </div>
        </>
      )}
      {choiceMade && (
        <>
          <div>
            <i>Markera en användare</i>
          </div>
          <br />
          <div className="login_user-type">
            <button
              type="button"
              disabled={isUser}
              className={isUser ? "" : "login_inactive"}
              onClick={() => setIsUser(true)}
            >
              Deltagare
            </button>
            <button
              type="button"
              disabled={!isUser}
              className={isUser ? "login_inactive" : ""}
              onClick={() => setIsUser(false)}
            >
              Administratör
            </button>
          </div>
        </>
      )}
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td className="login_label-inputfield">
                <label>Email: </label>
                <input
                  className="login_input-field"
                  type="text"
                  placeholder="Skriv in email..."
                  disabled={!choiceMade}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="login_label-inputfield">
                <label>Lösenord:</label>
                <input
                  type="password"
                  placeholder="Skriv in lösenord..."
                  disabled={!choiceMade}
                  className="login_input-field"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td onClick={() => navigate("/återställa-lösenord")}>
                <a href="">Glömt lösenord?</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="login_align-login-btn">
          <button
            disabled={!choiceMade}
            className={choiceMade ? "" : "login_inactive-btn"}
            type="submit"
          >
            Logga in
          </button>
          {loginError && <p>{loginError}</p>}
        </div>
      </form>
      <br />
    </div>
  );
}
