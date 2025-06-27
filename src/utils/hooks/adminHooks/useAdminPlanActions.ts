import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Plan } from "@/utils/interface/entityInterface/planInterface";
import { AdminFetchAllPlansResponse } from "@/utils/interface/api/adminPlanApiInterface";
import { adminAddNewPlan, adminChangePlanBlockStatus } from "../../apis/adminPlan.api";

type handleAdminChangePlanStatusProps = {
    planId: Plan["_id"];
    isBlocked: Plan["isBlocked"];
}

interface UseAdminPlanActionsReturnType {
    handleAdminPlanAdding: (formData: handleAdminPlanAddingProps, setLoading: (loading: boolean) => void) => void;
    handleAdminChangePlanStatus: (data: handleAdminChangePlanStatusProps) => void;
}

type handleAdminPlanAddingProps = Pick<Plan,'planName' | 'description' | 'price' | 'features' | "maxBookingPerMonth" | "adVisibility">;


export const useAdminPlanActions = (): UseAdminPlanActionsReturnType => {

  const queryClient = useQueryClient();

  const handleAdminPlanAdding = (formData: handleAdminPlanAddingProps, setLoading: (loading: boolean) => void) => {
      adminAddNewPlan(formData)
      .then((res) => {
        queryClient.setQueryData(
          ["plans"],
          (oldData: AdminFetchAllPlansResponse[]) => {
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

  const handleAdminChangePlanStatus = ({planId, isBlocked} : handleAdminChangePlanStatusProps) => {
    adminChangePlanBlockStatus({planId, isBlocked })
      .then((res) => {
        queryClient.setQueryData(
          ["plans"],
          (oldData: AdminFetchAllPlansResponse[]) => {
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

  return { handleAdminPlanAdding, handleAdminChangePlanStatus };
}