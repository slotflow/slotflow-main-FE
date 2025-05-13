import { Payment } from "../entityInterface/paymentInterface";

// Admin fetch all payments api response type
export type AdminFetchAllPaymentsApiResponse = Pick<Payment, "createdAt" | "totalAmount" | "paymentFor" | "paymentGateway" | "paymentStatus" | "paymentMethod">
