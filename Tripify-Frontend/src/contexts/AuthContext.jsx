import { createContext, useContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import { login as loginApi, signup as signupApi, logoutApi } from "../api/authApi";
import { setAccessToken, API_BASE } from "../api/axiosClient";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("tripify_user") || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(null); // Memory only
  const [loading, setLoading] = useState(true); // For initial silent refresh on reload

  // Clean legacy single-token if present
  useEffect(() => {
    localStorage.removeItem("tripify_token");
  }, []);

  // Silent restore session on app mount / refresh using stored refreshToken
  useEffect(() => {
    let isMounted = true;
    const storedRefreshToken = localStorage.getItem("tripify_refresh_token");

    if (!storedRefreshToken) {
      setLoading(false);
      return;
    }

    axios
      .post(`${API_BASE}/auth/refresh`, { refreshToken: storedRefreshToken })
      .then((res) => {
        const newAccessToken = res.data?.accessToken || res.data?.token;
        if (isMounted && newAccessToken) {
          setAccessToken(newAccessToken);
          setToken(newAccessToken);
          setUser(readStoredUser());
        }
      })
      .catch(() => {
        if (isMounted) {
          localStorage.removeItem("tripify_refresh_token");
          localStorage.removeItem("tripify_user");
          setAccessToken(null);
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Listen for session expiry event dispatched by axiosClient interceptor
  useEffect(() => {
    const handleSessionExpired = () => {
      setToken(null);
      setUser(null);
      setAccessToken(null);
    };

    window.addEventListener("auth:session-expired", handleSessionExpired);
    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, []);

  const persist = useCallback((accessToken, refreshToken, nextUser) => {
    // 1. Access token strictly in memory
    setAccessToken(accessToken);
    setToken(accessToken);

    // 2. Refresh token & user in localStorage
    if (refreshToken) {
      localStorage.setItem("tripify_refresh_token", refreshToken);
    }
    if (nextUser) {
      localStorage.setItem("tripify_user", JSON.stringify(nextUser));
      setUser(nextUser);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      const data = await loginApi({ email, password });
      if (!data.success) throw new Error(data.message || "Login failed.");
      persist(data.accessToken || data.token, data.refreshToken, data.user);
      return data.user;
    },
    [persist],
  );

  const signup = useCallback(
    async ({ name, email, phone, password, role }) => {
      const data = await signupApi({ name, email, phone, password, role });
      if (!data.success) {
        throw new Error(
          data.errors?.[0]?.msg || data.message || "Signup failed.",
        );
      }
      persist(data.accessToken || data.token, data.refreshToken, data.user);
      return data.user;
    },
    [persist],
  );

  const logout = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem("tripify_refresh_token");
    try {
      if (storedRefreshToken) {
        await logoutApi({ refreshToken: storedRefreshToken });
      }
    } catch (err) {
      console.warn("Logout request failed:", err);
    } finally {
      localStorage.removeItem("tripify_refresh_token");
      localStorage.removeItem("tripify_user");
      setAccessToken(null);
      setToken(null);
      setUser(null);
    }
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
