"use client";

import { useState } from "react";
import { Service, ServiceCategory } from "@/lib/types";
import { BOOKING_CONFIG } from "@/lib/config/business.config";
import { formatPrice, formatDuration } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface Props {
  categories: ServiceCategory[];
  services: Service[];
  onSave: (services: Service[]) => void;
}

const EMPTY_SERVICE: Omit<Service, "id"> = {
  categoryId: "",
  name: "",
  description: "",
  duration: 60,
  price: 0,
  currency: "GBP",
  isActive: true,
  staffIds: [],
};

export function ServiceEditor({ categories, services, onSave }: Props) {
  const [list, setList] = useState<Service[]>(services);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Omit<Service, "id">>(EMPTY_SERVICE);
  const [isAdding, setIsAdding] = useState(false);

  function startEdit(svc: Service) {
    setIsAdding(false);
    setEditingId(svc.id);
    setEditForm({ ...svc });
  }

  function startAdd() {
    setEditingId(null);
    setIsAdding(true);
    setEditForm({ ...EMPTY_SERVICE, categoryId: categories[0]?.id ?? "" });
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
  }

  function saveEdit() {
    let updated: Service[];
    if (isAdding) {
      const newSvc: Service = { ...editForm, id: `svc-${Date.now()}` };
      updated = [...list, newSvc];
    } else {
      updated = list.map((s) => (s.id === editingId ? { id: s.id, ...editForm } : s));
    }
    setList(updated);
    onSave(updated);
    cancelEdit();
  }

  function toggleActive(id: string) {
    const updated = list.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s));
    setList(updated);
    onSave(updated);
  }

  const isFormValid = editForm.name.trim().length > 0 && editForm.price >= 0 && editForm.duration > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-stone-900">Services</h2>
          <p className="text-stone-400 text-sm">{list.filter((s) => s.isActive).length} active services</p>
        </div>
        <Button onClick={startAdd} size="sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Service
        </Button>
      </div>

      {/* Add form */}
      {isAdding && (
        <ServiceForm
          form={editForm}
          categories={categories}
          onChange={(f) => setEditForm(f)}
          onSave={saveEdit}
          onCancel={cancelEdit}
          isValid={isFormValid}
          title="New Service"
        />
      )}

      {/* Service list by category */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const catServices = list.filter((s) => s.categoryId === cat.id);
          if (catServices.length === 0 && !isAdding) return null;

          return (
            <div key={cat.id}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">{cat.name}</h3>
              <div className="space-y-2">
                {catServices.map((svc) =>
                  editingId === svc.id ? (
                    <ServiceForm
                      key={svc.id}
                      form={editForm}
                      categories={categories}
                      onChange={(f) => setEditForm(f)}
                      onSave={saveEdit}
                      onCancel={cancelEdit}
                      isValid={isFormValid}
                      title="Edit Service"
                    />
                  ) : (
                    <div
                      key={svc.id}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl border transition-colors",
                        svc.isActive ? "border-stone-100 bg-white" : "border-stone-100 bg-stone-50 opacity-60"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-stone-900 text-sm">{svc.name}</p>
                          <Badge variant={svc.isActive ? "success" : "neutral"}>
                            {svc.isActive ? "Active" : "Hidden"}
                          </Badge>
                        </div>
                        <p className="text-stone-500 text-xs mt-0.5 truncate">{svc.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-stone-400">{formatDuration(svc.duration)}</span>
                          <span className="text-xs font-semibold text-stone-900">{formatPrice(svc.price)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => toggleActive(svc.id)}>
                          {svc.isActive ? "Hide" : "Show"}
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => startEdit(svc)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServiceForm({
  form,
  categories,
  onChange,
  onSave,
  onCancel,
  isValid,
  title,
}: {
  form: Omit<Service, "id">;
  categories: ServiceCategory[];
  onChange: (f: Omit<Service, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  isValid: boolean;
  title: string;
}) {
  const inputCls = "w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-colors";

  return (
    <div className="p-4 rounded-2xl border-2 border-stone-900 bg-white mb-4">
      <p className="text-sm font-bold text-stone-900 mb-4">{title}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-stone-500 mb-1">Name *</label>
          <input
            className={inputCls}
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            placeholder="e.g. Gel Manicure"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-stone-500 mb-1">Description</label>
          <textarea
            className={cn(inputCls, "resize-none")}
            rows={2}
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            placeholder="Brief description of the service…"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">Category</label>
          <select
            className={inputCls}
            value={form.categoryId}
            onChange={(e) => onChange({ ...form, categoryId: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">Duration (minutes) *</label>
          <input
            type="number"
            className={inputCls}
            value={form.duration}
            min={15}
            step={15}
            onChange={(e) => onChange({ ...form, duration: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">
            Price ({BOOKING_CONFIG.currencySymbol}) *
          </label>
          <input
            type="number"
            className={inputCls}
            value={form.price}
            min={0}
            step={0.01}
            onChange={(e) => onChange({ ...form, price: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" onClick={onSave} disabled={!isValid}>Save Service</Button>
      </div>
    </div>
  );
}
