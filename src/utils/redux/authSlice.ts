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
        },
        setAuthUser: (state,action) => {
            state.authUser = action.payload;
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
            })
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })
            .addCase(signin.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signin.rejected, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            });
    },
})

export const { changeToUser, changeToServiceProvider, setAuthUser } = authSlice.actions;
export default authSlice.reducer;

export const signup = createAsyncThunk('auth/register',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/register", userData);
            const res = response.data;
            if(res.success){
                toast.success(res.message);
                thunkAPI.dispatch(changeToOtpSend(true));
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
                return;
              }
            toast.error("Unexpected error occurred, please try again.");
            return;
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
                }
            }catch(error : unknown){
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message);
                    return;
                  }
                toast.error("Unexpected error occurred, please try again.");
                return;
            }
        }
    )

    export const signin = createAsyncThunk("auth/login",
        async (userData : {email: string, password: string, role: string}, thunkAPI) => {
            try{
                const response = await axiosInstance.post('/auth/login', userData);
                const res = response.data;
                if (res.success) {
                    const authUserData = {
                        username: res.userData.username,
                        profileImage: res.userData.profileImage,
                    };
                    thunkAPI.dispatch(setAuthUser(authUserData));
                    toast.success(res.message);
                  }
            }catch(error : unknown){
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message);
                    return;
                  }
                toast.error("Unexpected error occurred, please try again.");
                return;
            }
        }
    )