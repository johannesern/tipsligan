import useStore from "../store/useStore";
import { Link, NavLink, Outlet } from "react-router-dom";

export function RootLayout() {
  const adminTokenInStore = useStore((state) => state.adminToken);
  const userTokenInStore = useStore((state) => state.userToken);

  const determineLoggedIn = () => {
    if (adminTokenInStore) return <NavLink to="/admin">Admin</NavLink>;
    if (userTokenInStore) return <NavLink to="/användare">Min profil</NavLink>;
    return <NavLink to="/login">Logga in</NavLink>;
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
          {determineLoggedIn()}
          <NavLink to="kontakta-oss">Kontakt</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
