import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { changeUserBlockStatus } from "../apis/adminUser.api";
import { UsersTableInterfaceProps } from "../interface/api/adminUserApiInterface";

export const useAdminUserActions = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeUserBlockStatus = (userId: string, status: boolean) => {
    dispatch(changeUserBlockStatus({userId, status}))
    .unwrap()
      .then((res) => {
        queryClient.setQueryData(["users"],(oldData: UsersTableInterfaceProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((user) =>
              user._id === res._id ? res : user
            );
          }
        );
        queryClient.invalidateQueries({ queryKey: ["users"] });
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  return { handleChangeUserBlockStatus };
};