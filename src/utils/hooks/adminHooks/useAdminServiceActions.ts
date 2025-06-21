import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Service } from "@/utils/interface/entityInterface/appServiceInterface";
import { AdminAppServicesTableColumnsProps } from "../../interface/tableColumnInterface";
import { adminAddNewService, adminChangeServiceBlockStatus } from "../../apis/adminService.api";

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

  const handleAdminServiceAdding = (appServiceName: Service["serviceName"], setLoading: (loading: boolean) => void) => {

    console.log("appServiceName : ",appServiceName);
    adminAddNewService({appServiceName})
    .then((res) => {
      queryClient.setQueryData<AdminAppServicesTableColumnsProps[]>(
        ["appServices"],
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
          ["appServices"],
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
