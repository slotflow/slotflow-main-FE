// import { Serivce } from "../types";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../redux/appStore";
// import { addNewService } from "../apis/admin.api";
// import { useQueryClient } from "@tanstack/react-query";

// export const useAdminActions = () => {
//     const queryClient = useQueryClient();
//     const dispatch = useDispatch<AppDispatch>();
  
//     const handleServiceAdding = (serviceName: string) => {
//       dispatch(addNewService({serviceName}))
//       .unwrap()
//         .then(({ serviceName }) => {
//           queryClient.setQueryData(
//             ["users"],
//             (oldData: Serivce[] | undefined) => {
//               if (!oldData) return [];
//               return oldData.map((service) =>
//                 service._id === serviceId ? updatedService : service
//               );
//             }
//           );
//           queryClient.invalidateQueries({ queryKey: ["services"] });
//         });
//     }
  
//     return { handleServiceAdding };
// }

