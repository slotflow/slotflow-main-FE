import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface AuthState{
    authUser: {username: string, email: string, phone: string, profileImage: string} | null;
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
            });
    },
})

export const { changeToUser, changeToServiceProvider } = authSlice.actions;
export default authSlice.reducer;


export const signup = createAsyncThunk('auth/signup',
    async (userData: { username: string; email: string; password: string, role: string }, thunkAPI) => {
        try {
            console.log("userData : ",userData);
            const response = await axios.post('http://localhost:3000/api/auth/register', userData);
            console.log("response : ",response);
            const res = response.data
            if(res.succes){
                toast.success(res.message);
            }else{
                toast.success(res.message);
            }
            return res;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
              }
              return thunkAPI.rejectWithValue("An unexpected error occurred");
        }
    }
);