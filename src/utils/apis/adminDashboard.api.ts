import { axiosInstance } from "@/lib/axios";
import { AdminDashboardGraphResponse, AdminFetchDashboardAppointmentStatsDataResponse, AdminFetchDashboardPaymentStatsDataResponse, AdminFetchDashboardProviderStatsDataResponse, AdminFetchDashboardRevenueStatsDataResponse, AdminFetchDashboardSubscriptionStatsDataResponse, AdminFetchDashboardTodayStatsDataResponse, AdminFetchDashboardUserStatsDataResponse } from "../interface/api/adminDashboardApiInterface";

export const adminFetchDashboardUserStatsData = async () : Promise<AdminFetchDashboardUserStatsDataResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardUserStats');
    return response.data.data;
}

export const adminFetchDashboardProviderStatsData = async () : Promise<AdminFetchDashboardProviderStatsDataResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardProviderStats');
    return response.data.data;
}

export const adminFetchDashboardSubscriptionStatsData = async () : Promise<AdminFetchDashboardSubscriptionStatsDataResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardSubscriptionStats');
    return response.data.data;
}

export const adminFetchDashboardRevenueStatsData = async () : Promise<AdminFetchDashboardRevenueStatsDataResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardRevenueStats');
    return response.data.data;
}

export const adminFetchDashboardPaymentStatsData = async () : Promise<AdminFetchDashboardPaymentStatsDataResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardPaymentStats');
    return response.data.data;
}

export const adminFetchDashboardAppointmentStatsData = async () : Promise<AdminFetchDashboardAppointmentStatsDataResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardAppointmentStats');
    return response.data.data;
}

export const adminFetchDashboardTodayStatsData = async () : Promise<AdminFetchDashboardTodayStatsDataResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardTodayStats');
    return response.data.data;
}

export const adminFetchDashboardGraphData = async () : Promise<AdminDashboardGraphResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardGraphData');
    return response.data.data;
}
