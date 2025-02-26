import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../utils/redux/appStore";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const authUser = useSelector((state: RootState) => state.auth?.authUser);    

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(authUser.role ?? "")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
