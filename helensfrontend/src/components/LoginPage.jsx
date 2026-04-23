import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../componentscss/LoginPage.css";

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form,    setForm]    = useState({ username: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user) navigate("/admin", { replace: true });
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [user, navigate]);

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setError(""); };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setError("Please enter your username and password.");
      return;
    }
    setLoading(true);
    try {
      await login(form.username.trim(), form.password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp-page">
      <div className="lp-bg-blob lp-bg-blob--1" />
      <div className="lp-bg-blob lp-bg-blob--2" />

      <div className={`lp-card ${visible ? "lp-card--in" : ""}`}>
        <div className="lp-brand">
          <span className="lp-brand-dot" />
          <span className="lp-brand-name">Helen's Home Care</span>
        </div>

        <h1 className="lp-title">Admin Portal</h1>
        <p className="lp-subtitle">Sign in to access the management dashboard.</p>

        <form onSubmit={submit} noValidate>
          <div className="lp-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="admin"
              value={form.username}
              onChange={e => set("username", e.target.value)}
              className={`lp-input${error ? " lp-input--err" : ""}`}
              disabled={loading}
            />
          </div>

          <div className="lp-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => set("password", e.target.value)}
              className={`lp-input${error ? " lp-input--err" : ""}`}
              disabled={loading}
            />
          </div>

          {error && <p className="lp-error" role="alert">{error}</p>}

          <button type="submit" className="lp-btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <a href="/" className="lp-back">← Back to website</a>
      </div>
    </div>
  );
}
