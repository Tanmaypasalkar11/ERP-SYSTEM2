import React, { useEffect, useState } from "react";
import SectionCard from "../components/SectionCard";
import DataTable from "../components/DataTable";
import { api } from "../lib/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [form, setForm] = useState({ name: "", type: "RAW_MATERIAL", unit: "" });
  const [bomLine, setBomLine] = useState({ rawMaterialId: "", quantityRequired: "" });
  const [bom, setBom] = useState([]);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const data = await api.products();
    setProducts(data);
    setRawMaterials(data.filter((item) => item.type === "RAW_MATERIAL"));
  };

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const addBomLine = () => {
    if (!bomLine.rawMaterialId || !bomLine.quantityRequired) return;
    setBom([...bom, { ...bomLine, quantityRequired: Number(bomLine.quantityRequired) }]);
    setBomLine({ rawMaterialId: "", quantityRequired: "" });
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await api.createProduct({
        ...form,
        bom: form.type === "FINISHED_GOOD" ? bom : undefined
      });
      setForm({ name: "", type: "RAW_MATERIAL", unit: "" });
      setBom([]);
      setMessage("Product created.");
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create product.");
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "unit", label: "Unit" },
    { key: "inventory", label: "Stock", render: (row) => row.inventory?.quantity ?? 0 }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <SectionCard title="Create Product" subtitle="Register raw materials or finished goods">
        <form className="grid gap-4" onSubmit={submitProduct}>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Product name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Unit (kg, pcs)"
              value={form.unit}
              onChange={(event) => setForm({ ...form, unit: event.target.value })}
              required
            />
          </div>
          <select
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            value={form.type}
            onChange={(event) => setForm({ ...form, type: event.target.value })}
          >
            <option value="RAW_MATERIAL" className="text-ink-900">
              Raw Material
            </option>
            <option value="FINISHED_GOOD" className="text-ink-900">
              Finished Good
            </option>
          </select>

          {form.type === "FINISHED_GOOD" && (
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white">Bill of Material</p>
              <div className="grid gap-3 md:grid-cols-2">
                <select
                  className="w-full rounded-2xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white"
                  value={bomLine.rawMaterialId}
                  onChange={(event) => setBomLine({ ...bomLine, rawMaterialId: event.target.value })}
                >
                  <option value="" className="text-ink-900">
                    Select raw material
                  </option>
                  {rawMaterials.map((item) => (
                    <option key={item.id} value={item.id} className="text-ink-900">
                      {item.name}
                    </option>
                  ))}
                </select>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white"
                  placeholder="Qty required"
                  value={bomLine.quantityRequired}
                  onChange={(event) => setBomLine({ ...bomLine, quantityRequired: event.target.value })}
                />
              </div>
              <button
                type="button"
                onClick={addBomLine}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70"
              >
                Add BOM Line
              </button>
              {bom.length > 0 && (
                <ul className="text-xs text-white/70">
                  {bom.map((line, index) => {
                    const material = rawMaterials.find((item) => item.id === line.rawMaterialId);
                    return (
                      <li key={`${line.rawMaterialId}-${index}`}>
                        {material?.name || line.rawMaterialId} · {line.quantityRequired}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          <button type="submit" className="rounded-full bg-aqua-600 px-6 py-3 text-sm font-medium text-ink-900 shadow-glow">
            Create Product
          </button>
          {message && <p className="text-xs text-aqua-300">{message}</p>}
        </form>
      </SectionCard>

      <SectionCard title="Product List" subtitle="All raw materials and finished goods">
        <DataTable columns={columns} rows={products} />
      </SectionCard>
    </div>
  );
}
