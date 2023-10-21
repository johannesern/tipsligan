/* eslint-disable no-unused-vars */
import { create } from "zustand";

const useStore = create((set) => ({
    userDataModelsCollection: [],

    filteredUsersCollection: [],

    roundsCollection: [],

    roundActive: {},

    roundToUpdate: {},

    addRoundActive: (round) => set((state) => ({ roundActive: round })),

    addRoundToUpdate: (round) => set((state) => ({ roundToUpdate: round })),

    addUserDataModels: (userDataModels) => set((state) => ({ userDataModelsCollection: userDataModels })),

    addfilteredUsers: (users) =>
        set((state) => ({ filteredUserCollection: users })),

    addRounds: (rounds) =>
        set((state) => ({ roundsCollection: rounds })),

    // clearCollection: (collection) => set((state) => ({ collection: [] })),
}));

export default useStore;