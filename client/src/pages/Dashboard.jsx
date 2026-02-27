import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";
import { api } from "../lib/api";
import { SkeletonCard } from "../components/Skeleton";

export default function Dashboard() {
  const [orderReport, setOrderReport] = useState(null);
  const [inventoryReport, setInventoryReport] = useState(null);
  const [productionReport, setProductionReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.reports.orders(), api.reports.inventory(), api.reports.production()])
      .then(([orders, inventory, production]) => {
        setOrderReport(orders);
        setInventoryReport(inventory);
        setProductionReport(production);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const ordersCount = orderReport?.statusCounts?.reduce((sum, item) => sum + item._count.status, 0) || 0;
  const lowStock = inventoryReport?.lowStock?.length || 0;
  const productionTotal = productionReport?.totalBatches || 0;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-3">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard title="Orders" value={ordersCount} change="Live" meta="Customer orders" />
            <StatCard title="Low Stock" value={lowStock} change="Monitor" meta="Items below threshold" />
            <StatCard title="Production" value={productionTotal} change="Running" meta="Total batches" />
          </>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Workflow" subtitle="ERP manufacturing sequence">
          <div className="space-y-4 text-sm text-carbon-900">
            <p>Customer Order → Purchase Order → Inward → Production → Sale/Outward → Reports</p>
            <p>All inventory updates are automatic and validated.</p>
          </div>
        </SectionCard>
        <SectionCard title="Inventory Alerts" subtitle="Items below reorder threshold">
          {loading ? (
            <SkeletonCard lines={4} />
          ) : (
            <ul className="space-y-2 text-sm text-carbon-900">
              {inventoryReport?.lowStock?.map((entry) => (
                <li key={entry.id}>{entry.product?.name} ({entry.quantity})</li>
              ))}
            </ul>
          )}
        </SectionCard>
      </section>
    </div>
  );
}
