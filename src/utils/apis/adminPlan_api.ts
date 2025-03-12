import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Plan } from "../types";

export const fetchPlans = async () => {
    try{
        const response = await axiosInstance.get("/admin/plans");
        return response.data.plans;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.message;
        }
    }
};

export const addNewPlan = createAsyncThunk('/admin/addNewPlan',
    async (formData: Partial<Plan>, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/addNewPlan', formData);
            const res = response.data;
            if (res.success) {
                toast.success(res.message);
                return res;
            } else {
                toast.error(res.message);
                return rejectWithValue(res.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue("An unexpected error occurred.");
            }
        }
    }
)