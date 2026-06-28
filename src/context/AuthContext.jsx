import { createContext, useContext, useState, useCallback } from "react";
import { login as loginApi, signup as signupApi } from "../api/authApi";

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
  const [token, setToken] = useState(
    () => localStorage.getItem("tripify_token") || null
  );

  const persist = useCallback((nextToken, nextUser) => {
    localStorage.setItem("tripify_token", nextToken);
    localStorage.setItem("tripify_user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async (email, password) => {
      const data = await loginApi({ email, password });
      if (!data.success) throw new Error(data.message || "Login failed.");
      persist(data.token, data.user);
      return data.user;
    },
    [persist]
  );

  const signup = useCallback(
    async ({ name, email, phone, password }) => {
      const data = await signupApi({ name, email, phone, password });
      if (!data.success) {
        throw new Error(data.errors?.[0]?.msg || data.message || "Signup failed.");
      }
      persist(data.token, data.user);
      return data.user;
    },
    [persist]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("tripify_token");
    localStorage.removeItem("tripify_user");
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
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
