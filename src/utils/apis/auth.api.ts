import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser } from "../redux/slices/authSlice";
import { startTimer } from "../redux/slices/signFormSlice";

export const signup = createAsyncThunk('auth/signup',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        const response = await axiosInstance.post("/auth/signup", userData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
);

export const verifyOtp = createAsyncThunk("auth/verify-otp",
    async (authData: { otp: string, verificationToken: string, role: string }, thunkAPI) => {
        const response = await axiosInstance.post('/auth/verify-otp', authData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(null));
        }
        return response.data;
    }
)

export const signin = createAsyncThunk("auth/signin",
    async (userData: { email: string, password: string, role: string | null }, thunkAPI) => {
        const response = await axiosInstance.post('/auth/signin', userData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
        }
        return response.data;
    }
)

export const signout = createAsyncThunk("auth/signin",
    async () => {
        const response = await axiosInstance.post('/auth/signout');
        return response.data;
    }
)

export const resendOtp = createAsyncThunk("auth/resendOtp",
    async (authData: { verificationToken?: string, role?: string, email?: string }, thunkAPI) => {
        const response = await axiosInstance.post("/auth/resendOtp", authData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
)

export const updatePassword = createAsyncThunk("auth/updatePassword",
    async (authData: { role: string, verificationToken: string, password: string }) => {
        const response = await axiosInstance.put("/auth/updatePassword", authData);
        return response.data;
    }
)


export const checkUserStatus = createAsyncThunk("auth/checkUserStatus",
    async (token: string | undefined) => {
        console.log("checking")
        await axiosInstance.post(
            "/auth/checkUserStatus",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }
);