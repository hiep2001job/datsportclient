// authActions.js
import axios from "axios";
import authApi from "../api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await authApi.login(payload);
      const dataUser = {
        username: rs.data.userName,
        role: rs.data.role,
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
        `http://localhost:8080/api/register`,
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
