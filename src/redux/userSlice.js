import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload.id);
    }
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
