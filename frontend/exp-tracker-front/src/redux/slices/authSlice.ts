import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SignUpState {
  loading: boolean;
  user: any;
  error: string | null;
}

const initialState: SignUpState = {
  loading: false,
  user: null,
  error: null,
};

// Signup API Call
export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", userData, {
        headers: { "Content-Type": "application/json","Access-Control-Allow-Credentials": "true" },// Include cookies l8r 
      });
      //response.data todo user id store 
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Could not Sign Up");
    }
  }
);

export const signInUser = createAsyncThunk(
    "auth/signIn",
    async (userData: { username: string; password:string }, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/login/", userData, {
                headers: { "Content-Type": "application/json","Access-Control-Allow-Credentials": "true" },
            });
            console.log(res)
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Could not Sign In")
        }
    }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
