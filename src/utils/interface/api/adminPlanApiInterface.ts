import { Plan } from "../planInterface";


 // *** Admin Plan Api interfaces **** \\

// Admin fetch all plans type
export type AdminFetchAllPlansResponseProps = Pick<Plan, "_id" | "planName" | "isBlocked">;



// Admin adding new plan api request request payload type, used in adminPlanApi
export type AdminAddNewPlanRequestPayload = Pick<Plan,'planName' | 'description' | 'price' | 'features' | "billingCycle" | "maxBookingPerMonth" | "adVisibility">;
// Admin add new plan api response interface, used in adminPlanApi
export type AdminAddNewPlanResponseProps = Pick<Plan, "_id" | "planName" | "isBlocked">;




// Admin change block status of plan api request payload interface, used in adminPlanApi
export interface AdminChangePlanStatusRequestPayload {
    planId: string;
    status: boolean;
}

// Admin chnage block status of plan api response interface, used in adminPlanApi
export type AdminChangePlanStatusResponseProps = Pick<Plan, "_id" | "planName" | "isBlocked">;




// **** Admin Plan Action Custom Hook **** \\

// Admin plan custom hook interface , used in useAdminPlanActions
export interface UseAdminPlanActionsReturnType {
    handlePlanAdding: (formData: AdminAddNewPlanRequestPayload) => void;
    handleChangePlanStatus: (planId: string, status: boolean) => void;
  }