import { Plan } from "../planInterface";


 // *** Admin Plan Api interfaces **** \\
 
// Api common response
interface ApiCommonResponse {
    success: boolean;
    message: string;
}

// Admin adding new plan api request request payload type, used in adminPlanApi
export type AdminAddNewPlanRequestPayload = Omit<Plan,'_id' | 'isBlocked' | 'createdAt' | 'updatedAt'>;

// Admin add new plan api response interface, used in adminPlanApi
export interface AdminAddNewPlanApiResponse extends ApiCommonResponse{
    plan: Plan
}

// Admin change block status of plan api request payload interface, used in adminPlanApi
export interface AdminChangePlanStatusRequestPayload {
    planId: string;
    status: boolean;
}

// Admin chnage block status of plan api response interface, used in adminPlanApi
export interface AdminChangePlanStatusResponse extends ApiCommonResponse{
    updatedPlan: Partial<Plan>
}





// **** Admin Plan Action Custom Hook **** \\

// Admin plan custom hook interface , used in useAdminPlanActions
export interface UseAdminPlanActionsReturnType {
    handlePlanAdding: (formData: AdminAddNewPlanRequestPayload) => void;
    handleChangePlanStatus: (planId: string, status: boolean) => void;
  }