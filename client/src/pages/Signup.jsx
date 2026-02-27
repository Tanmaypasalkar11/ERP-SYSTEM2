import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { api, setToken } from "../lib/api";
import { setAuth } from "../features/authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const result = await api.register(form);
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
          <p className="text-xs uppercase tracking-[0.4em] text-carbon-900">Strelema ERP</p>
          <h1 className="font-serif text-4xl text-carbon-900">Create your ops workspace.</h1>
          <p className="text-carbon-900">
            The first account becomes Admin. Use it to manage your teams and workflows.
          </p>
        </div>
        <form onSubmit={onSubmit} className="rounded-3xl border border-black/10 bg-black/5 p-8 shadow-card">
          <h2 className="text-2xl font-semibold text-carbon-900">Sign up</h2>
          <p className="mt-2 text-sm text-carbon-900">Set up a secure admin profile.</p>
          <div className="mt-6 space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-carbon-900"
              placeholder="Full name"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-carbon-900"
              placeholder="Email"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-carbon-900"
              placeholder="Password (min 8 chars)"
              required
            />
          </div>
          {error && <p className="mt-4 text-sm text-carbon-900">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-aqua-600 px-6 py-3 text-sm font-medium text-carbon-900 shadow-glow"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
          <p className="mt-6 text-xs text-carbon-900">
            Already have an account?{" "}
            <Link to="/login" className="text-carbon-900">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
