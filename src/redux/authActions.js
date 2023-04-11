// authActions.js
import axios from "axios";
import authApi from "../api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL=process.env.REACT_APP_API_URL;

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (
    payload,
    { rejectWithValue }
  ) => {
    try {
      const rs = await authApi.getDetails(payload);
      
      return rs.data;
    } catch (error) {
      console.log(error)
      // return custom error message from backend if present
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message);
      // } else {
      //   return rejectWithValue(rs.message);
      // }
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    { id, userfullname, email, password, phone, gender, address },
    { rejectWithValue }
  ) => {
    try {
      const rs = await authApi.updateProfile({
        id,
        userfullname,
        email,
        password,
        phone,
        gender,
        address,
      });
      
      return rs.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await authApi.login(payload);
      const dataUser = {
        ...rs.data
      };
      localStorage.setItem("auth_token", rs.data.token);
      localStorage.setItem("data_user", JSON.stringify(dataUser));
      return rs.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { username, email, password, phone, gender, address },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${BASE_URL}/api/register`,
        { username, email, password, phone, address, gender },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
