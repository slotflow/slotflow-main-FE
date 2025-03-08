import { User } from "@/utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { changeUserBlockStatus } from "../apis/admin.api";

export const useAdminUserActions = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const hanldeChangeUserBlockStatus = (userId: string, status: boolean) => {
    dispatch(changeUserBlockStatus({userId, status}))
    .unwrap()
      .then(({ userId, updatedUser }) => {
        queryClient.setQueryData(
          ["users"],
          (oldData: User[] | undefined) => {
            if (!oldData) return [];
            return oldData.map((user) =>
              user._id === userId ? updatedUser : user
            );
          }
        );
        queryClient.invalidateQueries({ queryKey: ["users"] });
      });
  }

  return { hanldeChangeUserBlockStatus };
};