// import { Serivce } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { addNewService } from "../apis/admin.api";
import { useQueryClient } from "@tanstack/react-query";

export const useAdminServiceActions = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();
  
    const handleServiceAdding = (serviceName: string) => {
      dispatch(addNewService(serviceName)).unwrap().then(() => {
        queryClient.invalidateQueries({ queryKey: ["services"] });
      });
    };

    
    return { handleServiceAdding };
  }
  
  
  // const handleServiceChangeStatus = (serviceId: string, status: boolean) => {
  //   dispatch(chnageServiceBlockStatus({serviceId, status}))
  //   .unwrap()
  //     .then(({serviceId, updatedService}) => {
  //       queryClient.setQueryData(
  //         ["services"],
  //         (oldData: Serivce[] | undefined) => {
  //           if (!oldData) return [];
  //           return oldData.map((service) =>
  //             service._id === serviceId ? updatedService : service
  //           );
  //         }
  //       );
  //       queryClient.invalidateQueries({ queryKey: ["services"] });
  //     });
  // }