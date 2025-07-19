import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { Role } from "@/utils/interface/commonInterface";
import { addService } from "@/utils/redux/slices/userSlice";
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import { setMessages, setOnlineUsers, setSelectedUser } from "@/utils/redux/slices/chatSlice";
import { addAvailability, setPaymentSelectionPage, setSubscriptionIsTrailPlan, setSubscriptionPlanDuration, setSubscriptionPlanId } from "@/utils/redux/slices/providerSlice";

export const useResetRedux = () => {
    
    const dispatch = useDispatch<AppDispatch>();

    const resetCommon = () => {
    dispatch(setAuthUser(null));
    dispatch(setMessages(null));
    dispatch(setSelectedUser(null));
    dispatch(setOnlineUsers(null));
    dispatch(setPaymentSelectionPage(false));
  };

  const resetUser = () => {
    dispatch(addService(null));
  };

  const resetProvider = () => {
    dispatch(setSubscriptionPlanId(null));
    dispatch(setSubscriptionPlanDuration(null));
    dispatch(setSubscriptionIsTrailPlan(false));
    dispatch(addAvailability(null));
  };

  const resetAdmin = () => {
    // Add admin-specific dispatches here if needed
  };

  return (role: Role) => {

    resetCommon();

    if (role === "USER") {
      resetUser();
    } else if (role === "PROVIDER") {
      resetProvider();
    } else if (role === "ADMIN") {
      resetAdmin();
    }
  };
}