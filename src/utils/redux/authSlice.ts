import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../lib/axios";
import { changeToOtpSend, toggleLoginForm } from "./stateSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
                    thunkAPI.dispatch(changeToOtpSend(false));
                    thunkAPI.dispatch(toggleLoginForm());
                    localStorage.removeItem("authToken");
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