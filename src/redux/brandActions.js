import { createAsyncThunk } from "@reduxjs/toolkit";
import brandApi from "../api/brand";
import categoryApi from "../api/brand";
export const brandActions = {
  getAll: createAsyncThunk("brand/getAll", async (id) => {
    try {
      const rs = await brandApi.getAll(id);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  }),
  getSingle: createAsyncThunk("brand/getSingle", async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }),
  create: createAsyncThunk("brand/create", async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }),
  delete: createAsyncThunk("brand/delete", async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }),
  update: createAsyncThunk("brand/update", async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }),
};
