import "./Login.css";

import { LoginAdmin } from "../API/LoginAdmin";
import { LoginUser } from "../API/LoginUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();
  const [isUser, setIsUser] = useState(true);

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
        navigate("/admin");
      } else {
        setLoginError("Felaktig email eller lösenord");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Logga in som {}</h1>
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
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Email: </label>
              </td>
              <td>
                <input
                  className="login_input-field"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Lösenord:</label>
              </td>
              <td>
                <input
                  type="password"
                  className="login_input-field"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit">Logga in</button>
          {loginError && <p>{loginError}</p>}
        </div>
      </form>
      <br />
    </div>
  );
}
