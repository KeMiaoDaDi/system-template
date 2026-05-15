"use client";

import { useState } from "react";
import { Service } from "@/lib/types";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/data/services";
import { ServiceEditor } from "@/components/admin/ServiceEditor";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(SERVICES);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Services & Pricing</h1>
        <p className="text-stone-400 text-sm">Add, edit, and manage your service menu</p>
      </div>

      <ServiceEditor
        categories={SERVICE_CATEGORIES}
        services={services}
        onSave={(updated) => setServices(updated)}
      />
    </div>
  );
}
