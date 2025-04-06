import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { changeUserBlockStatus } from "../apis/adminUser.api";
import { AdminUsersTableColumnsProps } from "../interface/tableColumnInterface";

export const useAdminUserActions = () => {
  const queryClient = useQueryClient();

  const handleChangeUserBlockStatus = (userId: string, status: boolean) => {
    changeUserBlockStatus({userId, status})
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

  return { handleChangeUserBlockStatus };
};