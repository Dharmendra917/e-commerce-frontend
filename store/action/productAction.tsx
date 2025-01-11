import axios from "@/utils/axios";
import toast from "react-hot-toast";

export const asyncAddProducts: any =
  (productInfo: any) => async (dispatch: any) => {
    try {
      console.log(productInfo, "ac prod ad");
      const data = await axios.post(
        "/api/v1/products/add-product",
        productInfo
      );
      console.log(data);
      // return data;
    } catch (error) {
      console.log(error);
    }
  };

export const asyncUpdateProducts: any =
  (updateInfo: any, productId: any) => async (dispatch: any) => {
    try {
      console.log(updateInfo, "action updat", productId);

      const data = await axios.post(
        `/api/v1/products/update/${productId}`,
        updateInfo
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const asyncDeleteProducts: any =
  (productId: any) => async (dispatch: any) => {
    try {
      const { data }: any = await axios.get(
        `/api/v1/products/delete/${productId}`
      );
      console.log(data);
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
