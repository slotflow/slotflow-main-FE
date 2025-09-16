import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { adminAddNewPlan, adminChangePlanBlockStatus } from "../../apis/adminPlan.api";
import { AdminAddNewPlanRequest, AdminChangePlanBlockStatusRequest } from "@/utils/interface/api/adminPlanApiInterface";

interface UseAdminPlanActionsReturnType {
    handleAdminPlanAdding: (formData: AdminAddNewPlanRequest, setLoading: (loading: boolean) => void) => void;
    handleAdminChangePlanStatus: (data: AdminChangePlanBlockStatusRequest) => void;
}

export const useAdminPlanActions = (): UseAdminPlanActionsReturnType => {

  const queryClient = useQueryClient();

  const handleAdminPlanAdding = (formData: AdminAddNewPlanRequest, setLoading: (loading: boolean) => void) => {
      adminAddNewPlan(formData)
      .then((res) => {
        if(res.success) {
          queryClient.invalidateQueries({ queryKey: ["plans"] });
          setLoading(false);
          toast.success(res.message);
        }
      })
      .catch(() => {
        setLoading(false);
      });
    };

  const handleAdminChangePlanStatus = ({planId, isBlocked} : AdminChangePlanBlockStatusRequest) => {
    adminChangePlanBlockStatus({planId, isBlocked })
      .then((res) => {
        if(res.success) {
          queryClient.invalidateQueries({ queryKey: ["plans"] });
          toast.success(res.message);
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  return { handleAdminPlanAdding, handleAdminChangePlanStatus };
}