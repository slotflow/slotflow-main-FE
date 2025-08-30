import { axiosInstance } from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser } from "../redux/slices/authSlice";
import { startTimer } from "../redux/slices/signFormSlice";
import { ApiBaseResponse } from "../interface/commonInterface";
import { ResendOtpRequest, ResendOtpResponse, SigninRequest, SigninResponse, SignupRequest, SignupResponse, UpdatePasswordRequest, VerifyOtpRequest } from "../interface/api/authApiInterface";

export const signup = createAsyncThunk<SignupResponse, SignupRequest>('auth/signup',
    async (userData: SignupRequest, thunkAPI) => {
        // try {
            const response = await axiosInstance.post("/auth/signup", userData);
            if (response.data.success) {
                thunkAPI.dispatch(setAuthUser(response.data.authUser));
                thunkAPI.dispatch(startTimer(300));
            }
            return response.data;
    //     } catch (error) {
    //         return thunkAPI.rejectWithValue(
    //     error.response?.data || { success: false, message: "Something went wrong" }
    //   );
    //     }
    }
);

export const verifyOtp = createAsyncThunk<ApiBaseResponse,VerifyOtpRequest>("auth/verify-otp",
    async (authData: VerifyOtpRequest) => {
        const response = await axiosInstance.post('/auth/verify-otp', authData);
        return response.data;
    }
)

export const signin = createAsyncThunk<SigninResponse, SigninRequest>("auth/signin",
    async (userData: SigninRequest) => {
        const response = await axiosInstance.post('/auth/signin', userData);
        return response.data;
    }
)

export const signout = createAsyncThunk<ApiBaseResponse>("auth/signOut",
    async () => {
        const response = await axiosInstance.post('/auth/signout');
        return response.data;
    }
)

export const resendOtp = createAsyncThunk<ResendOtpResponse,ResendOtpRequest>("auth/resendOtp",
    async (authData: ResendOtpRequest, thunkAPI) => {
        const response = await axiosInstance.post("/auth/resendOtp", authData);
        if (response.data.success) {
            thunkAPI.dispatch(setAuthUser(response.data.authUser));
            thunkAPI.dispatch(startTimer(300));
        }
        return response.data;
    }
)

export const updatePassword = createAsyncThunk<ApiBaseResponse,UpdatePasswordRequest>("auth/updatePassword",
    async (authData: UpdatePasswordRequest) => {
        const response = await axiosInstance.put("/auth/updatePassword", authData);
        return response.data;
    }
)

export const checkUserStatus = createAsyncThunk("auth/checkUserStatus",
    async () => {
        await axiosInstance.post("/auth/checkUserStatus");
    }
);

// export const handleGoogleLogin = async () : Promise<any> => {
//     const response = axiosInstance.get()
// }