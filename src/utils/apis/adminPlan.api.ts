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

export const changePlanBlockStatus = createAsyncThunk('/admin/changePlanStatus',
    async (statusData: { planId: string, status: boolean }) => {
        try {
            console.log("statusData : ",statusData);
            const { planId, status } = statusData;
            const response = await axiosInstance.put(`/admin/changePlanStatus/${planId}?status=${status}`);
            const res = response.data;
            console.log("response : ",res);
            if (res.success) {
                console.log("ok")
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
            return { planId, updatedPlan: res.updatedPlan };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data.message;
            } else {
                throw "An unexpected error occurred.";
            }
        }
    }
)