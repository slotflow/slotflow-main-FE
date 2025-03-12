// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { checkUserStatus } from "@/utils/apis/auth.api";
import { Navigate } from "react-router-dom";
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/utils/redux/appStore";

type UserRoles = "ADMIN" | "USER" | "PROVIDER";

interface ProtectedRouteProps {
    allowedRoles: (UserRoles)[];
    children: React.ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
    const user = useSelector((store: RootState) => store.auth.authUser);
    // const [isAuthenticated, setIsAuthenticated] = useState<null | true | false>(null);
    const dispatch = useDispatch<AppDispatch>();
    // const token = user?.token;
    
    // useEffect(() => {
    //     console.log("useEffect")
    //     const checkAuth = async () => {
    //         try {
    //         if (!token) {
    //             setIsAuthenticated(false);
    //             return;
    //         }

    //         await dispatch(checkUserStatus(token)).unwrap().then((res) => {
    //             if(res.status === 403){
    //                 setIsAuthenticated(false);
    //             }else{
    //                 setIsAuthenticated(true);
    //             }
    //         })

    //         } catch {
    //             setIsAuthenticated(false);
    //         }
    //     };
    //     checkAuth();
    // }, [dispatch, token]);

    if (!user || !user.role) {
        console.log("first if");
        dispatch(setAuthUser(null));
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user?.role as UserRoles)) {
        console.log("second if");
        dispatch(setAuthUser(null));
        return <Navigate to="/" replace />;
    }

    // if(isAuthenticated === null){
    //     return <div>Loading...</div>
    // }

    // if (!isAuthenticated) {
        if(user?.role !== "ADMIN"){
            dispatch(setAuthUser(null));
            if(user?.role === "USER"){
                return <Navigate to="/user/login" replace />;
            }else if(user?.role === "PROVIDER"){
                return <Navigate to="/provider/login" replace />;
            }
        }
    // }

    return children;
};
