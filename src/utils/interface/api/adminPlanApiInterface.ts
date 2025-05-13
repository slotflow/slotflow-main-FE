import { CommonResponse } from "../commonInterface";
import { Plan } from "../entityInterface/planInterface";

// Admin fetch all plans response type
export type AdminFetchAllPlansApiResponse = Pick<Plan, "_id" | "planName" | "isBlocked">;


// Admin adding new plan api request request payload type
export type AdminAddNewPlanApiRequestPayload = Pick<Plan,'planName' | 'description' | 'price' | 'features' | "maxBookingPerMonth" | "adVisibility">;
// Admin add new plan api response interface
type AddNewPlanResponseProps = Pick<Plan,"_id" | 'planName' | 'description' | 'isBlocked' >;
export interface AdminAddNewPlanApiResponse extends CommonResponse {
    plan: AddNewPlanResponseProps
}


// Admin change plan isBlocked status request payload type
export type AdminChangePlanBlockStatusApiRequestPayload = {
    planId: Plan["_id"];
    isBlocked: Plan["isBlocked"];
}
// Admin chnage plan isBlocked status response interface
type ChangePlanBlockStatusApiResponse = Pick<Plan, "_id" | "planName" | "isBlocked">;
export interface AdminChangePlanBlockStatusApiResponse extends CommonResponse {
    updatedPlan : ChangePlanBlockStatusApiResponse;
}
