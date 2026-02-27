import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import DataTable from "../components/DataTable";
import { api } from "../lib/api";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  const loadData = async () => {
    const data = await api.inventory();
    setInventory(data);
  };

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const columns = [
    { key: "product", label: "Product", render: (row) => row.product?.name },
    { key: "type", label: "Type", render: (row) => row.product?.type },
    { key: "quantity", label: "Quantity" },
    { key: "unit", label: "Unit", render: (row) => row.product?.unit }
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="Inventory Snapshot" subtitle="Raw materials and finished goods">
        <DataTable columns={columns} rows={inventory} />
      </SectionCard>
    </div>
  );
}
