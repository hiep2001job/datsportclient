import axiosClient from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;
const authApi = {
  login: async (payload) => {
    const url = `${BASE_URL}/api/authenticate`;
    return await axiosClient.post(url, payload);
  },
  register: async (payload) => {
    const url = `${BASE_URL}/api/register`;
    return await axiosClient.post(url, payload);
  },
  getDetails: async (payload) => {
    const url = `${BASE_URL}/api/findaccountbyusername`;
    return await axiosClient.post(url, payload);
  },
  updateProfile: async (payload) => {
    const url = `${BASE_URL}/api/updateinforaccount`;
    const rs =  await axiosClient.post(url, payload);
    console.log("rs: ", rs)
    return rs;
  },
  changePassword: async (payload) => {
    const url = `${BASE_URL}/api/changepassword`;
    return await axiosClient.post(url, payload);
  },
  changeStatus: async (payload) => {
    const url = `${BASE_URL}/admin/updatestatusaccount`;
    return await axiosClient.post(url, payload);
  },
};

export default authApi;
