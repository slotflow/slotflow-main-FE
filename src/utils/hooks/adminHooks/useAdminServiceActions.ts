import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Service } from "@/utils/interface/entityInterface/appServiceInterface";
import { adminAddNewService, adminChangeServiceBlockStatus } from "../../apis/adminService.api";
import { AdminChangeServiceBlockStatusRequest } from "@/utils/interface/api/adminServiceApiInterface";

interface UseAdminServiceActionReturnType {
  handleAdminServiceAdding: (serviceName: Service["serviceName"], setLoading: (loading: boolean) => void) => void;
  handleAdminChangeServiceStatus: (data: AdminChangeServiceBlockStatusRequest) => void;
}

export const useAdminServiceActions = (): UseAdminServiceActionReturnType => {

  const queryClient = useQueryClient();

  const handleAdminServiceAdding = (appServiceName: Service["serviceName"], setLoading: (loading: boolean) => void) => {
    adminAddNewService({ appServiceName })
      .then((res) => {
        if(res.success) {
          setLoading(false);
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["appServices"] });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleAdminChangeServiceStatus = ({ serviceId, isBlocked }: AdminChangeServiceBlockStatusRequest) => {
    adminChangeServiceBlockStatus({ serviceId, isBlocked })
      .then((res) => {
        if(res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["appServices"] });
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }


  return { handleAdminServiceAdding, handleAdminChangeServiceStatus };
}
