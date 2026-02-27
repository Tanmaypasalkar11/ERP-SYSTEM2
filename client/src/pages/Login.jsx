import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { api, setToken } from "../lib/api";
import { setAuth } from "../features/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api.login(form);
      setToken(result.token);
      dispatch(setAuth({ user: result.user, token: result.token }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Streleam ERP</p>
          <h1 className="font-serif text-4xl text-white">Welcome back to your manufacturing command center.</h1>
          <p className="text-white/60">
            Log in to orchestrate orders, production, and inventory in one unified workspace.
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Demo Credentials</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white">Admin</span>
                <span>admin@erp.com / admin123</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white">Purchase</span>
                <span>purchase@erp.com / purchase123</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white">Production</span>
                <span>production@erp.com / production123</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white">Sales</span>
                <span>sales@erp.com / sales123</span>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-card">
          <h2 className="text-2xl font-semibold text-white">Login</h2>
          <p className="mt-2 text-sm text-white/60">Use your admin or manager credentials.</p>
          <div className="mt-6 space-y-4">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Email"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-aqua-600 px-6 py-3 text-sm font-medium text-ink-900 shadow-glow"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="mt-6 text-xs text-white/60">
            New here?{" "}
            <Link to="/signup" className="text-aqua-400">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
