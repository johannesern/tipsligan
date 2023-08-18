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
  console.log("Round:", round);

  // useEffect(() => {
  //   try {
  //     let breakInfiniteLoop = 0;
  //     const siteUpdate = async () => {
  //       const data = await GetAllRounds();
  //       console.log("Data from api:", data);
  //       if (data != null && data !== undefined) {
  //         const updatePage = await CheckRound(data);
  //         if (updatePage) {
  //           breakInfiniteLoop++;
  //           if (breakInfiniteLoop === 3) {
  //             setErrorMessage("Något gick fel vid uppdatering. Försök igen.");
  //           } else {
  //             siteUpdate();
  //           }
  //         } else {
  //           console.log("Data here?", data);
  //           setRound(data);
  //           passRoundToButtons();
  //           if (data.isOpen && data.isActive) {
  //             setTitle(data.title + " " + openForRegistration);
  //           } else if (data.isOpen === false && data.isActive) {
  //             setTitle(data.title + " " + ongoingButLocked);
  //           }
  //         }
  //       } else {
  //         setTitle(noRoundAvailable);
  //       }
  //     };
  //     siteUpdate();
  //   } catch (error) {
  //     setTitle(noRoundAvailable);
  //     console.error(error);
  //   }
  // }, []);

  const insteadOfUseEffect = () => {
    try {
      let breakInfiniteLoop = 0;
      const siteUpdate = async () => {
        const data = await GetAllRounds();
        console.log("Data from api:", data);
        if (data != null && data !== undefined) {
          const updatePage = await CheckRound(data);
          if (updatePage) {
            breakInfiniteLoop++;
            if (breakInfiniteLoop === 3) {
              setErrorMessage("Något gick fel vid uppdatering. Försök igen.");
            } else {
              siteUpdate();
            }
          } else {
            console.log("Data here?", data);
            setRound(data);
            passRoundToButtons();
            if (data.isOpen && data.isActive) {
              setTitle(data.title + " " + openForRegistration);
            } else if (data.isOpen === false && data.isActive) {
              setTitle(data.title + " " + ongoingButLocked);
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
  };

  const passRoundToButtons = () => {
    setButtonData(round);
  };

  return (
    <>
      {errorMessage != null ? <h1>{errorMessage}</h1> : <></>}
      <div>
        {round != null ? <h2>{title}</h2> : <h2>{noRoundAvailable}</h2>}
        <br />
        <button onClick={insteadOfUseEffect}>Testa hämta rundor</button>
        <br />
        <HomeButtons passRoundToButtons={round} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit molestiae
          dignissimos voluptates vero placeat incidunt unde, sequi, facere atque
          quam, quos corrupti cum mollitia officia tempora a cupiditate
          voluptate accusantium.
        </p>
      </div>
    </>
  );
}
