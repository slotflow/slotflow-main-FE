import axiosInstance from "@/lib/axios"
import { AdminFetchAllPaymentsApiResponse } from "../interface/api/adminPaymentInterfac";

export const adminFetchAllPayments = async (): Promise<AdminFetchAllPaymentsApiResponse[]> => {
    const response = await axiosInstance.get('/admin/getPayments');
    return response.data.payments;
}