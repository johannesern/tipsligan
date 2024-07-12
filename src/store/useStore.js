/* eslint-disable no-unused-vars */
import { create } from "zustand";
import Cookies from "js-cookie";

const useStore = create((set) => ({
  //Round
  roundActive: {},
  roundToUpdate: {},
  roundsCollection: [],
  addRoundActive: (round) => set((state) => ({ roundActive: round })),
  addRoundToUpdate: (round) => set((state) => ({ roundToUpdate: round })),
  addRounds: (rounds) => set((state) => ({ roundsCollection: rounds })),
  clearActiveRound: () => set((state) => ({ roundActive: {} })),
  clearRoundToUpdate: () => set((state) => ({ roundToUpdate: {} })),
  clearRounds: () => set((state) => ({ roundsCollection: [] })),

  //Users
  // filteredUsersCollection: [],
  userDataModelsCollection: [],
  addUserDataModels: (userDataModels) =>
    set((state) => ({ userDataModelsCollection: userDataModels })),
  // addfilteredUsers: (users) =>
  //     set((state) => ({ filteredUserCollection: users })),

  //Weeklys
  weeklySnapshot: {},
  weeklySnapshotsCollection: [],
  addWeeklySnapshot: (snapshot) =>
    set((state) => ({ weeklySnapshot: snapshot })),
  addWeeklySnapshots: (snapshots) =>
    set((state) => ({ weeklySnapshotsCollection: snapshots })),
  clearWeeklySnapshot: () => set((state) => ({ weeklySnapshot: {} })),
  clearWeeklySnapshots: () =>
    set((state) => ({ weeklySnapshotsCollection: [] })),

  //Settings
  settings: {},
  addSettings: (settings) => set((state) => ({ settings: settings })),
  clearSettings: () => set((state) => ({ settings: {} })),

  //Tokens
  userRoles: [],
  userToken: "",
  user: {},
  addUserRoles: (token) => set((state) => ({ userRoles: token })),
  addUserToken: (token) => set((state) => ({ userToken: token })),
  addUser: (user) => set((state) => ({ user: user })),
  clearUserRoles: () => set((state) => ({ userRoles: [] })),
  clearUserToken: () => set((state) => ({ userToken: "" })),
  clearUser: () => set((state) => ({ user: {} })),

  // clearCollection: (collection) => set((state) => ({ collection: [] })),
}));

export default useStore;

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  userRoles: JSON.parse(localStorage.getItem("userRoles")) || [],
  allUsers: [],
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user)); // Save to localStorage
  },
  setAllUsers: (users) => {
    set({ allUsers: users });
    localStorage.setItem("allUsers", JSON.stringify(users)); // Save to localStorage
  },
  setRoles: (roles) => {
    set({ userRoles: roles });
    localStorage.setItem("userRoles", JSON.stringify(roles)); // Save to localStorage
  },
  updateUser: (updates) =>
    set((state) => {
      // console.log("updates", updates);
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Save to localStorage
      return { user: updatedUser };
    }),
  clearUser: () => {
    set({ user: null });
    set({ userRoles: [] });
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
    Cookies.remove("userToken");
  },
  clearAllUsers: () => {
    set({ allUsers: [] });
    localStorage.removeItem("allUsers"); // Remove from localStorage
  },
}));

export { useUserStore };

const useRoundStore = create((set) => ({
  round: {},
  rounds: [],
  setRound: (round) => set({ round }),
  setRounds: (rounds) => set({ rounds }),
  updateRound: (updates) =>
    set((state) => {
      const updatedRound = { ...state.round, ...updates };
      return { round: updatedRound };
    }),
  clearRound: () => {
    set({ round: {} });
    localStorage.removeItem("round");
  },
  clearRounds: () => set({ rounds: [] }),
}));

export { useRoundStore };

const useAssociationStore = create((set) => ({
  association: {},
  setAssociation: (association) => set({ association }),
  updateAssociation: (updates) =>
    set((state) => {
      const updatedAssociation = { ...state.association, ...updates };
      return { association: updatedAssociation };
    }),
  clearAssociation: () => {
    set({ association: {} });
    localStorage.removeItem("association");
  },
}));

export { useAssociationStore };
