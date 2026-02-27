import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import DataTable from "../components/DataTable";
import StatusPill from "../components/StatusPill";
import { api } from "../lib/api";

export default function PurchaseOrders() {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [form, setForm] = useState({ vendorId: "", productId: "", quantity: "" });
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const [vendorList, productList, orders] = await Promise.all([
      api.vendors(),
      api.products(),
      api.purchaseOrders()
    ]);
    setVendors(vendorList);
    setProducts(productList.filter((item) => item.type === "RAW_MATERIAL"));
    setPurchaseOrders(orders);
  };

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const submitPO = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await api.createPurchaseOrder({
        vendorId: form.vendorId,
        items: [{ productId: form.productId, quantity: Number(form.quantity) }]
      });
      setForm({ vendorId: "", productId: "", quantity: "" });
      setMessage("Purchase order created.");
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create purchase order.");
    }
  };

  const inwardPO = async (id) => {
    try {
      await api.inwardPurchaseOrder(id);
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to inward purchase order.");
    }
  };

  const columns = [
    { key: "id", label: "PO" },
    { key: "vendor", label: "Vendor", render: (row) => row.vendor?.name },
    {
      key: "items",
      label: "Items",
      render: (row) => row.items?.map((item) => `${item.product?.name} x${item.quantity}`).join(", ")
    },
    { key: "status", label: "Status", render: (row) => <StatusPill value={row.status} /> },
    {
      key: "action",
      label: "Action",
      render: (row) =>
        row.status === "PENDING" ? (
          <button
            onClick={() => inwardPO(row.id)}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            Inward
          </button>
        ) : (
          <span className="text-xs text-white/50">Received</span>
        )
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <SectionCard title="Create Purchase Order" subtitle="Procure raw materials">
        <form className="grid gap-4" onSubmit={submitPO}>
          <div className="grid gap-3 md:grid-cols-2">
            <select
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              value={form.vendorId}
              onChange={(event) => setForm({ ...form, vendorId: event.target.value })}
              required
            >
              <option value="" className="text-ink-900">
                Select vendor
              </option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id} className="text-ink-900">
                  {vendor.name}
                </option>
              ))}
            </select>
            <select
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              value={form.productId}
              onChange={(event) => setForm({ ...form, productId: event.target.value })}
              required
            >
              <option value="" className="text-ink-900">
                Select raw material
              </option>
              {products.map((item) => (
                <option key={item.id} value={item.id} className="text-ink-900">
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(event) => setForm({ ...form, quantity: event.target.value })}
            required
          />
          <button type="submit" className="rounded-full bg-aqua-600 px-6 py-3 text-sm font-medium text-ink-900 shadow-glow">
            Create Purchase Order
          </button>
          {message && <p className="text-xs text-aqua-300">{message}</p>}
        </form>
      </SectionCard>

      <SectionCard title="Open Purchase Orders" subtitle="Track inbound raw materials">
        <DataTable columns={columns} rows={purchaseOrders} />
      </SectionCard>
    </div>
  );
}
