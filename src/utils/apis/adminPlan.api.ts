import axiosInstance from "@/lib/axios";
import {
    ApiCommonResponse,
    AdminAddNewPlanRequestPayload,
    AdminFetchAllPlansResponseProps,
    AdminChangePlanStatusRequestPayload,
    AdminChangePlanStatusResponseProps,
} from "../interface/api/adminPlanApiInterface";


export const fetchAllPlans = async (): Promise<AdminFetchAllPlansResponseProps[]> => {
    const response = await axiosInstance.get("/admin/plans");
    return response.data.plans;
};

export const addNewPlan = async (formData: AdminAddNewPlanRequestPayload): Promise<ApiCommonResponse> => {
    const response = await axiosInstance.post('/admin/addNewPlan', formData);
    return response.data;
}

export const changePlanBlockStatus = async (statusData: AdminChangePlanStatusRequestPayload): Promise<AdminChangePlanStatusResponseProps> => {
    const { planId, status } = statusData;
    const response = await axiosInstance.put(`/admin/changePlanStatus/${planId}?status=${status}`);
    return response.data;
}