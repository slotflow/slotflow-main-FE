import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { approveProvider, changeProviderBlockStatus, changeProviderTrustTag } from "@/utils/apis/adminProvider.api";
import { ProvidersTableInterfaceProps, UseAdminProviderActionReturnType } from "../interface/api/adminProviderApiInterface";

export const useAdminProviderActions = (): UseAdminProviderActionReturnType => {

  const queryClient = useQueryClient();

  const handleApproveProvider = (providerId: string) => {
    approveProvider({ providerId })
      .then((res) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: ProvidersTableInterfaceProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((provider) =>
              provider._id === res.updatedProvider._id ? res.updatedProvider : provider
            );
          }
        );
        toast.success(res.message);
      })
      .catch(() => {
        toast.error("Please try again");
      });
  };

  const hanldeChangeProviderBlockStatus = (providerId: string, status: boolean) => {
    changeProviderBlockStatus({ providerId, status })
      .then((res) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: ProvidersTableInterfaceProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((provider) =>
              provider._id === res.updatedProvider._id ? res.updatedProvider : provider
            );
          }
        );
        toast.success(res.message);
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  const hanldeProviderTrustTag = (providerId: string, trustedBySlotflow: boolean) => {
    changeProviderTrustTag({ providerId, trustedBySlotflow })
      .then((res) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: ProvidersTableInterfaceProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((provider) =>
              provider._id === res.updatedProvider._id ? res.updatedProvider : provider
            );
          }
        );
        toast.success(res.message);
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  return { handleApproveProvider, hanldeChangeProviderBlockStatus, hanldeProviderTrustTag };
};