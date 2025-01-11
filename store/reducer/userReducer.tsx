import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
  user: any;
  errors: [];
  isAuthenticated: Boolean;
  isAdmin: Boolean;
}

const initialState: State = {
  user: null,
  errors: [],
  isAuthenticated: false,
  isAdmin: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeuser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    isadmin: (state) => {
      state.isAdmin = true;
    },
  },
});

export const { adduser, removeuser, isadmin } = userReducer.actions;

export default userReducer.reducer;
