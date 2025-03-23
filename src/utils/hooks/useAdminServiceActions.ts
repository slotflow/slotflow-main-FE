import { Service } from "../interface";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { addNewService, chnageServiceBlockStatus } from "../apis/adminService.api";
import { UseAdminServiceActionReturnType } from "../interface/adminServiceApiInterface";

export const useAdminServiceActions = (): UseAdminServiceActionReturnType => {
  
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleServiceAdding = (serviceName: string) => {
    dispatch(addNewService({serviceName}))
    .unwrap()
    .then((res) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success(res.message);
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };

  const handleChangeServiceStatus = (serviceId: string, status: boolean) => {
    dispatch(chnageServiceBlockStatus({ serviceId, status }))
      .unwrap()
      .then((res) => {
        queryClient.setQueryData(
          ["services"],
          (oldData: Service[] | undefined) => {
            if (!oldData) return [];
            return oldData.map((service) =>
              service._id === res.serviceId ? res.updatedService : service
            );
          }
        );
        queryClient.invalidateQueries({ queryKey: ["services"] });
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }


  return { handleServiceAdding, handleChangeServiceStatus };
}
