import { createSlice } from "@reduxjs/toolkit";
import { signin, signup, verifyOtp } from "./authHandler";

interface AuthState{
    authUser: {username?: string, email?: string, phone?: string, profileImage?: string} | null;
    serviceProvider: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    authUser: null,
    serviceProvider: false,
    loading: false,
  };
  
  const authSlice = createSlice({
      name: "user",
      initialState,
      reducers: {
        changeToUser: (state) => {
            state.serviceProvider = false;
        },
        changeToServiceProvider: (state) => {
            state.serviceProvider = true;
        },
        setAuthUser: (state,action) => {
            state.authUser = action.payload;
        }
      },
      extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signup.rejected, (state) => {
                state.loading = false;
            })
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })
            .addCase(signin.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signin.rejected, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            });
    },
})

export const { changeToUser, changeToServiceProvider, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
