import axios from "axios";
import { toast } from "react-toastify";
import { setAuthUser } from "./authSlice";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeToOtpSend, toggleSigninForm } from "./stateSlice";
import { useNavigate } from "react-router-dom";

export const signup = createAsyncThunk('auth/signup',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/signup", userData);
            const res = response.data;
            if (res.success) {
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
    async (otp: string, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/verify-otp', { otp });
            const res = response.data;
            if (res.success) {
                toast.success(res.message);
                thunkAPI.dispatch(changeToOtpSend(false));
                thunkAPI.dispatch(toggleSigninForm());
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
)

export const signin = createAsyncThunk("auth/signin",
    async (userData: { email: string, password: string, role: string }, thunkAPI) => {
        const navigate = useNavigate();
        try {
            const response = await axiosInstance.post('/auth/signin', userData);
            const res = response.data;
            console.log("res : ",res);
            if (res.success) {
                const authUserData = {
                    username: res.role === "ADMIN" ? "Admin" : res.userData.username,
                    profileImage: res.role === "ADMIN" ? null : res.userData.profileImage,
                };
                thunkAPI.dispatch(setAuthUser(authUserData));
                toast.success(res.message);
                if(res.role === "ADMIN"){
                    navigate("/admin/Dashborad");
                }else if(res.role === "USER"){
                    navigate("/user");
                }else if(res.role === "PROVIDER"){
                    navigate("/provider");
                }
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
)