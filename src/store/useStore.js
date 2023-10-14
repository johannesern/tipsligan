/* eslint-disable no-unused-vars */
import { create } from "zustand";

const useStore = create((set) => ({
    usersCollection: [],

    userDataModelsCollection: [],

    filteredUsersCollection: [],

    roundsCollection: [],

    roundToUpdate: {},

    addRoundToUpdate: (round) => set((state) => ({ roundToUpdate: round })),

    addUsers: (users) => set((state) => ({ userCollection: users })),

    addUserDataModels: (userDataModels) => set((state) => ({ usersDataModelsCollection: userDataModels })),

    addfilteredUsers: (users) =>
        set((state) => ({ filteredUserCollection: users })),

    addRounds: (rounds) =>
        set((state) => ({ roundsCollection: rounds })),

    // clearCollection: (collection) => set((state) => ({ collection: [] })),
}));

export default useStore;