import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { API } from "../api/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("hc_user")) || null;
    } catch {
      return null;
    }
  });

  // Track if we already validated this session to avoid repeat calls
  const validated = useRef(false);

  // ── LOGIN ──────────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    const res = await fetch(API.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Invalid username or password");
    }

    const data = await res.json();
    const u = { username: data.username };
    setUser(u);
    sessionStorage.setItem("hc_user", JSON.stringify(u));
    validated.current = true;
    return u;
  }, []);

  // ── LOGOUT ─────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await fetch(API.logout, { method: "POST", credentials: "include" });
    } catch {
      // ignore network errors
    }
    setUser(null);
    sessionStorage.removeItem("hc_user");
    validated.current = false;
  }, []);

  // ── SESSION VALIDATION ON APP LOAD (runs once) ─────────────
  useEffect(() => {
    if (!user || validated.current) return;

    fetch(API.adminAssessments, { method: "GET", credentials: "include" })
      .then(res => {
        if (res.status === 401) {
          setUser(null);
          sessionStorage.removeItem("hc_user");
        } else {
          validated.current = true;
        }
      })
      .catch(() => {
        setUser(null);
        sessionStorage.removeItem("hc_user");
      });
  }, []); 

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}