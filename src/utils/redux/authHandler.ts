import axios from "axios";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthData, setAuthUser } from "./authSlice";
import axiosInstance, { setAccessToken } from "../../lib/axios";
import { changeForgotPassword, changeToOtpSend, startTimer, toggleSigninForm } from "./stateSlice";

let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

export const signup = createAsyncThunk('auth/signup',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/signup", userData);
            const res = response.data;
            if (res.success) {
                thunkAPI.dispatch(changeToOtpSend(true));
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
            if (res.success) {
                thunkAPI.dispatch(changeToOtpSend(false));
                thunkAPI.dispatch(toggleSigninForm());
            }
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
            if(response.data.success){
                thunkAPI.dispatch(setAuthData(response.data));
                thunkAPI.dispatch(changeForgotPassword(false));
                thunkAPI.dispatch(changeToOtpSend(true));
                thunkAPI.dispatch(startTimer(300));
            }
            return response.data;
        }catch(error : unknown){
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

const refreshToken = async () => {
    if (isRefreshing) {
        return new Promise((resolve) => {
            refreshSubscribers.push((accessToken) => {
                resolve(accessToken);
            });
        });
    }

    isRefreshing = true;

    try {
        const response = await axiosInstance.post('/auth/refresh');
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        isRefreshing = false;
        refreshSubscribers.forEach((subscriber) => subscriber(accessToken));
        refreshSubscribers = [];
        return accessToken;
    } catch(error) {
        console.log("error : ",error);
        isRefreshing = false;
        setAccessToken(null);
        toast.error("Please login.");
        window.location.href = '/login';
        return null;
    }
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);