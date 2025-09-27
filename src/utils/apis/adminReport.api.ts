import { axiosInstance } from "@/lib/axios"
import { buildQueryParams } from "../helper";
import { AdminFetchRevenueReportResponse, AdmminFetchRevenueReportRequest } from "../interface/api/adminReportApiInterface";

export const adminFetchRevenueReport = async (payload: AdmminFetchRevenueReportRequest): Promise<AdminFetchRevenueReportResponse> => {
    const { endDate, startDate } = payload;
    const query = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin/reports/revenue${query ? `?${query}` : ''}`, {
        params : {
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
        }
    });
    console.log("response.data.data.row : ",response);
    return response.data as AdminFetchRevenueReportResponse;
}
