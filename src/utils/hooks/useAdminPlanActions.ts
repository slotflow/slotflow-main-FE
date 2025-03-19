import { Plan } from "../interface";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { useQueryClient } from "@tanstack/react-query"
import { addNewPlan, changePlanBlockStatus } from "../apis/adminPlan.api";

export const useAdminPlanActions = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();

    const handlePlanAdding = (formData : Partial<Plan>) => {
        dispatch(addNewPlan(formData))
            .unwrap()
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['plans'] })
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    const handleChangePlanStatus = (planId: string, status: boolean) => {
        dispatch(changePlanBlockStatus({ planId, status }))
          .unwrap()
          .then(({ planId, updatedPlan }) => {
            queryClient.setQueryData(
              ["services"],
              (oldData: Plan[] | undefined) => {
                if (!oldData) return [];
                return oldData.map((service) =>
                  service._id === planId ? updatedPlan : service
                );
              }
            );
            queryClient.invalidateQueries({ queryKey: ["plans"] });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }

    return { handlePlanAdding, handleChangePlanStatus };
}