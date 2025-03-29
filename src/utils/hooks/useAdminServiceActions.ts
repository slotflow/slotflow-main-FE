import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { addNewService, chnageServiceBlockStatus } from "../apis/adminService.api";
import { AppServiceTableInterface, UseAdminServiceActionReturnType } from "../interface/api/adminServiceApiInterface";

export const useAdminServiceActions = (): UseAdminServiceActionReturnType => {
  
  const queryClient = useQueryClient();

  const handleServiceAdding = (appServiceName: string, setLoading: (loading: boolean) => void) => {
    addNewService({appServiceName})
    .then((res) => {
      queryClient.setQueryData<AppServiceTableInterface[]>(
        ["services"],
        (oldData = []) => {
          return [...oldData, res.service];
        }
      );
        setLoading(false);
        toast.success("This one"+res.message);
    })
    .catch(() => {
      setLoading(false);
    });
  };

  const handleChangeServiceStatus = (serviceId: string, status: boolean) => {
    chnageServiceBlockStatus({ serviceId, status })
      .then((res) => {
        queryClient.setQueryData(
          ["services"],
          (oldData: AppServiceTableInterface[] | []) => {
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


  return { handleServiceAdding, handleChangeServiceStatus };
}
