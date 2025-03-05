import { setAccessToken } from '../lib/axios';
import refreshToken from './tokenRefreshService';

export const initializeApp = async () => {
    const storedAccessToken = sessionStorage.getItem('accessToken');
    const storedRefreshToken = sessionStorage.getItem('refreshToken');

    if (storedAccessToken) {
        setAccessToken(storedAccessToken);
    } else if (storedRefreshToken) {
        try {
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                sessionStorage.setItem('accessToken', newAccessToken);
            }
        } catch (error) {
            console.error('Refresh token failed:', error);
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('authUser');
            window.location.href = '/login';
        }
    }
};