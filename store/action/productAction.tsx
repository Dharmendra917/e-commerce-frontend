import axios from "@/utils/axios";
import toast from "react-hot-toast";

export const asyncAddProducts: any =
  (productInfo: any, token: string) => async (dispatch: any) => {
    try {
      const data = await axios.post(
        "/api/v1/products/add-product",
        productInfo,
        {
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const asyncUpdateProducts: any =
  (updateInfo: any, productId: any, token: any) => async (dispatch: any) => {
    try {
      const data = await axios.post(
        `/api/v1/products/update/${productId}`,
        updateInfo,
        {
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const asyncDeleteProducts: any =
  (productId: any, token: string) => async (dispatch: any) => {
    try {
      const { data }: any = await axios.get(
        `/api/v1/products/delete/${productId}`,
        {
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const asyncShowProducts: any = () => async (dispatch: any) => {
  try {
    const { data }: any = await axios.get("/api/v1/products/read");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const asyncSingleProducts: any = () => async (dispatch: any) => {
  try {
    const productId = "";
    const data = axios.get(`/api/v1/products/single/${productId}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
