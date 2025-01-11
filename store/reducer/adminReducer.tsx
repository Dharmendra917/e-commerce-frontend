import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
  admin: any;
  errors: [];
  isAuthenticated: Boolean;
}

const initialState: State = {
  admin: null,
  errors: [],
  isAuthenticated: false,
};

export const adminReducer = createSlice({
  name: "admi ",
  initialState,
  reducers: {
    addadmin: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    removeadmin: (state, action) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
    //   iserror: (state, action) => {
    //     state.errors.push(action.payload);
    //   },
    //   removeerror: (state, action) => {
    //     state.errors = [];
    //   },
  },
});

export const { addadmin, removeadmin } = adminReducer.actions;

export default adminReducer.reducer;
