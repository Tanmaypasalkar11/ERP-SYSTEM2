import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import DataTable from "../components/DataTable";
import { api } from "../lib/api";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const data = await api.vendors();
    setVendors(data);
  };

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const submitVendor = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await api.createVendor(form);
      setForm({ name: "", phone: "", email: "", address: "" });
      setMessage("Vendor created.");
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create vendor.");
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
      <SectionCard title="Add Vendor" subtitle="Create a new supplier">
        <form className="grid gap-4" onSubmit={submitVendor}>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            placeholder="Vendor name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Phone"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </div>
          <textarea
            className="min-h-[90px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            placeholder="Address"
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
          />
          <button type="submit" className="rounded-full bg-aqua-600 px-6 py-3 text-sm font-medium text-ink-900 shadow-glow">
            Add Vendor
          </button>
          {message && <p className="text-xs text-aqua-300">{message}</p>}
        </form>
      </SectionCard>

      <SectionCard title="Vendor List" subtitle="All registered vendors">
        <DataTable columns={columns} rows={vendors} />
      </SectionCard>
    </div>
  );
}
