import axiosClient from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const fetchProductsApi = async () => {
    const response = await axiosClient.post(`${BASE_URL}/api/getdetailbillbyaccount`,{"accountId":4,"billStatus":0});
    console.log(response.data);
    return response.data;
  };
  
  export const addToCartApi = async (payload) => {
    const response = await axiosClient.post(`${BASE_URL}/api/createbill`, { ...payload });
    return response.data;
  };
  
  export const updateCartItemQuantityApi = async ({ itemId, quantity }) => {
    const response = await axiosClient.put(`${BASE_URL}/cart/${itemId}`, { quantity });
    return response.data;
  };
  
  export const deleteCartItemApi = async (itemId) => {
    const response = await axiosClient.delete(`${BASE_URL}/cart/${itemId}`);
    return response.data;
  };