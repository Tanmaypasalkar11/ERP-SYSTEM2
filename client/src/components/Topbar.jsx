import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../features/authSlice";
import { setToken } from "../lib/api";
import { Bell, LogOut, UserCircle2 } from "lucide-react";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const today = new Date();

  const onLogout = () => {
    setToken(null);
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <header className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Operations Hub</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Welcome back, Team Streleam</h2>
        <p className="mt-1 text-sm text-white/60">
          {today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
          })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
          <UserCircle2 size={20} />
          <div className="text-xs">
            <p className="text-white">{user?.name || "User"}</p>
            <p className="text-white/50">{user?.role || ""}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
