// appInitialization.ts
import { setAccessToken } from '../lib/axios';
import refreshToken from './tokenRefreshService';

export const initializeApp = async () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken) {
        setAccessToken(storedAccessToken);
    } else if (storedRefreshToken) {
        try {
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
            }
        } catch (error) {
            console.error('Refresh token failed:', error);
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
    }
};