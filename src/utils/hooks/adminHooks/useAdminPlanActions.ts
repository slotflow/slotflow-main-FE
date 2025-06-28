import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Plan } from "@/utils/interface/entityInterface/planInterface";
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
          queryClient.invalidateQueries({ queryKey: ["plans"] });
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
        queryClient.invalidateQueries({ queryKey: ["plans"] });
        toast.success(res.message);
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  return { handleAdminPlanAdding, handleAdminChangePlanStatus };
}