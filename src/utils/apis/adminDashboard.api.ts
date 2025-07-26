import { axiosInstance } from "@/lib/axios";
import { AdminDashboardGraphResponse } from "../interface/api/adminDashboardApiInterface";

// export const adminFetchDashboardStatsData = async () : Promise<AdminFetchDashboardStatsDataResponse> => {
//     const response = await axiosInstance.get('/admin/getDashboardStats');
//     return response.data.data;
// }

export const adminFetchDashboardGraphData = async () : Promise<AdminDashboardGraphResponse> => {
    const response = await axiosInstance.get('/admin/getDashboardGraphData');
    return response.data.data;
}