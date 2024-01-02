import "./Settings.css";
import { useState, useEffect } from "react";
import GetSettings from "../API/GetSettings";
import useStore from "../store/useStore";
import UpdateSettings from "../API/UpdateSettings";
import { FormattedDate } from "../functions/FormattedDate";

export default function Settings() {
  const [tmpSettings, setTmpSettings] = useState({});
  const [correctSum, setCorrectSum] = useState(true);
  const [message, setMessage] = useState("");
  //Store
  const addSettings = useStore((state) => state.addSettings);

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
    setCorrectSum(checkSum());
  }, [tmpSettings]);

  const calculatePlayerShare = () => {
    return 100 - tmpSettings.associationShare;
  };

  const checkSum = () => {
    if (
      parseInt(tmpSettings.winnerShare) +
        parseInt(tmpSettings.secondShare) +
        parseInt(tmpSettings.thirdShare) ===
      100
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSave = async () => {
    const newSettings = {
      ...tmpSettings,
      modifiedAt: FormattedDate(new Date()),
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

  return (
    <>
      <br />
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
                  <td>Vinnare får % av potten:</td>
                  <td>
                    <input
                      className={
                        "input-field" + (correctSum ? "" : " settings-error")
                      }
                      value={tmpSettings.winnerShare || ""}
                      type="text"
                      name="winnerShare"
                      onChange={handleChange}
                    />
                  </td>
                  <td>%</td>
                </tr>
                <tr>
                  <td>Andraplats får % av potten:</td>
                  <td>
                    <input
                      className={
                        "input-field" + (correctSum ? "" : " settings-error")
                      }
                      value={tmpSettings.secondShare || ""}
                      type="text"
                      name="secondShare"
                      onChange={handleChange}
                    />
                  </td>
                  <td>%</td>
                </tr>
                <tr>
                  <td>Tredjeplats får % av potten:</td>
                  <td>
                    <input
                      className={
                        "input-field" + (correctSum ? "" : " settings-error")
                      }
                      value={tmpSettings.thirdShare || ""}
                      type="text"
                      name="thirdShare"
                      onChange={handleChange}
                    />
                  </td>
                  <td>%</td>
                </tr>
              </tbody>
            </table>
            {!correctSum && (
              <div className="error-color">
                * Summan av dessa skall vara 100
              </div>
            )}
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
    </>
  );
}
