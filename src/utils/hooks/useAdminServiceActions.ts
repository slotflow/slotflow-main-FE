import { Serivce } from "../types";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { useQueryClient } from "@tanstack/react-query";
import { addNewService, chnageServiceBlockStatus } from "../apis/adminService.api";

export const useAdminServiceActions = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleServiceAdding = (serviceName: string) => {
    dispatch(addNewService(serviceName))
    .unwrap()
    .then(() => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };

  const handleChangeServiceStatus = (serviceId: string, status: boolean) => {
    dispatch(chnageServiceBlockStatus({ serviceId, status }))
      .unwrap()
      .then(({ serviceId, updatedService }) => {
        queryClient.setQueryData(
          ["services"],
          (oldData: Serivce[] | undefined) => {
            if (!oldData) return [];
            return oldData.map((service) =>
              service._id === serviceId ? updatedService : service
            );
          }
        );
        queryClient.invalidateQueries({ queryKey: ["services"] });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }


  return { handleServiceAdding, handleChangeServiceStatus };
}
