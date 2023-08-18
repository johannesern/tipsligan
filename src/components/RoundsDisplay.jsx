import { useEffect, useState } from "react";
import GetAllRounds from "../API/GetAllRounds";

const RoundsDisplay = () => {
  const [round, setRound] = useState();
  const noActiveRound = "Ingen aktiv omgång";

  useEffect(() => {
    const getAllRounds = async () => {
      const data = await GetAllRounds();
      console.log("Data:", data);
      setRound(data);
    };
    getAllRounds();
  }, []);

  return (
    <main>
      {round != null ? <h1>{round.title}</h1> : <div>{noActiveRound}</div>}
      <ol></ol>
    </main>
  );
};

export default RoundsDisplay;
