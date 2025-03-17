import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser } from "../redux/slices/authSlice";
import { startTimer } from "../redux/slices/signFormSlice";

interface signupRequest {
    username: string;
    email: string;
    password: string;
    role: string;
}

interface signupResponse {
    success: boolean;
    message: string;
    authUser: {
        verificationToken: string;
        role: string;
        token: string
    }
}

interface verifyOtpRequestPayload {
    otp: string;
    verificationToken: string;
    role: string
}

interface resendOtpRequestPayload {
    role: string;
    verificationToken?: string;
    email?: string;
}

interface resendOtpRespone{
    success: boolean;
    message: string;
    authUser: {
        verificationToken: string;
        role: string;
    }
}

interface signinRequestPayload {
    email: string;
    password: string;
    role: string;
}

interface signinResponse {
    success: boolean;
    message: string;
    authUser: {
        username: string;
        profileImage?: string;
        role: string;
        token: string;
        email: string;
        isLoggedIn: boolean;
        _id?: string;
        address?: boolean;
        service?: boolean;
        approved?: boolean;
    }
}

interface commonResponse {
    success: boolean;
    message: string;
}

interface updatePasswordRequestPayload {
    role: string;
    verificationToken: string;
    password: string;
}

export const signup = createAsyncThunk<signupResponse, signupRequest>('auth/signup',
    async (userData: signupRequest, thunkAPI) => {
        const response = await axiosInstance.post("/auth/signup", userData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
);

export const verifyOtp = createAsyncThunk<commonResponse,verifyOtpRequestPayload>("auth/verify-otp",
    async (authData: verifyOtpRequestPayload, thunkAPI) => {
        const response = await axiosInstance.post('/auth/verify-otp', authData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(null));
        }
        return response.data;
    }
)

export const signin = createAsyncThunk<signinResponse, signinRequestPayload>("auth/signin",
    async (userData: signinRequestPayload, thunkAPI) => {
        const response = await axiosInstance.post('/auth/signin', userData);
        if (response.data.success) {
            console.log("response : ", response.data);
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
        }
        return response.data;
    }
)

export const signout = createAsyncThunk<commonResponse>("auth/signin",
    async () => {
        const response = await axiosInstance.post('/auth/signout');
        return response.data;
    }
)

export const resendOtp = createAsyncThunk<resendOtpRespone,resendOtpRequestPayload>("auth/resendOtp",
    async (authData: resendOtpRequestPayload, thunkAPI) => {
        const response = await axiosInstance.post("/auth/resendOtp", authData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
)

export const updatePassword = createAsyncThunk<commonResponse,updatePasswordRequestPayload>("auth/updatePassword",
    async (authData: updatePasswordRequestPayload) => {
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





