import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import adminReducer from "./reducer/adminReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
