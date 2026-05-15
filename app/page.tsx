import Link from "next/link";
import { HeroSection } from "@/components/showcase/HeroSection";
import { Gallery } from "@/components/showcase/Gallery";
import { BusinessInfo } from "@/components/showcase/BusinessInfo";
import { ServiceShowcase } from "@/components/showcase/ServiceShowcase";
import { OpeningHoursDisplay } from "@/components/showcase/OpeningHoursDisplay";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <div className="border-b border-stone-100" />

      <Gallery />

      <div className="border-t border-stone-100">
        <ServiceShowcase />
      </div>

      <div className="border-t border-stone-100">
        <BusinessInfo />
      </div>

      <div className="border-t border-stone-100">
        <OpeningHoursDisplay />
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-100 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-stone-900 text-sm">{BUSINESS_CONFIG.name}</p>
            <p className="text-stone-400 text-xs mt-0.5">{BUSINESS_CONFIG.address}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/booking" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
              Book Now
            </Link>
            <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-sm text-stone-400 hover:text-stone-700 transition-colors">
              {BUSINESS_CONFIG.email}
            </a>
            <Link href="/admin" className="text-xs text-stone-300 hover:text-stone-500 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
