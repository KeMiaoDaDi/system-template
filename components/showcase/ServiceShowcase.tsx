import Link from "next/link";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/data/services";
import { formatPrice, formatDuration } from "@/lib/utils/format";

export function ServiceShowcase() {
  const activeServices = SERVICES.filter((s) => s.isActive);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Services</h2>
          <p className="text-stone-500 text-sm">Explore what we offer</p>
        </div>
        <Link
          href="/booking"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 border border-stone-200 px-4 py-2 rounded-xl hover:bg-stone-50 transition-colors"
        >
          Book a service
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="space-y-8">
        {SERVICE_CATEGORIES.map((cat) => {
          const catServices = activeServices.filter((s) => s.categoryId === cat.id);
          if (catServices.length === 0) return null;

          return (
            <div key={cat.id}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-400 mb-3">
                {cat.name}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {catServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-4 rounded-2xl border border-stone-100 bg-white hover:border-stone-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-stone-900 text-sm leading-snug">{svc.name}</h4>
                      <span className="shrink-0 font-bold text-stone-900 text-sm">{formatPrice(svc.price)}</span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed mb-3">{svc.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-stone-400 font-medium">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDuration(svc.duration)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/booking"
          className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-stone-700 transition-colors text-sm"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
