export const handleConnectGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const apiUrl = import.meta.env.MODE === "development"
        ? import.meta.env.VITE_BACKEND_DEV_URL
        : import.meta.env.VITE_BACKEND_PRODUCTION_URL;
    window.location.href = `${apiUrl}/google/connect`;
}