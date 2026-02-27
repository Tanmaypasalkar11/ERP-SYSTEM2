import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lenis from "lenis";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import PurchaseOrders from "./pages/PurchaseOrders";
import Production from "./pages/Production";
import CustomerOrders from "./pages/CustomerOrders";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { api, getToken, setToken } from "./lib/api";
import { setAuth, clearAuth } from "./features/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const existingToken = getToken();
    if (!existingToken || user) return;

    api
      .me()
      .then((result) => {
        dispatch(setAuth({ user: result.user, token: existingToken }));
      })
      .catch(() => {
        setToken(null);
        dispatch(clearAuth());
      });
  }, [dispatch, user]);

  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";

  const RequireAuth = ({ children }) => {
    if (!getToken()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-ink-900 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-aqua-600/20 blur-[120px]" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-sun-500/20 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-aqua-400/10 blur-[200px]" />
      </div>

      <div className="relative flex min-h-screen">
        {!isAuthRoute && <Sidebar />}
        <div className="flex min-h-screen flex-1 flex-col">
          {!isAuthRoute && <Topbar />}
          <main className={isAuthRoute ? "flex-1" : "flex-1 px-6 pb-16 pt-6 md:px-10"}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/customers"
                element={
                  <RequireAuth>
                    <Customers />
                  </RequireAuth>
                }
              />
              <Route
                path="/vendors"
                element={
                  <RequireAuth>
                    <Vendors />
                  </RequireAuth>
                }
              />
              <Route
                path="/products"
                element={
                  <RequireAuth>
                    <Products />
                  </RequireAuth>
                }
              />
              <Route
                path="/inventory"
                element={
                  <RequireAuth>
                    <Inventory />
                  </RequireAuth>
                }
              />
              <Route
                path="/purchase-orders"
                element={
                  <RequireAuth>
                    <PurchaseOrders />
                  </RequireAuth>
                }
              />
              <Route
                path="/production"
                element={
                  <RequireAuth>
                    <Production />
                  </RequireAuth>
                }
              />
              <Route
                path="/customer-orders"
                element={
                  <RequireAuth>
                    <CustomerOrders />
                  </RequireAuth>
                }
              />
              <Route
                path="/reports"
                element={
                  <RequireAuth>
                    <Reports />
                  </RequireAuth>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
