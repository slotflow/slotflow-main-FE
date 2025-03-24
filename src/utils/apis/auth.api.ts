import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser } from "../redux/slices/authSlice";
import { startTimer } from "../redux/slices/signFormSlice";
import { CommonResponse, ResendOtpRequestPayload, ResendOtpResponse, SigninRequestPayload, SigninResponse, SignupRequest, SignupResponse, UpdatePasswordRequestPayload, VerifyOtpRequestPayload } from "../interface/api/authApiInterface";

export const signup = createAsyncThunk<SignupResponse, SignupRequest>('auth/signup',
    async (userData: SignupRequest, thunkAPI) => {
        const response = await axiosInstance.post("/auth/signup", userData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
);

export const verifyOtp = createAsyncThunk<CommonResponse,VerifyOtpRequestPayload>("auth/verify-otp",
    async (authData: VerifyOtpRequestPayload, thunkAPI) => {
        const response = await axiosInstance.post('/auth/verify-otp', authData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(null));
        }
        return response.data;
    }
)

export const signin = createAsyncThunk<SigninResponse, SigninRequestPayload>("auth/signin",
    async (userData: SigninRequestPayload, thunkAPI) => {
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

export const resendOtp = createAsyncThunk<ResendOtpResponse,ResendOtpRequestPayload>("auth/resendOtp",
    async (authData: ResendOtpRequestPayload, thunkAPI) => {
        const response = await axiosInstance.post("/auth/resendOtp", authData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
)

export const updatePassword = createAsyncThunk<CommonResponse,UpdatePasswordRequestPayload>("auth/updatePassword",
    async (authData: UpdatePasswordRequestPayload) => {
        const response = await axiosInstance.put("/auth/updatePassword", authData);
        return response.data;
    }
)

export const checkUserStatus = createAsyncThunk("auth/checkUserStatus",
    async () => {
        await axiosInstance.post("/auth/checkUserStatus",);
    }
);





