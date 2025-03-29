import axiosInstance from "@/lib/axios";
import {
    AdminAddNewPlanRequestPayload,
    AdminFetchAllPlansResponseProps,
    AdminChangePlanStatusRequestPayload,
    AdminChangePlanStatusResponseProps,
    AdminAddNewPlanResponseProps,
} from "../interface/api/adminPlanApiInterface";


export const fetchAllPlans = async (): Promise<AdminFetchAllPlansResponseProps[]> => {
    const response = await axiosInstance.get("/admin/plans");
    return response.data.plans;
};

export const addNewPlan = async (formData: AdminAddNewPlanRequestPayload): Promise<AdminAddNewPlanResponseProps> => {
    const response = await axiosInstance.post('/admin/addNewPlan', formData);
    return response.data;
}

export const changePlanBlockStatus = async (statusData: AdminChangePlanStatusRequestPayload): Promise<AdminChangePlanStatusResponseProps> => {
    const response = await axiosInstance.put(`/admin/changePlanStatus/${statusData.planId}?status=${statusData.status}`);
    return response.data;
}