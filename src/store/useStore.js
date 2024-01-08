/* eslint-disable no-unused-vars */
import { create } from "zustand";

const useStore = create((set) => ({
    //Round
    roundActive: {},
    roundToUpdate: {},
    roundsCollection: [],
    addRoundActive: (round) => set((state) => ({ roundActive: round })),
    addRoundToUpdate: (round) => set((state) => ({ roundToUpdate: round })),
    addRounds: (rounds) =>
        set((state) => ({ roundsCollection: rounds })),
    clearActiveRound: () => set((state) => ({ roundActive: {} })),

    //Users
    filteredUsersCollection: [],
    userDataModelsCollection: [],
    addUserDataModels: (userDataModels) => set((state) => ({ userDataModelsCollection: userDataModels })),
    addfilteredUsers: (users) =>
        set((state) => ({ filteredUserCollection: users })),

    //Weeklys
    weeklySnapshot: {},
    weeklySnapshotsCollection: [],
    addWeeklySnapshot: (snapshot) => set((state) => ({ weeklySnapshot: snapshot })),
    addWeeklySnapshots: (snapshots) => set((state) => ({ weeklySnapshotsCollection: snapshots })),
    clearWeeklySnapshot: () => set((state) => ({ weeklySnapshot: {} })),

    //Settings
    settings: {},
    addSettings: (settings) => set((state) => ({ settings: settings })),
    clearSettings: () => set((state) => ({ settings: {} })),

    //Tokens
    adminToken: "",
    userToken: "",
    addAdminToken: (token) => set((state) => ({ adminToken: token })),
    addUserToken: (token) => set((state) => ({ userToken: token })),

    // clearCollection: (collection) => set((state) => ({ collection: [] })),
}));

export default useStore;