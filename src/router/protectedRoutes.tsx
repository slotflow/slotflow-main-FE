import { useDispatch, useSelector } from "react-redux";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setAuthAdmin, setAuthProvider, setAuthUser } from "@/utils/redux/slices/authSlice";
import { toast } from "react-toastify";

interface CustomJwtPayload extends JwtPayload {
    role?: string;
    userOrProviderId?: string;
}

export const AdminProtectedRoute: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("adminToken");
    const location = useLocation();
   

    if (!token) {
        dispatch(setAuthAdmin(null));
        return <Navigate to="/admin/login" replace />;
    }

    try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const currentTime = Date.now();

        if (decodedToken.exp && currentTime > decodedToken.exp * 1000 && decodedToken.role === "ADMIN") {
            console.log("Token is expired");
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        } else {
            console.log("Token is valid");
            return <Outlet />;
        }
    } catch (error) {
        localStorage.removeItem("adminToken");
        dispatch(setAuthAdmin(null));
        console.error("Error decoding token:", error);
        return <Navigate to="/admin/login" replace />;
    }
};

export const ProviderProtectedRoute: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("providerToken");
    const location = useLocation();
    const { authProvider } = useSelector((store: RootState) => store.auth);

    if(authProvider?.isBlocked){
        dispatch(setAuthProvider(null));
        localStorage.removeItem("providerToken");
        toast.error("Your account is blocked, please contact us.");
        return <Navigate to="/provider/login" replace />;
    }

    if (!token) {
        dispatch(setAuthProvider(null));
        return <Navigate to="/provider/login" replace />;
    }

    try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const currentTime = Date.now();

        if (decodedToken.exp && currentTime > decodedToken.exp * 1000 && decodedToken.role === "PROVIDER") {
            console.log("Token expired");
            return <Navigate to="/provider/login" state={{ from: location }} replace />;
        } else {
            console.log("Token is valid");
            return <Outlet />;
        }
    } catch (error) {
        dispatch(setAuthProvider(null));
        localStorage.removeItem("providerToken");
        console.error("Error decoding token:", error);
        return <Navigate to="/provider/login" replace />;
    }
};

export const UserProtectedRoute: React.FC = () => {
    console.log("userRoute")
    const dispatch = useDispatch<AppDispatch>();
    const token : string | null = localStorage.getItem("userToken");
    const location = useLocation();

    const { authUser } = useSelector((store: RootState) => store.auth);

    if(authUser?.isBlocked){
        dispatch(setAuthAdmin(null));
        localStorage.removeItem("adminToken");
        toast.error("Your account is blocked, please contact us.");
        return <Navigate to="/user/login" replace />;
    }

    if (!token) {
        dispatch(setAuthUser(null));
        return <Navigate to="/user/login" replace />;
    }

    try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const currentTime = Date.now();
        
        if (decodedToken.exp && currentTime > decodedToken.exp * 1000 && decodedToken.role === "USER") {
            console.log("Token expired");
            return <Navigate to="/user/login" state={{ from: location }} replace />;
        } else {
            console.log("Token is valid");
            return <Outlet />;
        }
    } catch (error) {
        dispatch(setAuthUser(null));
        localStorage.removeItem("userToken");
        console.error("Error decoding token:", error);
        return <Navigate to="/user/login" replace />;
    }
};