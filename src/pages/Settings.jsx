import "./Settings.css";
import { useState, useEffect } from "react";
import useStore from "../store/useStore";
import { GetSettings } from "../API/SettingsAPI";
import { UpdateSettings } from "../API/SettingsAPI";

export default function Settings() {
  const [tmpSettings, setTmpSettings] = useState({});
  const [correctSum, setCorrectSum] = useState(true);
  const [message, setMessage] = useState("");
  //Store
  const addSettings = useStore((state) => state.addSettings);
  const [playersExample, setPlayersExample] = useState(100);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const data = await GetSettings();
    addSettings(data[0]);
    setTmpSettings(data[0]);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (
      name === "winnerShare" ||
      name === "secondShare" ||
      name === "thirdShare"
    ) {
      value = parseInt(value);
    }
    setTmpSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  };

  useEffect(() => {
    calculatePlayerShare();
  }, [tmpSettings]);

  const calculatePlayerShare = () => {
    return 100 - tmpSettings.associationShare;
  };

  const handleSave = async () => {
    const newSettings = {
      ...tmpSettings,
      modifiedAt: new Date().toISOString(),
    };
    const response = await UpdateSettings(newSettings);
    if (response.ok) {
      setMessage("Inställningarna sparade!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      setMessage("Kunde inte spara inställningarna...");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
    getSettings();
  };

  const handleCalcExampleChange = (e) => {
    let value = parseInt(e.target.value);
    setPlayersExample(value);
  };

  const calcExampleSumShares = () => {
    return parseInt(tmpSettings.pricePerShare) * parseInt(playersExample);
  };

  const calcExampleAssociationShare = () => {
    return calcExampleSumShares() * (tmpSettings.associationShare / 100);
  };

  const calcExamplePlayerShare = () => {
    return calcExampleSumShares() - calcExampleAssociationShare();
  };

  const leftToDistribute = () => {
    const playersSum =
      (parseInt(tmpSettings.winnerShare) || 0) +
      (parseInt(tmpSettings.secondShare) || 0) +
      (parseInt(tmpSettings.thirdShare) || 0);

    const remaining = calcExamplePlayerShare() - playersSum;

    return remaining;
  };

  return (
    <>
      <main className="settings_main-content">
        <section>
          <h2>Inställningar</h2>
          <br />
          {tmpSettings ? (
            <div>
              <h1>{tmpSettings.associationTitle}</h1>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>Fördelning till förening:</td>
                      <td>
                        <input
                          className="input-field"
                          value={tmpSettings.associationShare || ""}
                          type="text"
                          name="associationShare"
                          onChange={handleChange}
                        />
                      </td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td>Fördelning till spelare:</td>
                      <td>
                        <input
                          className="input-field"
                          value={calculatePlayerShare() || ""}
                          type="text"
                          name="playerShare"
                          onChange={handleChange}
                          disabled
                        />
                      </td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td>Pris per andel:</td>
                      <td>
                        <input
                          className="input-field"
                          value={tmpSettings.pricePerShare || ""}
                          type="text"
                          name="pricePerShare"
                          onChange={handleChange}
                        />
                      </td>
                      <td>kr</td>
                    </tr>
                    <tr>
                      <td>Vinnarpott:</td>
                      <td>
                        <input
                          className="input-field"
                          value={tmpSettings.winnerShare || ""}
                          type="text"
                          name="winnerShare"
                          onChange={handleChange}
                        />
                      </td>
                      <td>kr</td>
                    </tr>
                    <tr>
                      <td>Andraplats:</td>
                      <td>
                        <input
                          className="input-field"
                          value={tmpSettings.secondShare || ""}
                          type="text"
                          name="secondShare"
                          onChange={handleChange}
                        />
                      </td>
                      <td>kr</td>
                    </tr>
                    <tr>
                      <td>Tredjeplats:</td>
                      <td>
                        <input
                          className="input-field"
                          value={tmpSettings.thirdShare || ""}
                          type="text"
                          name="thirdShare"
                          onChange={handleChange}
                        />
                      </td>
                      <td>kr</td>
                    </tr>
                  </tbody>
                </table>
                {correctSum && (
                  <button
                    type="button"
                    className={
                      "settings-save-btn" + (correctSum ? "" : " disabled")
                    }
                    onClick={handleSave}
                  >
                    Spara
                  </button>
                )}
                {message && <div>{message}</div>}
              </div>
            </div>
          ) : (
            <>Laddar...</>
          )}
        </section>
        <section>
          <h3>Exempeluträkning</h3>
          <br />
          <br />
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Antal deltagare:</td>
                  <td>
                    <input
                      className="input-field"
                      value={playersExample || ""}
                      type="text"
                      name="playersExample"
                      onChange={handleCalcExampleChange}
                    />
                  </td>
                  <td>st</td>
                </tr>
                <tr>
                  <td>
                    <label>Total summa :</label>
                  </td>
                  <td>{calcExampleSumShares()}</td>
                  <td>kr</td>
                </tr>
                <tr>
                  <td>
                    <label>Till föreningen:</label>
                  </td>
                  <td>{calcExampleAssociationShare()}</td>
                  <td>kr</td>
                </tr>
                <tr>
                  <td>
                    <label>Till spelarna:</label>
                  </td>
                  <td>{calcExamplePlayerShare()}</td>
                  <td>kr</td>
                </tr>
                <tr>
                  <td>
                    <label>Till förstaplats:</label>
                  </td>
                  <td>{tmpSettings.winnerShare}</td>
                  <td>kr</td>
                </tr>
                <tr>
                  <td>
                    <label>Till andraplats:</label>
                  </td>
                  <td>{tmpSettings.secondShare}</td>
                  <td>kr</td>
                </tr>
                <tr>
                  <td>
                    <label>Till tredjeplats:</label>
                  </td>
                  <td>{tmpSettings.thirdShare}</td>
                  <td>kr</td>
                </tr>
                <tr>
                  <td>
                    <label>Kvar att fördela:</label>
                  </td>
                  <td>{leftToDistribute()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
