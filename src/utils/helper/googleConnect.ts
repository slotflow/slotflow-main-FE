import { AppDispatch } from "../redux/appStore";
import { setGoogleConnectionLoading } from "../redux/slices/googleSlice";

export const handleConnectGoogle = (e: React.MouseEvent<HTMLButtonElement>, dispatch: AppDispatch) => {
    e.preventDefault();
    dispatch(setGoogleConnectionLoading(true))
    const apiUrl = import.meta.env.MODE === "development"
        ? import.meta.env.VITE_BACKEND_DEV_URL
        : import.meta.env.VITE_BACKEND_PRODUCTION_URL;
    window.location.href = `${apiUrl}/google/connect`;
}