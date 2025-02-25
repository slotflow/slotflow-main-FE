import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { changeToOtpSend } from "./stateSlice";
import axiosInstance from "../../lib/axios";

interface AuthState{
    authUser: {username?: string, email?: string, phone?: string, profileImage?: string} | null;
    serviceProvider: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    authUser: null,
    serviceProvider: false,
    loading: false,
  };
  
  const authSlice = createSlice({
      name: "user",
      initialState,
      reducers: {
        changeToUser: (state) => {
            state.serviceProvider = false;
        },
        changeToServiceProvider: (state) => {
            state.serviceProvider = true;
        }
      },
      extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signup.rejected, (state) => {
                state.loading = false;
            });
    },
})

export const { changeToUser, changeToServiceProvider } = authSlice.actions;
export default authSlice.reducer;

export const signup = createAsyncThunk('auth/register',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/register", userData);
            const res = response.data;
            if(res.success){
                toast.success(res.message);
                thunkAPI.dispatch(changeToOtpSend(true));
                console.log("Token received:", res.token);
                localStorage.setItem("authToken", res.token);
            }else{
                toast.error(res.message);
            }
        } catch (error: unknown) {
            toast.error("Unexpected error occured, please try again.");
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
              }
              return thunkAPI.rejectWithValue("An unexpected error occurred");
            }
        }
    );
    
    export const verifyOtp = createAsyncThunk("auth/verify-otp",
        async ( otp : string , thunkAPI) => {
            try{
                const response = await axiosInstance.post('/auth/verify-otp',{ otp });
                const res= response.data;
                if(res.success){
                    toast.success(res.message);
                    thunkAPI.dispatch(changeToOtpSend(true));
                }else{
                    toast.error(res.message);
                }
            }catch(error : unknown){
            toast.error("Unexpected error occured, please try again.");
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
              }
              return thunkAPI.rejectWithValue("An unexpected error occurred");

        }
    }
)