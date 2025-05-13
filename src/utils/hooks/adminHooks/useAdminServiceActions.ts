import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { adminAddNewService, adminChangeServiceBlockStatus } from "../../apis/adminService.api";
import { AdminAppServicesTableColumnsProps } from "../../interface/tableColumnInterface";
import { Service } from "@/utils/interface/entityInterface/appServiceInterface";

type HandleAdminChangeServiceStatusProps = {
    serviceId: Service["_id"];
    isBlocked: Service["isBlocked"];
}

interface UseAdminServiceActionReturnType {
    handleAdminServiceAdding: (serviceName: Service["serviceName"], setLoading: (loading: boolean) => void) => void;
    handleAdminChangeServiceStatus: (data: HandleAdminChangeServiceStatusProps) => void;
}

export const useAdminServiceActions = (): UseAdminServiceActionReturnType => {
  
  const queryClient = useQueryClient();

  const handleAdminServiceAdding = (serviceName: Service["serviceName"], setLoading: (loading: boolean) => void) => {
    adminAddNewService({serviceName})
    .then((res) => {
      queryClient.setQueryData<AdminAppServicesTableColumnsProps[]>(
        ["services"],
        (oldData = []) => {
          return [...oldData, res.service];
        }
      );
        setLoading(false);
        toast.success(res.message);
    })
    .catch(() => {
      setLoading(false);
    });
  };

  const handleAdminChangeServiceStatus = ({serviceId, isBlocked} : HandleAdminChangeServiceStatusProps) => {
    adminChangeServiceBlockStatus({ serviceId, isBlocked })
      .then((res) => {
        queryClient.setQueryData(
          ["services"],
          (oldData: AdminAppServicesTableColumnsProps[] | []) => {
            if (!oldData) return [];
            return oldData.map((service) =>
              service._id === res.updatedService._id ? res.updatedService : service
            );
          }
        );
        toast.success(res.message);
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }


  return { handleAdminServiceAdding, handleAdminChangeServiceStatus };
}
