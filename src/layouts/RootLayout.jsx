import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export function RootLayout() {
  const [adminToken, setAdminToken] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setAdminToken(adminToken);
    }

    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setUserToken(userToken);
    }
  }, []);

  const notLoggedIn = () => {
    if (!adminToken && !userToken) {
      return true;
    }
    return false;
  };

  const adminLoggedIn = () => {
    if (adminToken) {
      return true;
    }
    return false;
  };

  const userLoggedIn = () => {
    if (userToken) {
      return true;
    }
    return false;
  };

  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>
            <Link to="/">Tipsligan</Link>
          </h1>
          <NavLink to="/">Hem</NavLink>
          <NavLink to="registrera-rad">Registrera mig</NavLink>
          {notLoggedIn() && <NavLink to="login">Logga in</NavLink>}
          {adminLoggedIn() && <NavLink to="admin">Admin</NavLink>}
          {userLoggedIn() && <NavLink to="användare">Min profil</NavLink>}
          <NavLink to="kontakta-oss">Kontakt</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
