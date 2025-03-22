import { User } from "../interface"; 
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { changeUserBlockStatus } from "../apis/adminUser.api";

export const useAdminUserActions = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeUserBlockStatus = (userId: string, status: boolean) => {
    dispatch(changeUserBlockStatus({userId, status}))
    .unwrap()
      .then((res) => {
        queryClient.setQueryData(["users"],(oldData: Partial<User>[] | undefined) => {
            if (!oldData) return [];
            return oldData.map((user) =>
              user._id === res.updatedUser._id ? res.updatedUser : user
            );
          }
        );
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success(res.message)
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  return { handleChangeUserBlockStatus };
};