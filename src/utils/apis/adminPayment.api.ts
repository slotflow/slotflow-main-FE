import axiosInstance from "@/lib/axios"
import { AdminFetchAllPaymentsResponseProps } from "../interface/api/adminPaymentInterfac";

export const adminFetchAllPayments = async (): Promise<Array<AdminFetchAllPaymentsResponseProps>> => {
    const response = await axiosInstance.get('/admin/getPayments');
    return response.data.payments;
}