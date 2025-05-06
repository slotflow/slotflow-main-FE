import { Payment } from "../paymentInterface";

export type AdminFetchAllPaymentsResponseProps = Pick<Payment, "createdAt" | "totalAmount" | "paymentFor" | "paymentGateway" | "paymentStatus" | "paymentMethod">
