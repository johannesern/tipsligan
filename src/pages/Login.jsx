import "./Login.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, Verify } from "../API/UsersAPI";
import { GetSettings } from "../API/SettingsAPI";
import { useUserStore } from "../store/useStore";
import { useAssociationStore } from "../store/useStore";

export default function Login() {
  const navigate = useNavigate();
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();

  //Store
  const { user, setUser, setRoles } = useUserStore();
  const { setAssociation } = useAssociationStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [loginError]);

  useEffect(() => {
    const verifyLoggedIn = async () => {
      if (Cookies.get("userToken")) {
        const isLoggedIn = await Verify();
        if (isLoggedIn && user) {
          navigate("/användare");
        }
      } else {
        console.log("Not logged in");
      }
    };

    verifyLoggedIn();
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await LoginUser({
      email: "johannes@gmail.com",
      password: "123",
    });
    if (result) {
      console.log("result: ", result);
      setUser(result.user);
      setRoles(result.user_roles);
      Cookies.set("userToken", result.token, { expires: 1 });
      if (result.user_roles.includes("admin")) {
        const response = await GetSettings();
        if (response) {
          setAssociation(response);
        } else {
          console.error("Failed to get settings");
        }
      }

      navigate("/användare");
    } else {
      setLoginError("Felaktig email eller lösenord");
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Logga in</h1>
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
        <div className="login_align-login-buttons">
          <div className="login_align-login-btn">
            <button type="submit">Logga in</button>
            {loginError && <p>{loginError}</p>}
          </div>
          <div className="login_align-login-btn">
            <button type="button" onClick={() => navigate("/registrera-rad")}>
              Registrera
            </button>
          </div>
        </div>
      </form>
      <br />
    </div>
  );
}
