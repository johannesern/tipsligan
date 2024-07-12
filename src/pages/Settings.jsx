import "./Settings.css";
import { useState, useEffect } from "react";
import { useAssociationStore } from "../store/useStore";
import { GetSettings } from "../API/SettingsAPI";
import { UpdateSettings } from "../API/SettingsAPI";

export default function Settings() {
  const [correctSum, setCorrectSum] = useState(true);
  const [message, setMessage] = useState("");
  //Store
  const { association, setAssociation, updateAssociation } =
    useAssociationStore();
  const [playersExample, setPlayersExample] = useState(100);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const data = await GetSettings();
    setAssociation(data);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (
      name === "association_share" ||
      name === "winner_share" ||
      name === "second_share" ||
      name === "third_share" ||
      name === "price_per_share"
    ) {
      value = parseInt(value);
    }
    updateAssociation({ [name]: value });
  };

  useEffect(() => {
    calculatePlayerShare();
  }, [association]);

  const calculatePlayerShare = () => {
    return 100 - association.association_share;
  };

  const handleSave = async () => {
    const response = await UpdateSettings(association);
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
    return (
      parseInt(association.price_per_share || 0) * parseInt(playersExample)
    );
  };

  const calcExampleAssociationShare = () => {
    return calcExampleSumShares() * (association.association_share / 100);
  };

  const calcExamplePlayerShare = () => {
    return calcExampleSumShares() - calcExampleAssociationShare();
  };

  const leftToDistribute = () => {
    const playersSum =
      (parseInt(association.winner_share) || 0) +
      (parseInt(association.second_share) || 0) +
      (parseInt(association.third_share) || 0);

    const remaining = calcExamplePlayerShare() - playersSum;

    return remaining;
  };

  return (
    <>
      <main className="settings_main-content">
        <section>
          <h2>Inställningar</h2>
          <br />
          {association ? (
            <div>
              <h1>{association.association_title}</h1>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>Fördelning till förening:</td>
                      <td>
                        <input
                          className="input-field"
                          value={association.association_share || ""}
                          type="text"
                          name="association_share"
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
                          name="player_share"
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
                          value={association.price_per_share || ""}
                          type="text"
                          name="price_per_share"
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
                          value={association.winner_share || ""}
                          type="text"
                          name="winner_share"
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
                          value={association.second_share || ""}
                          type="text"
                          name="second_share"
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
                          value={association.third_share || ""}
                          type="text"
                          name="third_share"
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
                  <td>{association.winner_share}</td>
                  <td>kr</td>
                </tr>
                <tr>
                  <td>
                    <label>Till andraplats:</label>
                  </td>
                  <td>{association.second_share}</td>
                  <td>kr</td>
                </tr>
                <tr>
                  <td>
                    <label>Till tredjeplats:</label>
                  </td>
                  <td>{association.third_share}</td>
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
