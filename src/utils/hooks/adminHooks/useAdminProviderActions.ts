import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { AdminProvidersTableColumnsProps } from "../../interface/tableColumnInterface";
import { adminApproveProvider, adminChangeProviderBlockStatus, adminChangeProviderTrustTag } from "@/utils/apis/adminProvider.api";
import { Provider } from "@/utils/interface/entityInterface/providerInterface";

interface UseAdminProviderActionReturnType {
    handleAdminApproveProvider: (_id: useAdminProviderActionsFunctionsCommonProp) => void;
    hanldeAdminChangeProviderBlockStatus: (data: hanldeAdminChangeProviderBlockStatusProps) => void;
    hanldeAdminChangeProviderSlotflowTrustTag: (data: hanldeAdminChangeProviderSlotflowTrustTagProps) => void;
}

type useAdminProviderActionsFunctionsCommonProp = {
    providerId : Provider["_id"]
};

type hanldeAdminChangeProviderBlockStatusProps = {
    providerId: Provider["_id"];
    isBlocked: Provider["isBlocked"];
}

type hanldeAdminChangeProviderSlotflowTrustTagProps = {
    providerId: Provider["_id"];
    trustedBySlotflow: Provider["trustedBySlotflow"];
}


export const useAdminProviderActions = (): UseAdminProviderActionReturnType => {

  const queryClient = useQueryClient();

  const handleAdminApproveProvider = ({providerId}: useAdminProviderActionsFunctionsCommonProp) => {
    adminApproveProvider({ providerId })
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

  const hanldeAdminChangeProviderBlockStatus = ({providerId, isBlocked} : hanldeAdminChangeProviderBlockStatusProps) => {
    adminChangeProviderBlockStatus({ providerId,  isBlocked})
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

  const hanldeAdminChangeProviderSlotflowTrustTag = ({providerId ,trustedBySlotflow} : hanldeAdminChangeProviderSlotflowTrustTagProps) => {
    adminChangeProviderTrustTag({ providerId, trustedBySlotflow })
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

  return { handleAdminApproveProvider, hanldeAdminChangeProviderBlockStatus, hanldeAdminChangeProviderSlotflowTrustTag };
};