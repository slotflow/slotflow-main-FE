import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { AdminProvidersTableColumnsProps } from "../interface/tableColumnInterface";
import { UseAdminProviderActionReturnType } from "../interface/api/adminProviderApiInterface";
import { approveProvider, changeProviderBlockStatus, changeProviderTrustTag } from "@/utils/apis/adminProvider.api";

export const useAdminProviderActions = (): UseAdminProviderActionReturnType => {

  const queryClient = useQueryClient();

  const handleApproveProvider = (providerId: string) => {
    approveProvider({ providerId })
      .then((res) => {
        queryClient.setQueryData(
          ["providers"],
          (oldData: AdminProvidersTableColumnsProps[] | []) => {
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
          (oldData: AdminProvidersTableColumnsProps[] | []) => {
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
          (oldData: AdminProvidersTableColumnsProps[] | []) => {
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