import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import DataTable from "../components/DataTable";
import StatusPill from "../components/StatusPill";
import { api } from "../lib/api";

export default function CustomerOrders() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ customerId: "", productId: "", quantity: "" });
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const [customerList, productList, orderList] = await Promise.all([
      api.customers(),
      api.products(),
      api.customerOrders()
    ]);
    setCustomers(customerList);
    setProducts(productList.filter((item) => item.type === "FINISHED_GOOD"));
    setOrders(orderList);
  };

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const submitOrder = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await api.createCustomerOrder({
        customerId: form.customerId,
        items: [{ productId: form.productId, quantity: Number(form.quantity) }]
      });
      setForm({ customerId: "", productId: "", quantity: "" });
      setMessage("Customer order created.");
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create order.");
    }
  };

  const completeOrder = async (id) => {
    try {
      await api.completeCustomerOrder(id);
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to complete order.");
    }
  };

  const columns = [
    { key: "id", label: "Order" },
    { key: "customer", label: "Customer", render: (row) => row.customer?.name },
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
            onClick={() => completeOrder(row.id)}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            Complete
          </button>
        ) : (
          <span className="text-xs text-white/50">Completed</span>
        )
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <SectionCard title="Create Customer Order" subtitle="Capture demand for finished goods">
        <form className="grid gap-4" onSubmit={submitOrder}>
          <div className="grid gap-3 md:grid-cols-2">
            <select
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              value={form.customerId}
              onChange={(event) => setForm({ ...form, customerId: event.target.value })}
              required
            >
              <option value="" className="text-ink-900">
                Select customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id} className="text-ink-900">
                  {customer.name}
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
                Select product
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id} className="text-ink-900">
                  {product.name}
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
            Create Order
          </button>
          {message && <p className="text-xs text-aqua-300">{message}</p>}
        </form>
      </SectionCard>

      <SectionCard title="Customer Orders" subtitle="Pending and completed orders">
        <DataTable columns={columns} rows={orders} />
      </SectionCard>
    </div>
  );
}
