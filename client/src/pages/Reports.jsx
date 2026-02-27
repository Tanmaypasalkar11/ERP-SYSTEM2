import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import { api } from "../lib/api";

export default function Reports() {
  const [orderReport, setOrderReport] = useState(null);
  const [inventoryReport, setInventoryReport] = useState(null);
  const [productionReport, setProductionReport] = useState(null);

  useEffect(() => {
    Promise.all([api.reports.orders(), api.reports.inventory(), api.reports.production()])
      .then(([orders, inventory, production]) => {
        setOrderReport(orders);
        setInventoryReport(inventory);
        setProductionReport(production);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <SectionCard title="Order Report" subtitle="Order volume and recent activity">
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          {orderReport?.statusCounts?.map((item) => (
            <li key={item.status}>
              {item.status}: {item._count.status}
            </li>
          ))}
        </ul>
      </SectionCard>
      <SectionCard title="Inventory Report" subtitle="Low stock tracking">
        <p className="text-sm text-white/70">Total Items: {inventoryReport?.totalItems ?? 0}</p>
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          {inventoryReport?.lowStock?.map((entry) => (
            <li key={entry.id}>{entry.product?.name} ({entry.quantity})</li>
          ))}
        </ul>
      </SectionCard>
      <SectionCard title="Production Report" subtitle="Recent batches">
        <p className="text-sm text-white/70">Total Batches: {productionReport?.totalBatches ?? 0}</p>
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          {productionReport?.recent?.map((entry) => (
            <li key={entry.id}>{entry.finishedProduct?.name} ({entry.quantityProduced})</li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
