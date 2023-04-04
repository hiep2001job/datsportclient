import axiosClient from './axiosClient';

const BASE_URL = "http://localhost:8081/api";
const BASE_ADMIN_URL = " http://localhost:8081/admin";
const productApi = {
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
      const rs = await axiosClient.get(`${BASE_URL}/gethotproduct`);
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
