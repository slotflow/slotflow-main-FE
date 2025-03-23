import axiosInstance from "@/lib/axios";
import { Plan } from "../interface/planInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAddNewPlanApiResponse, AdminAddNewPlanRequestPayload, AdminChangePlanStatusRequestPayload, AdminChangePlanStatusResponse } from "../interface/adminPlanApiInterface";

export const fetchPlans = async (): Promise<Partial<Plan>> => {
    const response = await axiosInstance.get("/admin/plans");
    return response.data.plans;
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