import axios from 'axios';
import { errorCatch, getContentType } from './api.helper';
import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.sevice';

export const instance = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: getContentType()
});

export const axiosClassic = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: getContentType()
});


instance.interceptors.request.use(config => {
    const accessToken = getAccessToken();

    if (config && config.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                AuthService.getNewTokens
                return instance.request(originalRequest);
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') {
                    removeFromStorage()
                }
            }
        }

        throw error;
    }
);
