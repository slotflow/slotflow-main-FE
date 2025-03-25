import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { useQueryClient } from "@tanstack/react-query"
import { addNewPlan, changePlanBlockStatus } from "../apis/adminPlan.api";
import { AdminAddNewPlanRequestPayload, AdminFetchAllPlansResponseProps, UseAdminPlanActionsReturnType } from "../interface/api/adminPlanApiInterface";

export const useAdminPlanActions = (): UseAdminPlanActionsReturnType => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();

    const handlePlanAdding = (formData : AdminAddNewPlanRequestPayload) => {
        dispatch(addNewPlan(formData))
            .unwrap()
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['plans'] });
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    const handleChangePlanStatus = (planId: string, status: boolean) => {
        dispatch(changePlanBlockStatus({ planId, status }))
          .unwrap()
          .then((res) => {
            queryClient.setQueryData(
              ["plans"],
              (oldData: AdminFetchAllPlansResponseProps[] | []) => {
                if (!oldData) return [];
                return oldData.map((plan) =>
                  plan._id === res._id ? res : plan
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