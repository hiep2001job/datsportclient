import axiosClient from './axiosClient';

const BASE_URL = "http://localhost:8081/api";
const categoryApi = {
  getAll: async (id) => {
    try {
      const url = `${BASE_URL}/findallcategorybystatus/${id}`;
      const rs = await axiosClient.get(url, id);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default categoryApi;
