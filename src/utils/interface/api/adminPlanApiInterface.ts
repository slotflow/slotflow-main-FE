import { CommonResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";

// Used as the return type for Admin Fetch All Plans API,
// and in AdminPlansTableColumns, AdminPlansPage, useAdminPlanAction
export type AdminFetchAllPlansResponse = Pick<Plan, "_id" | "planName" | "isBlocked" | "price" | "maxBookingPerMonth" | "adVisibility">;


// Admin adding new plan api request request payload type
export type AdminAddNewPlanRequest = Pick<Plan,'planName' | 'description' | 'price' | 'features' | "maxBookingPerMonth" | "adVisibility">;
// Admin add new plan api response interface
type AddNewPlanResponseProps = Pick<Plan,"_id" | "planName" | "isBlocked" | "price" | "maxBookingPerMonth" | "adVisibility" >;
export interface AdminAddNewPlanResponse extends CommonResponse {
    plan: AddNewPlanResponseProps
}


// Admin change plan isBlocked status request payload type
export type AdminChangePlanBlockStatusRequest = {
    planId: Plan["_id"];
    isBlocked: Plan["isBlocked"];
}
// Admin chnage plan isBlocked status response interface
type ChangePlanBlockStatusResponse = Pick<Plan, "_id" | "planName" | "isBlocked">;
export interface AdminChangePlanBlockStatusResponse extends CommonResponse {
    updatedPlan : ChangePlanBlockStatusResponse;
}
