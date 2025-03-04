import { Provider } from "@/utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { approveProvider, changeBlockStatus } from "@/utils/redux/adminHanlder";

export const useProviderActions = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleApprove = (providerId: string) => {
    dispatch(approveProvider(providerId))
      .unwrap()
      .then(({ providerId, updatedProvider }) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: Provider[] | undefined) => {
            if (!oldData) return [];
            return oldData.map((provider) =>
              provider._id === providerId ? updatedProvider : provider
            );
          }
        );
        queryClient.invalidateQueries({ queryKey: ["providers"] });
      });
  };

  const hanldeChangeStatus = (providerId: string, status: boolean) => {
    dispatch(changeBlockStatus({providerId, status}))
    .unwrap()
      .then(({ providerId, updatedProvider }) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: Provider[] | undefined) => {
            if (!oldData) return [];
            return oldData.map((provider) =>
              provider._id === providerId ? updatedProvider : provider
            );
          }
        );
        queryClient.invalidateQueries({ queryKey: ["providers"] });
      });
  }

  return { handleApprove, hanldeChangeStatus };
};