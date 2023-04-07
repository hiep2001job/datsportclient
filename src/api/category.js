import axiosClient from './axiosClient';

const BASE_URL = process.env.REACT_APP_API_URL;
const categoryApi = {
  getAll: async (status) => {
    try {
      const url = `${BASE_URL}/api/findallcategorybystatus/${status}`;
      const rs = await axiosClient.get(url, status);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  getById: async (id) => {
    try {
      const url = `${BASE_URL}/api/getcategorybyid/${id}`;
      const rs = await axiosClient.get(url, id);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default categoryApi;
