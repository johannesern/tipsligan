import { useState } from "react";
import GetAllUsers from "../API/GetAllUsers";
import { DeleteUser } from "../API/DeleteUser";
import "./Userdisplay.css";
import { UserUpdateForm } from "../components/UserUpdateForm";

const Userdisplay = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [openFormIds, setOpenFormIds] = useState([]);

  const handleFetchUsers = async () => {
    const data = await GetAllUsers();
    setUsers(data);
  };

  const handleToggleForm = (user) => {
    if (openFormIds.includes(user.id)) {
      setOpenFormIds(openFormIds.filter((id) => id !== user.id));
    } else {
      setOpenFormIds([...openFormIds, user.id]);
      incomingUser(user);
    }
  };

  const incomingUser = (user) => {
    setUser(user);
  };

  const handleDelete = async (userId) => {
    await DeleteUser(userId);
    await handleFetchUsers();
  };

  return (
    <main>
      <button onClick={handleFetchUsers}>Hämta användare</button>
      <ul>
        {users != null ? (
          users.map((user) => (
            <li className="list-item" key={user.id}>
              {" "}
              <h3>{user.firstname}</h3>
              {openFormIds.includes(user.id) && (
                <UserUpdateForm incomingUser={user} />
              )}
              <div className="user-buttons">
                <button name="edit" onClick={() => handleToggleForm(user)}>
                  Ändra
                </button>
                <button name="delete" onClick={() => handleDelete(user.id)}>
                  Ta bort
                </button>
              </div>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </main>
  );
};

export default Userdisplay;
