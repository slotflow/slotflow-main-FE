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
    const token = sessionStorage.getItem("adminToken");
    const { authAdmin } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (location.pathname.startsWith("/user") || location.pathname.startsWith("/provider")) {
                    console.log("location validation")
                    navigate("/admin");
                    return;
                }

                if (decodedToken.exp && currentTime > decodedToken.exp) {
                    sessionStorage.removeItem("adminToken");
                    dispatch(setAuthAdmin(null));
                    navigate("/admin/login");
                } else if (decodedToken.role !== "ADMIN") {
                    sessionStorage.removeItem("adminToken");
                    dispatch(setAuthAdmin(null));
                    navigate("/admin/login");
                } else if (!authAdmin) {
                    sessionStorage.removeItem("adminToken");
                    dispatch(setAuthAdmin(null));
                    navigate("/admin/login");
                }
            } catch{
                sessionStorage.removeItem("adminToken");
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
    const token = sessionStorage.getItem("providerToken");
    const { authProvider } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/user")) {
                    navigate("/provider");
                    return;
                }

                if (decodedToken.exp && currentTime > decodedToken.exp) {
                    sessionStorage.removeItem("providerToken");
                    dispatch(setAuthProvider(null));
                    navigate("/provider/login");
                } else if (decodedToken.role !== "PROVIDER") {
                    sessionStorage.removeItem("providerToken");
                    dispatch(setAuthProvider(null));
                    navigate("/provider/login");
                } else if (authProvider?.isBlocked) {
                    dispatch(setAuthProvider(null));
                    sessionStorage.removeItem("providerToken");
                    toast.error("Your account is blocked, please contact us.");
                    navigate("/provider/login");
                } else if (!authProvider) {
                    sessionStorage.removeItem("providerToken");
                    dispatch(setAuthProvider(null));
                    navigate("/provider/login");
                }
            } catch{
                sessionStorage.removeItem("providerToken");
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
    console.log("user protected route")
    const dispatch = useDispatch<AppDispatch>();
    const token = sessionStorage.getItem("userToken");
    const { authUser } = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const currentTime = Math.floor(Date.now() / 1000);


                if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/provider")) {
                    navigate("/user");
                    return;
                }

                if (decodedToken.exp && currentTime > decodedToken.exp) {
                    sessionStorage.removeItem("userToken");
                    dispatch(setAuthUser(null));
                    navigate("/user/login");
                } else if (decodedToken.role !== "USER") {
                    sessionStorage.removeItem("userToken");
                    dispatch(setAuthUser(null));
                    navigate("/user/login");
                } else if (authUser?.isBlocked) {
                    dispatch(setAuthUser(null));
                    sessionStorage.removeItem("userToken");
                    toast.error("Your account is blocked, please contact us.");
                    navigate("/user/login");
                } else if (!authUser) {
                    sessionStorage.removeItem("userToken");
                    dispatch(setAuthUser(null));
                    navigate("/user/login");
                }
            } catch{
                sessionStorage.removeItem("userToken");
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