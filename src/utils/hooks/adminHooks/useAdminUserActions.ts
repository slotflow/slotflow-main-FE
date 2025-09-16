import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { adminChangeUserBlockStatus } from "../../apis/adminUser.api";
import { AdminChangeUserStatusRequest } from "@/utils/interface/api/adminUserApiInterface";

interface useAdminUserActionsCustomHookReturnType {
  handleAdminChangeUserBlockStatus: (data: AdminChangeUserStatusRequest) => void;
}

export const useAdminUserActions = (): useAdminUserActionsCustomHookReturnType => {
  const queryClient = useQueryClient();

  const handleAdminChangeUserBlockStatus = ({ userId, isBlocked }: AdminChangeUserStatusRequest) => {
    adminChangeUserBlockStatus({ userId, isBlocked })
      .then((res) => {
        if(res.success) {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast.success(res.message);
        }
      })
      .catch(() => {
        toast.error("Please try again.");
      })
  }

  return { handleAdminChangeUserBlockStatus };
};