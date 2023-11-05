import LoginUser from "../API/LoginUser";
import { useEffect, useState } from "react";

import "./Login.css";
import useToken from "../hooks/useToken";

export default function Login() {
  const { setToken } = useToken();
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await LoginUser({
      email,
      password,
    });
    if (response.error != null) {
      window.alert(response.error);
    } else {
      setToken(response.token);
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
        </div>
      </form>
    </div>
  );
}
