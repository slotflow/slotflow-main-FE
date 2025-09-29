import { FetchFunctionParams } from "../commonInterface";
import { Payment } from "../entityInterface/paymentInterface";

// Admin fetch revenue report request
export interface AdmminFetchRevenueReportRequest extends FetchFunctionParams {
    startDate?: Date;
    endDate?: Date;
}
// Admin fetch revenue report response
export type AdminFetchRevenueReportRow = Pick<
  Payment,
  | "createdAt"
  | "discountAmount"
  | "initialAmount"
  | "totalAmount"
  | "paymentGateway"
  | "paymentFor"
>;

export interface AdminFetchRevenueReportResponse {
  data : {
    rows: AdminFetchRevenueReportRow[];
    grandTotal: number;
    grandDiscount: number;
    grandInitalAmount: number;
  }
  totalPages: number;
  currentPage: number;
  totalCount: number;
}