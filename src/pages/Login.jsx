import "./Login.css";

import LoginUser from "../API/LoginUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginError("");
    }, 5000);

    return () => clearTimeout(timer);

  }, [loginError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await LoginUser({
        email,
        password,
      });
      if(response?.token){
        localStorage.setItem("token", response.token);
        navigate("/admin");
      } else {
        console.error("Failed to login user");
        setLoginError("Wrong email or password");
      }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
          {loginError && <p>{loginError}</p>}
        </div>
      </form>
    </div>
  );
}
