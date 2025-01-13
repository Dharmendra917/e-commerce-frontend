import axios from "@/utils/axios";
import { adduser, removeuser, isadmin } from "../reducer/userReducer";
import toast from "react-hot-toast";

export const asyncSignup: any = (info: any) => async (dispatch: any) => {
  try {
    const { data } = await axios.post("/api/v1/user/signup", info);
    localStorage.setItem("token", data.token);
    dispatch(asyncCurrentUser(data.token));
  } catch (error) {
    console.log(error);
  }
};

export const asyncCurrentUser: any =
  (token: any) => async (dispatch: any, getState: any) => {
    try {
      const { data } = await axios.post(
        "/api/v1/user/current",
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
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
  (loginData: {}, token: string) => async (dispatch: any, getState: any) => {
    try {
      const { data }: any = await axios.post("api/v1/user/signin", loginData);
      localStorage.setItem("token", data.token);
      dispatch(asyncCurrentUser(data.token));
      return true;
    } catch (error: any) {
      console.log(error.response.data);
      return false;
    }
  };

export const asyncSignoutUser: any =
  (token: string) => async (dispatch: any, getState: any) => {
    try {
      const { data } = await axios.get("/api/v1/user/signout/", {
        headers: {
          Authorization: `${token}`,
        },
      });
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
