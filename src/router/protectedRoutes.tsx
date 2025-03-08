import { useDispatch, useSelector } from "react-redux";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setAuthAdmin, setAuthProvider, setAuthUser } from "@/utils/redux/slices/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface CustomJwtPayload extends JwtPayload {
    role?: string;
    userOrProviderId?: string;
}


export const AdminProtectedRoute: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("adminToken");
    const { authAdmin } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken.exp && currentTime > decodedToken.exp) {
                    localStorage.removeItem("adminToken");
                    dispatch(setAuthAdmin(null));
                    navigate("/admin/login");
                } else if (decodedToken.role !== "ADMIN") {
                    localStorage.removeItem("adminToken");
                    dispatch(setAuthAdmin(null));
                    navigate("/admin/login");
                } else if (!authAdmin) {
                    localStorage.removeItem("adminToken");
                    dispatch(setAuthAdmin(null));
                    navigate("/admin/login");
                }
            } catch{
                localStorage.removeItem("adminToken");
                dispatch(setAuthAdmin(null));
                navigate("/admin/login");
            }
        } else {
            dispatch(setAuthAdmin(null));
            navigate("/admin/login");
        }
    }, [token, dispatch, navigate, authAdmin, location.pathname]);

    if (token && authAdmin) {
        return <Outlet />;
    } else {
        return null;
    }
};

export const ProviderProtectedRoute: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("providerToken");
    const { authProvider } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken.exp && currentTime > decodedToken.exp) {
                    localStorage.removeItem("providerToken");
                    dispatch(setAuthProvider(null));
                    navigate("/provider/login");
                } else if (decodedToken.role !== "PROVIDER") {
                    localStorage.removeItem("providerToken");
                    dispatch(setAuthProvider(null));
                    navigate("/provider/login");
                } else if (authProvider?.isBlocked) {
                    dispatch(setAuthProvider(null));
                    localStorage.removeItem("providerToken");
                    toast.error("Your account is blocked, please contact us.");
                    navigate("/provider/login");
                } else if (!authProvider) {
                    localStorage.removeItem("providerToken");
                    dispatch(setAuthProvider(null));
                    navigate("/provider/login");
                }
            } catch{
                localStorage.removeItem("providerToken");
                dispatch(setAuthProvider(null));
                navigate("/provider/login");
            }
        } else {
            dispatch(setAuthProvider(null));
            navigate("/provider/login");
        }
    }, [token, dispatch, navigate, authProvider, location.pathname]);

    if (token && authProvider && !authProvider?.isBlocked) {
        return <Outlet />;
    } else {
        return null;
    }
};

export const UserProtectedRoute: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("userToken");
    const { authUser } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken.exp && currentTime > decodedToken.exp) {
                    localStorage.removeItem("userToken");
                    dispatch(setAuthUser(null));
                    navigate("/user/login");
                } else if (decodedToken.role !== "USER") {
                    localStorage.removeItem("userToken");
                    dispatch(setAuthUser(null));
                    navigate("/user/login");
                } else if (authUser?.isBlocked) {
                    dispatch(setAuthUser(null));
                    localStorage.removeItem("userToken");
                    toast.error("Your account is blocked, please contact us.");
                    navigate("/user/login");
                } else if (!authUser) {
                    localStorage.removeItem("userToken");
                    dispatch(setAuthUser(null));
                    navigate("/user/login");
                }
            } catch{
                localStorage.removeItem("userToken");
                dispatch(setAuthUser(null));
                navigate("/user/login");
            }
        } else {
            dispatch(setAuthUser(null));
            navigate("/user/login");
        }
    }, [token, dispatch, navigate, authUser, location.pathname]);

    if (token && authUser && !authUser?.isBlocked) {
        return <Outlet />;
    } else {
        return null;
    }
};