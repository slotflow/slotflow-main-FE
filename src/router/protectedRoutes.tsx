// // import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// // import { RootState } from "../utils/redux/appStore";

// interface ProtectedRouteProps {
//     allowedRoles: string[];
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
//     // const authUser = useSelector((state: RootState) => state.auth?.authUser);    

//     // if (!authUser) {
//     //     return <Navigate to="/login" replace />;
//     // }

//     const authUser = sessionStorage.getItem("authUser");
//     const parsedUser = authUser ? JSON.parse(authUser) : null;

//     if (!parsedUser) {
//         return <Navigate to="/login" replace />;
//     }

//     if (!allowedRoles.includes(parsedUser.role ?? "")) {
//         return <Navigate to="/" replace />;
//     }

//     return <Outlet />;
// };

// export default ProtectedRoute;



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