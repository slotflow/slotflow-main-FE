import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAddNewPlanApiResponse, AdminAddNewPlanRequestPayload, AdminChangePlanStatusRequestPayload, AdminChangePlanStatusResponse, AdminFetchAllPlansResponse } from "../interface/api/adminPlanApiInterface";

export const fetchAllPlans = async (): Promise<AdminFetchAllPlansResponse> => {
    const response = await axiosInstance.get("/admin/plans");
    return response.data;
};

export const addNewPlan = createAsyncThunk<AdminAddNewPlanApiResponse,AdminAddNewPlanRequestPayload>('/admin/addNewPlan',
    async (formData: AdminAddNewPlanRequestPayload) => {
        const response = await axiosInstance.post('/admin/addNewPlan', formData);
        return response.data;
    }
)

export const changePlanBlockStatus = createAsyncThunk<AdminChangePlanStatusResponse,AdminChangePlanStatusRequestPayload>('/admin/changePlanStatus',
    async (statusData: AdminChangePlanStatusRequestPayload) => {
        const { planId, status } = statusData;
        const response = await axiosInstance.put(`/admin/changePlanStatus/${planId}?status=${status}`);
        return response.data;
    }
)