import { useState, useEffect } from "react";
import "./WeeklySnapshot.css";
import GetAllWeekly from "../API/GetAllWeekly";
import DeleteWeekly from "../API/DeleteWeekly";

const WeeklySnapshot = () => {
  const [weeklys, setWeekly] = useState();

  //First time loading
  useEffect(() => {
    getWeeklys();
  }, []);

  const getWeeklys = async () => {
    const data = await GetAllWeekly();
    setWeekly(data);
  };

  const handleDeleteClick = async (id) => {
    await DeleteWeekly(id);
    setWeekly(weeklys);
  };

  useEffect(() => {
    console.log(weeklys);
  }, [weeklys]); //DU FÖRSÖKER FÅ WEEKLY ATT UPPDATERAS DIREKT

  return (
    <main>
      <ul className="users-list">
        {weeklys != null ? (
          weeklys.map((weekly) => (
            <li className="list-item" key={weekly.id || weekly.Id}>
              <div className="weeklys">
                <div>{weekly.round.title}</div>
                <div>{weekly.createdAt}</div>
                {/* <ul>
                  {weekly.weeklyUserResults != null
                    ? weekly.weeklyUserResults.map((user) => (
                        <li key={user.id}>
                          <div>{user.firstname}</div>
                          <div>{user.points}</div>
                        </li>
                      ))
                    : ""}
                </ul> */}

                <div className="user-buttons">
                  <button
                    name="delete"
                    onClick={() => handleDeleteClick(weekly.id)}
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

export default WeeklySnapshot;
