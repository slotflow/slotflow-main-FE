import { toast } from "react-toastify";
import { signout } from "../apis/auth.api";
import { queryClient } from "@/lib/queryClient";
import { NavigateFunction } from "react-router-dom";
import { Role } from "../interface/commonInterface";
import { AppDispatch } from "@/utils/redux/appStore";
import { clearUserSlice } from "../redux/slices/userSlice";
import { clearChatSlice } from "../redux/slices/chatSlice";
import { clearAdminSlice } from "../redux/slices/adminSlice";
import { clearProviderSlice } from "../redux/slices/providerSlice";
import { clearSignFormSlice } from "../redux/slices/signFormSlice";
import { clearCalendarEvents } from "../redux/slices/googleSlice";

export const handleSignoutHelper = async ({
  role,
  dispatch,
  resetRedux,
  navigate,
}: {
  role: Role;
  dispatch: AppDispatch;
  resetRedux: (role: Role) => void;
  navigate: NavigateFunction;
}) => {
  try {
    const res = await dispatch(signout()).unwrap();
    if (res.success) {
      toast.success(res.message);
      dispatch(clearChatSlice());
      dispatch(clearProviderSlice());
      dispatch(clearSignFormSlice());
      dispatch(clearAdminSlice());
      dispatch(clearUserSlice());
      dispatch(clearCalendarEvents());
      queryClient.clear();
      queryClient.cancelQueries();
      resetRedux(role);
      if (role === "USER") navigate("/user/login");
      else if (role === "PROVIDER") navigate("/provider/login");
      else if (role === "ADMIN") navigate("/admin/login");
    }
  } catch {
    toast.error("Signout failed");
  }
};
