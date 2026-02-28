import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import DataTable from "../components/DataTable";
import { SkeletonTable } from "../components/Skeleton";
import { api } from "../lib/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const data = await api.customers();
    setCustomers(data);
  };

  useEffect(() => {
    loadData()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const submitCustomer = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await api.createCustomer(form);
      setForm({ name: "", phone: "", email: "", address: "" });
      setMessage("Customer created.");
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create customer.");
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <SectionCard title="Add Customer" subtitle="Create a new buyer profile">
        <form className="grid gap-4" onSubmit={submitCustomer}>
          <input
            className="surface-input"
            placeholder="Customer name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="surface-input"
              placeholder="Phone"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
            <input
              className="surface-input"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </div>
          <textarea
            className="surface-input min-h-[90px]"
            placeholder="Address"
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
          />
          <button type="submit" className="surface-button">
            Add Customer
          </button>
          {message && <p className="text-xs text-carbon-900">{message}</p>}
        </form>
      </SectionCard>

      <SectionCard title="Customer List" subtitle="All registered customers">
        {loading ? <SkeletonTable /> : <DataTable columns={columns} rows={customers} />}
      </SectionCard>
    </div>
  );
}
