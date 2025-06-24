import axiosInstance from "@/lib/axios";
import {
    AdminAddNewPlanApiResponse,
    AdminFetchAllPlansApiResponse,
    AdminAddNewPlanApiRequestPayload,
    AdminChangePlanBlockStatusApiResponse,
    AdminChangePlanBlockStatusApiRequestPayload,
} from "../interface/api/adminPlanApiInterface";


export const adminFetchAllPlans = async (): Promise<AdminFetchAllPlansApiResponse[]> => {
    const response = await axiosInstance.get("/admin/plans");
    return response.data.plans;
};

export const adminAddNewPlan = async (formData: AdminAddNewPlanApiRequestPayload): Promise<AdminAddNewPlanApiResponse> => {
    const response = await axiosInstance.post('/admin/addNewPlan', formData);
    return response.data;
}

export const adminChangePlanBlockStatus = async (data: AdminChangePlanBlockStatusApiRequestPayload): Promise<AdminChangePlanBlockStatusApiResponse> => {
    const response = await axiosInstance.patch(`/admin/changePlanBlockStatus`,data);
    return response.data;
}