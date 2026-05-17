import Link from "next/link";
import { HeroSection } from "@/components/showcase/HeroSection";
import { Gallery } from "@/components/showcase/Gallery";
import { ServiceShowcase } from "@/components/showcase/ServiceShowcase";
import { StaffSection } from "@/components/showcase/StaffSection";
import { ReviewsSection } from "@/components/showcase/ReviewsSection";
import { BrandInfoSection } from "@/components/showcase/BrandInfoSection";
import { WelcomePopup } from "@/components/ui/WelcomePopup";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />

        {/* Brand info + Find Us */}
        <BrandInfoSection />

        {/* Gallery */}
        <div id="gallery" className="border-b border-stone-100">
          <Gallery />
        </div>

        {/* Services */}
        <div id="services" className="border-t border-stone-100">
          <ServiceShowcase />
        </div>

        {/* Team */}
        <div id="team" className="border-t border-stone-100 bg-stone-50/50">
          <StaffSection />
        </div>

        {/* Reviews */}
        <div id="reviews" className="border-t border-stone-100">
          <ReviewsSection />
        </div>

        {/* Footer */}
        <footer className="border-t border-stone-100 py-10 px-4 md:px-8 bg-stone-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p
                className="text-white"
                style={{ fontFamily: "var(--font-allura)", fontSize: "1.6rem", lineHeight: 1 }}
              >
                {BUSINESS_CONFIG.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/booking" className="text-sm font-medium text-white hover:text-stone-200 transition-colors">
                Book Now
              </Link>
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-sm text-stone-400 hover:text-stone-200 transition-colors">
                {BUSINESS_CONFIG.email}
              </a>
              <Link href="/admin" className="text-xs text-stone-600 hover:text-stone-400 transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile sticky Book Now bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-100 px-4 py-3 shadow-lg">
        <Link
          href="/booking"
          className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-stone-700 active:bg-stone-800 transition-all duration-200 text-sm"
        >
          Book Now
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Welcome popup + floating badge */}
      <WelcomePopup />
    </>
  );
}
