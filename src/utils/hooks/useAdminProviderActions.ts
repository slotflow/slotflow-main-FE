import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Provider } from "@/utils/interface";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { approveProvider, changeProviderBlockStatus } from "@/utils/apis/adminProvider.api";

export const useAdminProviderActions = () => {
  
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleApproveProvider = (providerId: string) => {
    dispatch(approveProvider({providerId}))
      .unwrap()
      .then((res) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: Partial<Provider>[] | undefined) => {
            if (!oldData) return [];
            return oldData.map((provider) =>
              provider._id === res.updatedProvider._id ? res.updatedProvider : provider
            );
          }
        );
        queryClient.invalidateQueries({ queryKey: ["providers"] });
        toast.success(res.message);
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
          (oldData: Partial<Provider>[] | undefined) => {
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