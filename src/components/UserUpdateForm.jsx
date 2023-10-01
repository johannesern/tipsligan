/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FormattedDate } from "../functions/FormattedDate";
import "./UserUpdateForm.css";
import { UpdateUser } from "../API/UpdateUser";

export function UserUpdateForm({ updateUser }) {
  const [responseFromUpdate, setResponseFromUpdate] = useState();
  const [data, setData] = useState({
    Id: updateUser.id,
    Firstname: updateUser.firstname,
    Lastname: updateUser.lastname,
    Email: updateUser.email,
    Phone: updateUser.phone,
    HasPaid: updateUser.hasPaid,
    Coupon: updateUser.coupon,
    UserCreated: updateUser.userCreated,
    UserRenewed: FormattedDate(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    console.log("Update response:", responseFromUpdate);
  }, [responseFromUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseFromUpdate(await UpdateUser(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="textfields">
          <label>
            Förnamn:
            <input
              className="inputTextBox"
              value={data.Firstname}
              type="text"
              name="Firstname"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Efternamn:
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
          <label>
            Har betalat:
            <select
              defaultValue={data.HasPaid}
              className="inputSelect"
              name="HasPaid"
              onChange={handleChange}
            >
              <option value={true}>Ja</option>
              <option value={false}>Nej</option>
            </select>
          </label>
        </div>
        <button type="submit">Uppdatera användare</button>
      </form>
    </>
  );
}
