import axios from "axios";

// In production, set VITE_API_URL in your .env (e.g. https://your-backend.onrender.com/api)
export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// In-Memory Access Token (never stored in localStorage for XSS protection)
let inMemoryAccessToken = null;

export const setAccessToken = (token) => {
  inMemoryAccessToken = token;
};

export const getAccessToken = () => {
  return inMemoryAccessToken;
};

// Queue mechanism for parallel requests deadlock prevention
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach in-memory access token if available
axiosClient.interceptors.request.use(
  (config) => {
    if (inMemoryAccessToken) {
      config.headers.Authorization = `Bearer ${inMemoryAccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Catch 401, refresh token once, and replay queued requests
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized and not already retried
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Do not attempt refresh on auth endpoints (login, signup, refresh, logout)
      if (
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/signup") ||
        originalRequest.url?.includes("/auth/refresh")
      ) {
        return Promise.reject(error);
      }

      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const storedRefreshToken = localStorage.getItem("tripify_refresh_token");
      if (!storedRefreshToken) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        // Use bare axios to prevent interceptor looping
        const res = await axios.post(`${API_BASE}/auth/refresh`, {
          refreshToken: storedRefreshToken,
        });

        const newAccessToken = res.data?.accessToken || res.data?.token;
        if (!newAccessToken) {
          throw new Error("No access token received from refresh endpoint");
        }

        // 1. Save new access token into memory
        setAccessToken(newAccessToken);

        // 2. Resolve all waiting requests in the queue with the new token
        processQueue(null, newAccessToken);

        // 3. Retry the current original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshErr) {
        // Reject all queued requests
        processQueue(refreshErr, null);

        // Clear stored refresh token and notify app to logout
        localStorage.removeItem("tripify_refresh_token");
        localStorage.removeItem("tripify_user");
        setAccessToken(null);
        window.dispatchEvent(new CustomEvent("auth:session-expired"));

        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
