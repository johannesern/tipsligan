import { Link, NavLink, Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>
            <Link to="/">Tipsligan</Link>
          </h1>
          <NavLink to="/">Hem</NavLink>
          <NavLink to="registrera-rad">Registrera rad</NavLink>
          <NavLink to="kontakta-oss">Kontakt</NavLink>
          <NavLink to="admin">Admin</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
