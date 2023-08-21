import { useState } from "react";

export default function RoundCreator() {
  const [title, setTitle] = useState("");
  const handleChange = () => {};

  const handleSubmit = () => {};
  return (
    <>
      <div className="form">
        <h2>Registrera rad</h2>
        <form onSubmit={handleSubmit}>
          <div className="textfields">
            <label>
              Omgång titel:
              <input
                className="inputTextBox"
                value={title}
                type="text"
                name="title"
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Startdatum:
              <input
                className="inputTextBox"
                value={data.Lastname}
                type="text"
                name="Lastname"
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                className="inputTextBox"
                value={data.Email}
                type="email"
                name="Email"
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                className="inputTextBox"
                value={data.Phone}
                type="text"
                name="Phone"
                onChange={handleChange}
              />
            </label>
          </div>
          <br />
          <button type="submit">Skapa omgång</button>
        </form>
      </div>
    </>
  );
}
