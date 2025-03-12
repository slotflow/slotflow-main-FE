import axios from "axios";
import  axiosInstance  from "../../lib/axios"; 
import { createAsyncThunk } from "@reduxjs/toolkit";
import { startTimer } from "../redux/slices/signFormSlice";
import { setAuthUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

export const signup = createAsyncThunk('auth/signup',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/signup", userData);
            if (response.data.success) {             
                thunkAPI.dispatch(setAuthUser(response.data.authUser));
                thunkAPI.dispatch(startTimer(300));
            }
            return response.data;
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
            return response.data;
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
            if (response.data.success) { 
                thunkAPI.dispatch(setAuthUser(response.data.authUser));   
            }
            return response.data;
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
            if (response.data.success) { 
                return response.data;
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
                thunkAPI.dispatch(setAuthUser(response.data.authUser));
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

export const updatePassword = createAsyncThunk("auth/updatePassword",
    async (authData : {  role: string, verificationToken: string, password: string}, thunkAPI) => {
        try{
            const response = await axiosInstance.put("/auth/updatePassword", authData);
            return response.data;
        }catch(error : unknown){
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)


export const checkUserStatus = createAsyncThunk( "auth/checkUserStatus",
    async (token: string, thunkAPI) => {
        try {
            console.log("call");
            const response = await axiosInstance.post(
                "/auth/checkUserStatus",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if(response.status === 403){
                toast.error("Your account has been blocked.");
            }
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
);