import axiosClient from "./axiosClient";
const BASE_URL = "http://localhost:8080/api";
const BASE_ADMIN_URL = " http://localhost:8080/admin";
const productApi = {
  getAll: async (id) => {
    try {
      const rs = await axiosClient.get(`${BASE_URL}/getallproduct/${id}`);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  getProductByCategoryId: async (id) => {
    try {
      const rs = await axiosClient.get(`${BASE_URL}/searchproductbyca
      tegoryid/${id}`);
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
      const rs = axiosClient.post(`${BASE_ADMIN_URL}/createproduct`, payload);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  // update aka delete
  updateProduct: async (payload) => {
    try {
      const rs = axiosClient.post(`${BASE_ADMIN_URL}/updateproduct`, payload);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default productApi;
