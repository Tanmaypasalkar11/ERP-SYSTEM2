import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import DataTable from "../components/DataTable";
import { api } from "../lib/api";

export default function Production() {
  const [products, setProducts] = useState([]);
  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState({ finishedProductId: "", quantityProduced: "" });
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const productList = await api.products();
    const report = await api.reports.production();
    setProducts(productList.filter((item) => item.type === "FINISHED_GOOD"));
    setBatches(report.recent || []);
  };

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const submitProduction = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await api.createProduction({
        finishedProductId: form.finishedProductId,
        quantityProduced: Number(form.quantityProduced)
      });
      setForm({ finishedProductId: "", quantityProduced: "" });
      setMessage("Production completed.");
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to run production.");
    }
  };

  const columns = [
    { key: "id", label: "Batch ID" },
    { key: "finishedProduct", label: "Product", render: (row) => row.finishedProduct?.name },
    { key: "quantityProduced", label: "Qty" },
    { key: "createdAt", label: "Created", render: (row) => new Date(row.createdAt).toLocaleDateString() }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <SectionCard title="Create Production" subtitle="Consume raw materials based on BOM">
        <form className="grid gap-4" onSubmit={submitProduction}>
          <select
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            value={form.finishedProductId}
            onChange={(event) => setForm({ ...form, finishedProductId: event.target.value })}
            required
          >
            <option value="" className="text-ink-900">
              Select finished product
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id} className="text-ink-900">
                {product.name}
              </option>
            ))}
          </select>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            placeholder="Quantity produced"
            value={form.quantityProduced}
            onChange={(event) => setForm({ ...form, quantityProduced: event.target.value })}
            required
          />
          <button type="submit" className="rounded-full bg-aqua-600 px-6 py-3 text-sm font-medium text-ink-900 shadow-glow">
            Run Production
          </button>
          {message && <p className="text-xs text-aqua-300">{message}</p>}
        </form>
      </SectionCard>

      <SectionCard title="Recent Production" subtitle="Latest production records">
        <DataTable columns={columns} rows={batches} />
      </SectionCard>
    </div>
  );
}
