import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query"
import { changePlanBlockStatus } from "../apis/adminPlan.api";
import { AdminFetchAllPlansResponseProps, UseAdminPlanActionsReturnType } from "../interface/api/adminPlanApiInterface";

export const useAdminPlanActions = (): UseAdminPlanActionsReturnType => {
  const queryClient = useQueryClient();

  const handleChangePlanStatus = (planId: string, status: boolean) => {
    changePlanBlockStatus({ planId, status })
      .then((res) => {
        queryClient.setQueryData(
          ["plans"],
          (oldData: AdminFetchAllPlansResponseProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((plan) =>
              plan._id === res.updatedPlan._id ? res.updatedPlan : plan
            );
          }
        );
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return { handleChangePlanStatus };
}