/* eslint-disable react/prop-types */
import { useState } from "react";
import { FormattedDate } from "../functions/FormattedDate";
import "./UserUpdateForm.css";
import { UpdateUser } from "../API/UpdateUser";

export function UserUpdateForm({ updateUser, updateUserInList }) {
  const [responseFromUpdate, setResponseFromUpdate] = useState();
  const [user, setUser] = useState({
    Id: updateUser.id,
    firstname: updateUser.firstname,
    lastname: updateUser.lastname,
    email: updateUser.email,
    phone: updateUser.phone,
    hasPaid: updateUser.hasPaid,
    coupon: updateUser.coupon,
    userCreated: updateUser.userCreated,
    userRenewed: FormattedDate(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseFromUpdate(await UpdateUser(user));
    updateUserInList(user);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="textfields">
          <label>
            Förnamn:
            <input
              className="inputTextBox"
              value={user.firstname}
              type="text"
              name="firstname"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Efternamn:
            <input
              className="inputTextBox"
              value={user.lastname}
              type="text"
              name="lastname"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              className="inputTextBox"
              value={user.email}
              type="email"
              name="email"
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              className="inputTextBox"
              value={user.phone}
              type="text"
              name="phone"
              onChange={handleChange}
            />
          </label>
          <label>
            Har betalat:
            <select
              defaultValue={user.hasPaid}
              className="inputSelect"
              name="hasPaid"
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
