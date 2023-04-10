import axiosClient from './axiosClient';
const BASE_URL = `${process.env.REACT_APP_API_URL}/api`;
const BASE_ADMIN_URL = `${process.env.REACT_APP_API_URL}/admin`;
const productApi = {
  searchProduct: async (keyword) => {
    try {
      const rs = await axiosClient.get(`${BASE_URL}/productpaging?pageNumber=0&pageSize=10&keyword=${keyword}`);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  getAll: async (id) => {
    try {
      const rs = await axiosClient.get(`${BASE_URL}/getallproduct/${id}`);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  getHotProducts: async () => {
    try {
      const rs = await axiosClient.get(`${BASE_URL}/getproducthot`);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  getProductByProductId: async (id) => {
    try {
      const rs = await axiosClient.get(`${BASE_URL}/getproductbyid/${id}`);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  getProductByCategoryId: async (id) => {
    try {
      const rs = await axiosClient.get(
        `${BASE_URL}/searchproductbycategoryid/${id}`
      );
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  getProductByBrandId: async (id) => {
    try {
      const rs = await axiosClient.get(
        `${BASE_URL}/searchproductbybrandid/${id}`
      );
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },

  createProduct: async (payload) => {
    try {
      const rs = await axiosClient.post(
        `${BASE_ADMIN_URL}/createproduct`,
        payload
      );
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  // update aka delete
  updateProduct: async (payload) => {
    try {
      const rs = await axiosClient.post(
        `${BASE_ADMIN_URL}/updateproduct`,
        payload
      );
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default productApi;
