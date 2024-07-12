import { useUserStore } from "../store/useStore";
import { Link, NavLink, Outlet } from "react-router-dom";

export function RootLayout() {
  const { userRoles } = useUserStore();

  const determineLoggedIn = () => {
    if (Object.keys(userRoles).length === 0) {
      return (
        <>
          <NavLink to="registrera-rad">Registrera mig</NavLink>
          <NavLink to="/login">Logga in</NavLink>
        </>
      );
    }
    if (userRoles.includes("admin")) {
      return (
        <>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/användare">Min profil</NavLink>
        </>
      );
    } else {
      return <NavLink to="/användare">Min profil</NavLink>;
    }
  };

  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>
            <Link to="/">Tipsligan</Link>
          </h1>
          <NavLink to="/">Hem</NavLink>
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
