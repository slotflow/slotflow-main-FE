import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query"
import { addNewPlan, changePlanBlockStatus } from "../apis/adminPlan.api";
import { AdminAddNewPlanRequestPayload, AdminFetchAllPlansResponseProps, PlanTableInterface, UseAdminPlanActionsReturnType } from "../interface/api/adminPlanApiInterface";

export const useAdminPlanActions = (): UseAdminPlanActionsReturnType => {
  const queryClient = useQueryClient();

  const handleServiceAdding = (formData: AdminAddNewPlanRequestPayload, setLoading: (loading: boolean) => void) => {
      addNewPlan(formData)
      .then((res) => {
        queryClient.setQueryData<PlanTableInterface[]>(
          ["plans"],
          (oldData = []) => {
            return [...oldData, res.plan];
          }
        );
          setLoading(false);
          toast.success(res.message);
      })
      .catch(() => {
        setLoading(false);
      });
    };

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
      .catch(() => {
        toast.error("Please try again");
      });
  }

  return { handleServiceAdding, handleChangePlanStatus };
}