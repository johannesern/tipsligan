//logic
// import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";

//css
import "./App.css";

//pages
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";
import Userdisplay from "./pages/Userdisplay";
import Highscore from "./components/Highscore";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import RoundsDisplay from "./components/RoundsDisplay";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />}>
        <Route path="registrera" element={<UserRegistration />} />
        <Route path="topplista" element={<Highscore />}>
          <Route index element={<RoundsDisplay />} />
        </Route>
      </Route>
      <Route path="kontakta-oss" element={<Contact />} />
      <Route path="admin" element={<Admin />}>
        <Route path="användare" element={<Userdisplay />} />
        <Route path="registrera" element={<UserRegistration />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
