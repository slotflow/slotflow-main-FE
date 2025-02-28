import axios from "axios";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser, setTempEmail } from "./authSlice";
import { changeForgotPassword, changeToOtpSend, startTimer, toggleSigninForm } from "./stateSlice";

export const signup = createAsyncThunk('auth/signup',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/signup", userData);
            const res = response.data;
            if (res.success) {
                thunkAPI.dispatch(changeToOtpSend(true));
                thunkAPI.dispatch(startTimer(300));
                thunkAPI.dispatch(setTempEmail(res.email));
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
    async (otp: string, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/verify-otp', {otp});
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
    async (email : string, thunkAPI) => {
        try{
            const response = await axiosInstance.post("/auth/resendOtp", {email});
            if(response.data.success){
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