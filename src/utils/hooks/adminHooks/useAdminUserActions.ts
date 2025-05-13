import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { adminChangeUserBlockStatus } from "../../apis/adminUser.api";
import { User } from "@/utils/interface/entityInterface/userInterface";
import { AdminUsersTableColumnsProps } from "../../interface/tableColumnInterface";

type HandleAdminChangeUserBlockStatusProps = {
    userId: User["_id"];
    isBlocked: User["isBlocked"];
}

interface useAdminUserActionsCustomHookReturnType {
  handleAdminChangeUserBlockStatus: (data: HandleAdminChangeUserBlockStatusProps) => void;
}

export const useAdminUserActions = (): useAdminUserActionsCustomHookReturnType => {
  const queryClient = useQueryClient();

  const handleAdminChangeUserBlockStatus = ({userId, isBlocked}: HandleAdminChangeUserBlockStatusProps) => {
    adminChangeUserBlockStatus({userId, isBlocked})
      .then((res) => {
        queryClient.setQueryData(["users"],(oldData: AdminUsersTableColumnsProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((user) =>
              user._id === res.updatedUser._id ? res.updatedUser : user
            );
          }
        );
        toast.success(res.message);
      })
      .catch(() => {
        toast.error("Please try again.");
      })
  }

  return { handleAdminChangeUserBlockStatus };
};