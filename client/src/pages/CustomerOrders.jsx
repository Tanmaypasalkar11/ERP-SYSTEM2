import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import DataTable from "../components/DataTable";
import { SkeletonTable } from "../components/Skeleton";
import StatusPill from "../components/StatusPill";
import { api } from "../lib/api";

export default function CustomerOrders() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ customerId: "", productId: "", quantity: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
    loadData()
      .catch(() => {})
      .finally(() => setLoading(false));
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
            className="surface-pill px-3 py-1"
          >
            Complete
          </button>
        ) : (
          <span className="text-xs text-carbon-900/70">Completed</span>
        )
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <SectionCard title="Create Customer Order" subtitle="Capture demand for finished goods">
        <form className="grid gap-4" onSubmit={submitOrder}>
          <div className="grid gap-3 md:grid-cols-2">
            <select
              className="surface-input"
              value={form.customerId}
              onChange={(event) => setForm({ ...form, customerId: event.target.value })}
              required
            >
              <option value="" className="text-carbon-900">
                Select customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id} className="text-carbon-900">
                  {customer.name}
                </option>
              ))}
            </select>
            <select
              className="surface-input"
              value={form.productId}
              onChange={(event) => setForm({ ...form, productId: event.target.value })}
              required
            >
              <option value="" className="text-carbon-900">
                Select product
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id} className="text-carbon-900">
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <input
            className="surface-input"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(event) => setForm({ ...form, quantity: event.target.value })}
            required
          />
          <button type="submit" className="surface-button">
            Create Order
          </button>
          {message && <p className="text-xs text-carbon-900">{message}</p>}
        </form>
      </SectionCard>

      <SectionCard title="Customer Orders" subtitle="Pending and completed orders">
        {loading ? <SkeletonTable /> : <DataTable columns={columns} rows={orders} />}
      </SectionCard>
    </div>
  );
}
