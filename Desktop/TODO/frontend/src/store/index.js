import { createSlice,configureStore } from '@reduxjs/toolkit'

const storedUserId = localStorage.getItem("userId") || "";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUserId,
    isLoggedIn: Boolean(storedUserId),
  },
  reducers: {
    login(state, action) {
        state.isLoggedIn = true;
        state.user = action.payload || state.user;
    },
    logout(state) {
        state.isLoggedIn = false;
        state.user = "";
    }
  }
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: authSlice.reducer
});

export default store;
