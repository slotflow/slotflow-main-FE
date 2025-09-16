import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Provider } from "@/utils/interface/entityInterface/providerInterface";
import { adminApproveProvider, adminChangeProviderBlockStatus, adminChangeProviderTrustTag } from "@/utils/apis/adminProvider.api";
import { AdminChangeProviderBlockStatusRequest, AdminChangeProviderTrustTagRequest } from "@/utils/interface/api/adminProviderApiInterface";

interface UseAdminProviderActionReturnType {
  handleAdminApproveProvider: (providerId: Provider["_id"]) => void;
  hanldeAdminChangeProviderBlockStatus: (data: AdminChangeProviderBlockStatusRequest) => void;
  handleGetProviderDetailPage: (providerId: Provider["_id"]) => void;
  hanldeAdminChangeProviderSlotflowTrustTag: (data: AdminChangeProviderTrustTagRequest) => void;
}

export const useAdminProviderActions = (): UseAdminProviderActionReturnType => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleAdminApproveProvider = (providerId: Provider["_id"]) => {
    adminApproveProvider(providerId)
      .then((res) => {
        if (res.success) {
          queryClient.invalidateQueries({ queryKey: ["providers"] });
          toast.success(res.message);
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  };

  const hanldeAdminChangeProviderBlockStatus = ({ providerId, isBlocked }: AdminChangeProviderBlockStatusRequest) => {
    console.log("prvovider change block status function")
    adminChangeProviderBlockStatus({ providerId, isBlocked })
      .then((res) => {
        if (res.success) {
          console.log("success");
          queryClient.invalidateQueries({ queryKey: ["providers"] });
          toast.success(res.message);
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  const handleGetProviderDetailPage = (providerId: Provider["_id"]) => {
    navigate(`/admin/service-provider/${providerId}`)
  }

  const hanldeAdminChangeProviderSlotflowTrustTag = ({ providerId, trustedBySlotflow }: AdminChangeProviderTrustTagRequest) => {
    adminChangeProviderTrustTag({ providerId, trustedBySlotflow })
      .then((res) => {
        if (res.success) {
          queryClient.invalidateQueries({ queryKey: ["providers"] });
          toast.success(res.message);
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  return { handleAdminApproveProvider, hanldeAdminChangeProviderBlockStatus, handleGetProviderDetailPage, hanldeAdminChangeProviderSlotflowTrustTag };
};