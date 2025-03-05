import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const authUser = sessionStorage.getItem("authUser");
    const parsedUser = authUser ? JSON.parse(authUser) : null;

    if (!parsedUser) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(parsedUser.role ?? "")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;