import axios from "@/utils/axios";
import { adduser, removeuser, isadmin } from "../reducer/userReducer";
import toast from "react-hot-toast";

export const asyncSignup: any = (info: any) => async (dispatch: any) => {
  try {
    const { data } = await axios.post("/api/v1/user/signup", info);
    localStorage.setItem("token", data.token);
    dispatch(asyncCurrentUser());
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const asyncCurrentUser: any =
  () => async (dispatch: any, getState: any) => {
    try {
      const { data } = await axios.post("/api/v1/user/current");
      if (data.user.role === "admin") {
        dispatch(isadmin());
      }
      dispatch(adduser(data.user));
      return true;
    } catch (error: any) {
      console.log(error.response.data);
      return false;
    }
  };

export const asyncSigninUser: any =
  (loginData: {}) => async (dispatch: any, getState: any) => {
    try {
      // console.log(loginData, "action");
      const { data }: any = await axios.post("api/v1/user/signin", loginData);
      localStorage.setItem("token", data.token);
      dispatch(asyncCurrentUser());
      return true;
    } catch (error: any) {
      console.log(error.response.data);
      return false;
    }
  };

export const asyncSignoutUser: any =
  () => async (dispatch: any, getState: any) => {
    try {
      const { data } = await axios.get("/api/v1/user/signout/");
      console.log(data, "signout");
      dispatch(removeuser);
      localStorage.removeItem("token");
    } catch (error: any) {
      console.log(error);
    }
  };

export const asyncAddToCart: any =
  (cId: string, pId: string) => async (dispatch: any, getState: any) => {
    try {
      console.log(cId, pId);
      const { data } = await axios.post(`/api/v1/user/add-to-cart/${cId}`, {
        productId: pId,
      });
      dispatch(asyncCurrentUser());
    } catch (error: any) {
      console.log(error);
    }
  };
