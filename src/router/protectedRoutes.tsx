import { toast } from "react-toastify";
import { Navigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/utils/redux/appStore";

type UserRoles = "ADMIN" | "USER" | "PROVIDER";

interface ProtectedRouteProps {
    allowedRoles: (UserRoles)[];
    children: React.ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
    const user = useSelector((store: RootState) => store.auth.authUser);

    const dispatch = useDispatch<AppDispatch>();
    
    if (!user || !user.role) {
        dispatch(setAuthUser(null));
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user.role as UserRoles)) {
        dispatch(setAuthUser(null));
        return <Navigate to="/" replace />;
    }

    if (user.isBlocked) {
        dispatch(setAuthUser(null));
        toast.error("You have been blocked");
        if(user.role === "ADMIN"){
            return <Navigate to="/admin/login" replace />;
        }else if(user.role === "USER"){
            return <Navigate to="/user/login" replace />;
        }else if(user.role === "PROVIDER"){
            return <Navigate to="/provider/login" replace />;
        }
    }
    return children;
};
