import { useState, useEffect } from "react";
import "./WeeklySnapshot.css";
import { GetAllWeekly } from "../API/WeeklysAPI";
import { DeleteWeekly } from "../API/WeeklysAPI";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

const WeeklySnapshot = () => {
  //Store
  const addWeeklys = useStore((state) => state.addWeeklySnapshots);
  const weeklysInStore = useStore((state) => state.weeklySnapshotsCollection);

  const navigate = useNavigate();

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
      <table className="userdisplay_table-content">
        <tbody>
          {weeklysInStore != null ? (
            weeklysInStore.map((weeklyInStore) => (
              <tr
                className="userdisplay_user-list-item"
                onClick={() =>
                  navigate(`/admin/omgång-veckovis/${weeklyInStore.round.id}`)
                }
                key={weeklyInStore.id}
              >
                <td>
                  <h3>{weeklyInStore.round.title}</h3>
                </td>
                <td className="userdisplay_list-button">
                  <button
                    name="delete"
                    onClick={(e) => {
                      handleDeleteClick(weeklyInStore.id);
                      e.stopPropagation();
                    }}
                  >
                    Ta bort
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>Loading...</tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default WeeklySnapshot;
