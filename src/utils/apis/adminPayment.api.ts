import axiosInstance from "@/lib/axios"
import { Payment } from "../interface/paymentInterface";

type AdminFetchAllPaymentsResponseProps = Pick<Payment, "createdAt" | "totalAmount" | "paymentFor" | "paymentGateway" | "paymentStatus" | "paymentMethod">
export const adminFetchAllPayments = async (): Promise<Array<AdminFetchAllPaymentsResponseProps>> => {
    const response = await axiosInstance.get('/admin/getPayments');
    return response.data.payments;
}