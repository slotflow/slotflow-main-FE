import { toast } from "react-toastify";
import { Provider } from "@/utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { approveProvider, changeProviderBlockStatus } from "@/utils/apis/adminProvider_api";

export const useAdminProviderActions = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleApproveProvider = (providerId: string) => {
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
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const hanldeChangeProviderBlockStatus = (providerId: string, status: boolean) => {
    dispatch(changeProviderBlockStatus({ providerId, status }))
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
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return { handleApproveProvider, hanldeChangeProviderBlockStatus };
};