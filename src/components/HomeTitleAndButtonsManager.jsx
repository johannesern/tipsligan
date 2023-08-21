import { useState, useEffect } from "react";
import GetAllRounds from "../API/GetAllRounds";
import CheckRound from "../functions/CheckRound";
import HomeButtons from "./HomeButtons";

export default function HomeTitleAndButtons() {
  const [round, setRound] = useState();
  const [title, setTitle] = useState("");
  const [buttonData, setButtonData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const openForRegistration = " öppen för registrering!";
  const ongoingButLocked = "pågår och är låst för registrering.";
  const noRoundAvailable = "Ingen pågående omgång.";
  // console.log("Round:", round);

  useEffect(() => {
    try {
      let breakInfiniteLoop = 0;
      const siteUpdate = async () => {
        const data = await GetAllRounds();
        // console.log("Data from api:", data);
        if (data != null && data !== undefined) {
          const updatePage = await CheckRound(data.round);
          if (updatePage) {
            breakInfiniteLoop++;
            if (breakInfiniteLoop === 3) {
              setErrorMessage("Något gick fel vid uppdatering. Försök igen.");
            } else {
              siteUpdate();
            }
          } else {
            // console.log("Data here?", data);
            setRound(data.round);
            passRoundToButtons();
            if (data.round.isOpen && data.round.isActive) {
              setTitle(data.round.title + " " + openForRegistration);
            } else if (data.round.isOpen === false && data.round.isActive) {
              setTitle(data.round.title + " " + ongoingButLocked);
            }
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
      {errorMessage != null ? <h1>{errorMessage}</h1> : <></>}
      <div>
        {round != null ? <h2>{title}</h2> : <h2>{noRoundAvailable}</h2>}
        <br />
        <HomeButtons passRoundToButtons={round} />
      </div>
    </>
  );
}
