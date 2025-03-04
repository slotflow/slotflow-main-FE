import axios from "axios";
import { startTimer } from "./stateSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthData, setAuthUser } from "./authSlice";
import axiosInstance, { setAccessToken } from "../../lib/axios";

export const signup = createAsyncThunk('auth/signup',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/signup", userData);
            const res = response.data;
            if (res.success) {
                thunkAPI.dispatch(startTimer(300));
                thunkAPI.dispatch(setAuthData(res));
            }
            return res;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
);

export const verifyOtp = createAsyncThunk("auth/verify-otp",
    async (authData : {otp: string, verificationToken: string, role: string}, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/verify-otp', authData);
            const res = response.data;
            return res;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

export const signin = createAsyncThunk("auth/signin",
    async (userData: { email: string, password: string, role: string | null }, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/signin', userData);
            const res = response.data;
            if (res.success) {
                const authUserData = {
                    username: res.role === "ADMIN" ? "Admin" : res.userData.username,
                    profileImage: res.role === "ADMIN" ? null : res.userData.profileImage,
                    role: res.role
                };
                thunkAPI.dispatch(setAuthUser(authUserData));
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                setAccessToken(res.accessToken);
                return res;
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

export const signout = createAsyncThunk("auth/signin",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/signout');
            const res = response.data;
            if (res.success) {
                thunkAPI.dispatch(setAuthUser(null));
                setAccessToken(null);
                return res;
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

export const resendOtp = createAsyncThunk("auth/resendOtp",
    async (authData : { verificationToken?: string, role?: string, email?: string}, thunkAPI) => {
        try{
            const response = await axiosInstance.post("/auth/resendOtp", authData);
            const res = response.data;
            if(res.success){
                thunkAPI.dispatch(setAuthData(response.data));
                thunkAPI.dispatch(startTimer(300));
            }
            return res;
        }catch(error : unknown){
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

export const updatePassword = createAsyncThunk("auth/updatePassword",
    async (authData : {  role?: string, verificationToken?: string, password: string}, thunkAPI) => {
        try{
            const response = await axiosInstance.put("/auth/updatePassword", authData);
            const res = response.data;
            return res;
        }catch(error : unknown){
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)
