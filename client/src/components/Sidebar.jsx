import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  ClipboardList,
  Boxes,
  Factory,
  Truck,
  BarChart3,
  Warehouse,
  Users,
  Building2,
  Package
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER", "SALES_MANAGER"] },
  { to: "/customers", label: "Customers", icon: Users, roles: ["ADMIN", "SALES_MANAGER"] },
  { to: "/vendors", label: "Vendors", icon: Building2, roles: ["ADMIN", "PURCHASE_MANAGER"] },
  { to: "/products", label: "Products", icon: Package, roles: ["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER"] },
  { to: "/inventory", label: "Inventory", icon: Warehouse, roles: ["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER", "SALES_MANAGER"] },
  { to: "/purchase-orders", label: "Purchase Orders", icon: Boxes, roles: ["ADMIN", "PURCHASE_MANAGER"] },
  { to: "/production", label: "Production", icon: Factory, roles: ["ADMIN", "PRODUCTION_MANAGER"] },
  { to: "/customer-orders", label: "Customer Orders", icon: ClipboardList, roles: ["ADMIN", "SALES_MANAGER"] },
  { to: "/reports", label: "Reports", icon: BarChart3, roles: ["ADMIN", "PURCHASE_MANAGER", "PRODUCTION_MANAGER", "SALES_MANAGER"] }
];

export default function Sidebar() {
  const role = useSelector((state) => state.auth.user?.role);
  const visibleItems = navItems.filter((item) => !role || item.roles.includes(role));

  return (
    <aside className="hidden w-72 shrink-0 border-r border-black/10 bg-ink-800/70 px-6 py-8 backdrop-blur-xl lg:block">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.4em] text-carbon-900">Strelema</p>
        <h1 className="mt-3 font-serif text-3xl text-carbon-900">Manufacturing ERP</h1>
      </div>
      <nav className="space-y-2">
        {visibleItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-black/10 text-carbon-900 shadow-glow"
                  : "text-carbon-900 hover:bg-black/5 hover:text-carbon-900"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-10 rounded-2xl border border-black/10 bg-black/5 p-4 text-xs text-carbon-900">
        <p className="text-carbon-900">Workflow</p>
        <p className="mt-2">Order → Purchase → Inward → Production → Sale</p>
      </div>
    </aside>
  );
}
