import axiosClient from "./axiosClient";
const BASE_URL = "http://localhost:8080/api";
const brandApi = {
  getAll: async (id) => {
    const url = `${BASE_URL}/getallbrandbystatus/${id}`;
    try {
      const rs = await axiosClient.get(url, id);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default brandApi;
