import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "https://backend-auth-c86g.onrender.com/api/auth";

export const registerUser = createAsyncThunk(
  "authSlice/registerUser",

  async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);

    return response.data;
  },
);

export const loginUser = createAsyncThunk(
  "authSlice/loginUser",

  async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);

    return response.data;
  },
);

export const changePassword = createAsyncThunk(
  "authSlice/changePassword",

  async ({ passwordData, token }) => {
    const response = await axios.put(
      `${API_URL}/change-password`,
      passwordData,
      {
        headers: {
          Authorization: token,
        }
      }
    );

    return response.data;
  }
);
const initialState= {
    isLoading: false,
    user: null,
    isError: false,
  }
const authSlice = createSlice({
  name: "authSlice",
initialState,


  reducers: {
    
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
    }).addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    }).addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    }).addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    }).addCase(changePassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(changePassword.fulfilled, (state) => {
      state.isLoading = false;
    }).addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default authSlice.reducer;
