import { IBackendRes } from "@/types/backend";
import { Mutex } from "async-mutex";
import axiosClient from "axios";
import { dispatchRefreshTokenAction } from "@/redux/store-actions";

// Add Vite env type declaration
interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface AccessTokenResponse {
    access_token: string;
}

/**
 * Creates an initial 'axios' instance with custom settings.
 */
const instance = axiosClient.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

const mutex = new Mutex();
const NO_RETRY_HEADER = 'x-no-retry';

const handleRefreshToken = async (): Promise<string | null> => {
    return await mutex.runExclusive(async () => {
        const res = await instance.get<IBackendRes<AccessTokenResponse>>('/api/auth/refresh-token');
        if (res && res.data && res.data.data) return res.data.data.access_token;
        else return null;
    });
};

instance.interceptors.request.use(function (config) {
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        if (error.config && error.response
            && +error.response.status === 401
            && error.config.url !== '/api/auth/login'
            && !error.config.headers[NO_RETRY_HEADER]
        ) {
            const access_token = await handleRefreshToken();
            error.config.headers[NO_RETRY_HEADER] = 'true'
            if (access_token) {
                error.config.headers['Authorization'] = `Bearer ${access_token}`;
                localStorage.setItem('access_token', access_token)
                return instance.request(error.config);
            }
        }

        if (
            error.config && error.response
            && +error.response.status === 400
            && error.config.url === '/api/auth/refresh-token'
            && location.pathname.startsWith("/admin")
        ) {
            const message = error?.response?.data?.message ?? "Có lỗi xảy ra, vui lòng đăng nhập lại.";
            // Dispatch redux action using the utility function
            dispatchRefreshTokenAction(true, message);
        }

        return error?.response?.data ?? Promise.reject(error);
    }
);

export default instance; 