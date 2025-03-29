import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { approveProvider, changeProviderBlockStatus } from "@/utils/apis/adminProvider.api";
import { ProvidersTableInterfaceProps, UseAdminProviderActionReturnType } from "../interface/api/adminProviderApiInterface";

export const useAdminProviderActions = (): UseAdminProviderActionReturnType => {
  
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleApproveProvider = (providerId: string) => {
    dispatch(approveProvider({providerId}))
      .unwrap()
      .then((res) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: ProvidersTableInterfaceProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((provider) =>
              provider._id === res._id ? res : provider
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
      .then((res) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: ProvidersTableInterfaceProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((provider) =>
              provider._id === res._id ? res : provider
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