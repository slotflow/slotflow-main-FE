import axios from "axios";
import  axiosInstance  from "../../lib/axios"; 
import { createAsyncThunk } from "@reduxjs/toolkit";
import { startTimer } from "../redux/slices/signFormSlice";
import { setAuthProvider, setAuthUser } from "../redux/slices/authSlice";

export const signup = createAsyncThunk('auth/signup',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/signup", userData);
            const res = response.data;
            console.log("response : ",res);
            if (res.success) {
                if(res.authUser.role === "USER"){
                    console.log("authUser : ",res.authUser)
                    thunkAPI.dispatch(setAuthUser(res.authUser));
                }else if(res.authUser.role === "PROVIDER"){
                    console.log("authUser : ",res.authUser)
                    thunkAPI.dispatch(setAuthProvider(res.authUser));
                }
                thunkAPI.dispatch(startTimer(300));
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
    async (authData : {otp: string, verificationToken: string, role: string},thunkAPI) => {
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
            console.log("response : ",response);
            if (res.success) {
                sessionStorage.setItem("accessToken", res.accessToken);
                sessionStorage.setItem("refreshToken", res.refreshToken);
                sessionStorage.setItem("authUser", JSON.stringify(res.authUser));
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

export const signout = createAsyncThunk("auth/signin",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/signout');
            const res = response.data;
            if (res.success) {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("authUser");
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
                sessionStorage.setItem("authUser", JSON.stringify(res.authUser));
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
    async (authData : {  role: string, verificationToken: string, password: string}, thunkAPI) => {
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
