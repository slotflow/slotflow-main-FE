import { Payment } from "../entityInterface/paymentInterface";

// Used as the return type for Admin Fetch All Payments API,
// and in AdminPaymentsTableColumns, AdminPaymentsPage
export type AdminFetchAllPaymentsResponse = Pick<Payment, "createdAt" | "totalAmount" | "paymentFor" | "paymentGateway" | "paymentStatus" | "paymentMethod">
