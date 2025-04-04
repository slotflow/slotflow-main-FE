import { Plan } from "../planInterface";


 // *** Admin Plan Api interfaces **** \\
 export interface ApiCommonResponse {
    success: boolean;
    message: string;
}






// Admin fetch all plans type
export type AdminFetchAllPlansResponseProps = Pick<Plan, "_id" | "planName" | "isBlocked">;



// Admin adding new plan api request request payload type, used in adminPlanApi
export type AdminAddNewPlanRequestPayload = Pick<Plan,'planName' | 'description' | 'price' | 'features' | "maxBookingPerMonth" | "adVisibility">;
type AddNewPlanResponseProps = Pick<Plan,"_id" | 'planName' | 'description' | 'isBlocked' >;
export interface AdminAddNewPlanResponseProps extends ApiCommonResponse {
    plan: AddNewPlanResponseProps
}


// Admin change block status of plan api request payload interface, used in adminPlanApi
export interface AdminChangePlanStatusRequestPayload {
    planId: string;
    status: boolean;
}

// Admin chnage block status of plan api response interface, used in adminPlanApi
export type ChangePlanStatusResponseProps = Pick<Plan, "_id" | "planName" | "isBlocked">;
export interface AdminChangePlanStatusResponseProps extends ApiCommonResponse {
    updatedPlan : ChangePlanStatusResponseProps;
}



// **** Admin Plan Action Custom Hook **** \\

// Admin plan custom hook interface , used in useAdminPlanActions
export interface UseAdminPlanActionsReturnType {
    handleServiceAdding: (formData: AdminAddNewPlanRequestPayload, setLoading: (loading: boolean) => void) => void;
    handleChangePlanStatus: (planId: string, status: boolean) => void;
}