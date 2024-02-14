//logic
// import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//css
import "./App.css";

//pages
import { RootLayout } from "./layouts/RootLayout";
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";
import Userdisplay from "./pages/Userdisplay";
import HighscoreDisplay from "./components/HighscoreDisplay";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Userpage from "./pages/Userpage";
import RoundCreator from "./pages/RoundCreator";
import RoundsDisplay from "./pages/RoundsDisplay";
import Login from "./pages/Login";
import CorrectionRound from "./pages/CorrectionRound";
import WeeklySnapshot from "./pages/WeeklySnapshot";
import Settings from "./pages/Settings";
import PrizeBreakdown from "./pages/PrizeBreakdown";
import ResetPassword from "./pages/ResetPassword";
import RoundInfo from "./components/RoundInfo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="återställa-lösenord" element={<ResetPassword />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Home />}>
        <Route index element={<HighscoreDisplay />}></Route>
        <Route path="registrera-rad" element={<UserRegistration />} />
      </Route>
      <Route path="kontakta-oss" element={<Contact />} />
      <Route path="användare" element={<Userpage />} />
      <Route path="admin" element={<Admin />}>
        <Route path="deltagare" element={<Userdisplay />} />
        <Route path="registrera" element={<UserRegistration />} />
        <Route path="skapa-ny-omgång" element={<RoundCreator />} />
        <Route path="alla-omgångar" element={<RoundsDisplay />} />
        <Route path="rätta-omgång" element={<CorrectionRound />} />
        <Route path="omgång-veckovis" element={<WeeklySnapshot />} />
        <Route path="omgång-veckovis/:roundid" element={<RoundInfo />} />
        <Route path="inställningar" element={<Settings />} />
        <Route path="vinstfördelning" element={<PrizeBreakdown />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
