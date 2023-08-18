import { Outlet } from "react-router-dom";

export default function Highscore() {
  return (
    <>
      <h1>Topplista för denna omgång!</h1>
      <Outlet />
    </>
  );
}
