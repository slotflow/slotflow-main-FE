import { Plan } from "../types";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { addNewPlan } from "../apis/adminPlan_api";
import { useQueryClient } from "@tanstack/react-query"

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

    return { handlePlanAdding };
}