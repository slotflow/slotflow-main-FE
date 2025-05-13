import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser } from "../redux/slices/authSlice";
import { startTimer } from "../redux/slices/signFormSlice";
import { CommonResponse } from "../interface/commonInterface";
import { ResendOtpApiRequestPayload, ResendOtpApiResponse, SigninApiRequestPayload, SigninApiResponse, SignupApiRequestPayload, SignupApiResponse, UpdatePasswordApiRequestPayload, VerifyOtpApiRequestPayload } from "../interface/api/authApiInterface";

export const signup = createAsyncThunk<SignupApiResponse, SignupApiRequestPayload>('auth/signup',
    async (userData: SignupApiRequestPayload, thunkAPI) => {
        const response = await axiosInstance.post("/auth/signup", userData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
);

export const verifyOtp = createAsyncThunk<CommonResponse,VerifyOtpApiRequestPayload>("auth/verify-otp",
    async (authData: VerifyOtpApiRequestPayload) => {
        const response = await axiosInstance.post('/auth/verify-otp', authData);
        return response.data;
    }
)

export const signin = createAsyncThunk<SigninApiResponse, SigninApiRequestPayload>("auth/signin",
    async (userData: SigninApiRequestPayload, thunkAPI) => {
        const response = await axiosInstance.post('/auth/signin', userData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
        }
        return response.data;
    }
)

export const signout = createAsyncThunk<CommonResponse>("auth/signOut",
    async () => {
        const response = await axiosInstance.post('/auth/signout');
        return response.data;
    }
)

export const resendOtp = createAsyncThunk<ResendOtpApiResponse,ResendOtpApiRequestPayload>("auth/resendOtp",
    async (authData: ResendOtpApiRequestPayload, thunkAPI) => {
        const response = await axiosInstance.post("/auth/resendOtp", authData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
)

export const updatePassword = createAsyncThunk<CommonResponse,UpdatePasswordApiRequestPayload>("auth/updatePassword",
    async (authData: UpdatePasswordApiRequestPayload) => {
        const response = await axiosInstance.put("/auth/updatePassword", authData);
        return response.data;
    }
)

export const checkUserStatus = createAsyncThunk("auth/checkUserStatus",
    async () => {
        await axiosInstance.post("/auth/checkUserStatus");
    }
);





