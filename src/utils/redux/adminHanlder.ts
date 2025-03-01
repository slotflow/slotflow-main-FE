import axios from "axios";
import axiosInstance from "../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProviders } from "./adminSlice";

export const getAllProviders = createAsyncThunk("/auth/providers",
    async (_,thunkAPI) => {
        try{
            const response = await axiosInstance.get("/admin/providers");
            const res = response.data;
            thunkAPI.dispatch(addProviders(res.providers))
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)

export const getAllUsers = createAsyncThunk("/auth/users",
    async (_,thunkAPI) => {
        try{
            // const response = await axiosInstance.get("/admin/users");
            // const res = response.data;
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unexpected error occurred, please try again.");
        }
    }
)