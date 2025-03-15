import { Plan } from "../types";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlans = async () => {
    const response = await axiosInstance.get("/admin/plans");
    return response.data.plans;
};

export const addNewPlan = createAsyncThunk('/admin/addNewPlan',
    async (formData: Partial<Plan>, { rejectWithValue }) => {
        const response = await axiosInstance.post('/admin/addNewPlan', formData);
        const res = response.data;
        if (res.success) {
            toast.success(res.message);
            return res;
        } else {
            toast.error(res.message);
            return rejectWithValue(res.message);
        }
    }
)

export const changePlanBlockStatus = createAsyncThunk('/admin/changePlanStatus',
    async (statusData: { planId: string, status: boolean }) => {
        const { planId, status } = statusData;
        const response = await axiosInstance.put(`/admin/changePlanStatus/${planId}?status=${status}`);
        const res = response.data;
        console.log("response : ", res);
        if (res.success) {
            console.log("ok")
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
        return { planId, updatedPlan: res.updatedPlan };
    }
)