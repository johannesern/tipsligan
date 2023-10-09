import { useState, useEffect } from "react";
import GetAllUsers from "../API/GetAllUsers";
import { DeleteUser } from "../API/DeleteUser";
import "./Userdisplay.css";
import { UserUpdateForm } from "../components/UserUpdateForm";

const Userdisplay = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [openFormIds, setOpenFormIds] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  //First time loading
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await GetAllUsers();
    setUsers(data);
  };

  const update = (user) => {
    setUser(user);
  };

  //Update loader
  const updateUserInList = async () => {
    await getUsers();
  };

  useEffect(() => {}, [users]);

  //Handle functions
  const handleToggleForm = (user) => {
    if (openFormIds.includes(user.id)) {
      setOpenFormIds(openFormIds.filter((id) => id !== user.id));
    } else {
      setOpenFormIds([...openFormIds, user.id]);
      update(user);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedUser(id);
    setIsConfirmationVisible(!isConfirmationVisible);
  };

  const handleConfirm = async (remove) => {
    if (remove === "true") {
      await DeleteUser(selectedUser);
      setIsConfirmationVisible(!isConfirmationVisible);
      await getUsers();
    }
    setIsConfirmationVisible(!isConfirmationVisible);
  };

  return (
    <main>
      {isConfirmationVisible && (
        <>
          <div className="confirmation-buttons">
            <button onClick={() => handleConfirm("true")}>Ja</button>
            <button onClick={() => handleConfirm("false")}>Nej</button>
          </div>
        </>
      )}
      <ul className="users-list">
        {users != null ? (
          users.map((user) => (
            <li className="list-item" key={user.id || user.Id}>
              {" "}
              <div className="user-list-item">
                <h3>{user.firstname}</h3>
                {openFormIds.includes(user.id) && (
                  <UserUpdateForm
                    updateUser={user}
                    updateUserInList={updateUserInList}
                  />
                )}
                <div className="user-buttons">
                  <button name="edit" onClick={() => handleToggleForm(user)}>
                    Ändra
                  </button>
                  <button
                    name="delete"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Ta bort
                  </button>
                </div>
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
