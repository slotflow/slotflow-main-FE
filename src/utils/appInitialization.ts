import { setAccessToken } from '../lib/axios';
import refreshToken from './tokenRefreshService';

export const initializeApp = async () => {
    try {
        const storedAccessToken = sessionStorage.getItem('accessToken');
        const refreshTokenCookie = document.cookie.split('; ').find(row => row.startsWith('refreshToken='));
        const storedRefreshToken = refreshTokenCookie ? refreshTokenCookie.split('=')[1] : null;

        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        } else if (storedRefreshToken) {
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                sessionStorage.setItem('accessToken', newAccessToken);
                setAccessToken(newAccessToken);
            }
        }
    } catch (error) {
        console.error('App initialization failed:', error);
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        sessionStorage.removeItem('authUser');
        window.location.href = '/login';
    }
};