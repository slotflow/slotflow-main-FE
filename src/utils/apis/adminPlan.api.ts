import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import {
    ApiCommonResponse,
    AdminAddNewPlanRequestPayload,
    AdminFetchAllPlansResponseProps,
    AdminChangePlanStatusRequestPayload,
    AdminChangePlanStatusResponseProps,
} from "../interface/api/adminPlanApiInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllPlans = async (): Promise<AdminFetchAllPlansResponseProps[]> => {
    const response = await axiosInstance.get("/admin/plans");
    return response.data.plans;
};

export const addNewPlan = async (formData: AdminAddNewPlanRequestPayload): Promise<ApiCommonResponse> => {
    const response = await axiosInstance.post('/admin/addNewPlan', formData);
    return response.data;
}

export const changePlanBlockStatus = createAsyncThunk<AdminChangePlanStatusResponseProps, AdminChangePlanStatusRequestPayload>('/admin/changePlanStatus',
    async (statusData: AdminChangePlanStatusRequestPayload) => {
        const { planId, status } = statusData;
        const response = await axiosInstance.put(`/admin/changePlanStatus/${planId}?status=${status}`);
        toast.success(response.data.message);
        return response.data.updatedPlan;
    }
)