import { useState, useEffect } from "react";
import GetActiveRound from "../API/GetActiveRound";
import HomeButtons from "./HomeButtons";

export default function HomeTopContent() {
  const [round, setRound] = useState();
  const [title, setTitle] = useState("");
  const [buttonData, setButtonData] = useState();
  const openForRegistration = " öppen för registrering!";
  const ongoingButLocked = "pågår och är låst för registrering.";
  const noRoundAvailable = "Ingen pågående omgång.";

  useEffect(() => {
    try {
      const siteUpdate = async () => {
        const round = await GetActiveRound();
        if (round.id != null && round.id !== undefined) {
          setRound(round);
          passRoundToButtons();
          if (round.isOpen && round.isActive) {
            setTitle(round.title + " " + openForRegistration);
          } else if (round.isOpen === false && round.isActive) {
            setTitle(round.title + " " + ongoingButLocked);
          }
        } else {
          setTitle(noRoundAvailable);
        }
      };
      siteUpdate();
    } catch (error) {
      setTitle(noRoundAvailable);
      console.error(error);
    }
  }, []);

  const passRoundToButtons = () => {
    setButtonData(round);
  };

  return (
    <>
      <div>
        {round != null ? <h2>{title}</h2> : <h2>{noRoundAvailable}</h2>}
        <br />
        <HomeButtons passRoundToButtons={round} />
      </div>
    </>
  );
}
