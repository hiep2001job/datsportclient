import axiosClient from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const fetchProductsApi = async () => {
  const { id } = JSON.parse(localStorage.getItem("data_user")) ?? {};
  const response = await axiosClient.get(
    `${BASE_URL}/api/getdetailbillbyaccount/${id}/0`
    
  );
  return response.data;
};

export const addToCartApi = async (payload) => {
  const response = await axiosClient.post(`${BASE_URL}/api/createbill`, {
    ...payload,
  });
  return response.data;
};

export const updateCartItemQuantityApi = async ({ itemId, quantity }) => {
  const response = await axiosClient.put(`${BASE_URL}/cart/${itemId}`, {
    quantity,
  });
  return response.data;
};

export const deleteCartItemApi = async (payload) => {
  const response = await axiosClient.post(`${BASE_URL}/api/deleteproductfrombill`,payload);
  return response.data;
};
