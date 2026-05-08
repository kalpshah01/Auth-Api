import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "https://backend-auth-c86g.onrender.com/api/auth";

const getErrorMessage = (error) =>
  error.response?.data?.msg || error.response?.data?.message || error.message;

export const registerUser = createAsyncThunk(
  "authSlice/registerUser",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const loginUser = createAsyncThunk(
  "authSlice/loginUser",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
export const forgotPassword = createAsyncThunk(

  "authSlice/forgotPassword",

  async (emailData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/forgot-password`,
        emailData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
export const resetPassword = createAsyncThunk(

  "authSlice/resetPassword",

  async (resetData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/reset-password`,
        resetData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
export const changePassword = createAsyncThunk(
  "authSlice/changePassword",

  async ({ oldPassword, newPassword, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
const initialState= {
  isLoading: false,
  user: null,
  isError: null,
  otpVerify: false,
}
  
const authSlice = createSlice({
  name: "authSlice",
initialState,


  reducers: {

  setOtpVerify: (state, action) => {

    state.otpVerify = action.payload;
  }
},

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
    }).addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    }).addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    }).addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    }).addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(forgotPassword.fulfilled, (state) => {
      state.isLoading = false;
    }).addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    }).addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
    }).addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    }).addCase(changePassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(changePassword.fulfilled, (state) => {
      state.isLoading = false;
    }).addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export const { setOtpVerify } = authSlice.actions;

export default authSlice.reducer;
