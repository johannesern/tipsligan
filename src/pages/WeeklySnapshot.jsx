import { useEffect } from "react";
import "./WeeklySnapshot.css";
import GetAllWeekly from "../API/GetAllWeekly";
import DeleteWeekly from "../API/DeleteWeekly";
import useStore from "../store/useStore";

const WeeklySnapshot = () => {
  //Store
  const addWeeklys = useStore((state) => state.addWeeklySnapshots);
  const weeklysInStore = useStore((state) => state.weeklySnapshotsCollection);

  //First time loading
  useEffect(() => {
    getWeeklys();
  }, []);

  useEffect(() => {}, [weeklysInStore]);

  const getWeeklys = async () => {
    const data = await GetAllWeekly();
    addWeeklys(data);
  };

  const handleDeleteClick = async (id) => {
    await DeleteWeekly(id);
    getWeeklys();
  };

  return (
    <main>
      <ul className="users-list">
        {weeklysInStore ? (
          weeklysInStore?.map((weekly) => (
            <li className="list-item" key={weekly.id || weekly.Id}>
              <div className="weeklys">
                <div>{weekly.round.title}</div>
                <div>{weekly.createdAt}</div>
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
