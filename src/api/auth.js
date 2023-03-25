import axiosClient from "./axiosClient";
const BASE_URL = "http://localhost:8080/api";
const authApi = {
  login: async (payload) => {
    const url = `${BASE_URL}/authenticate`;
    const rs = await axiosClient.post(url, payload);
    return rs;
  },
  register: (payload) => {
    const url = "/signup";
    return axiosClient.post(url, payload);
  },
};

export default authApi;
