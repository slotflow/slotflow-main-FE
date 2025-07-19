import { toast } from "react-toastify";
import { signout } from "../apis/auth.api";
import { NavigateFunction } from "react-router-dom";
import { Role } from "../interface/commonInterface";
import { AppDispatch } from "@/utils/redux/appStore";

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
    toast.success(res.message);
    resetRedux(role);

    if (role === "USER") navigate("/user/login");
    else if (role === "PROVIDER") navigate("/provider/login");
    else if (role === "ADMIN") navigate("/admin/login");
  } catch  {
    toast.error("Signout failed");
  }
};
