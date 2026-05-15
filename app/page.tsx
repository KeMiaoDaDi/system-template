import Link from "next/link";
import { HeroSection } from "@/components/showcase/HeroSection";
import { Gallery } from "@/components/showcase/Gallery";
import { AboutSection, ContactSection } from "@/components/showcase/BusinessInfo";
import { ServiceShowcase } from "@/components/showcase/ServiceShowcase";
import { OpeningHoursBlock } from "@/components/showcase/OpeningHoursDisplay";
import { StaffSection } from "@/components/showcase/StaffSection";
import { ReviewsSection } from "@/components/showcase/ReviewsSection";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />

        {/* Sticky nav — desktop */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-stone-100 hidden md:block">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-14">
            <nav className="flex items-center gap-6 text-sm font-medium text-stone-500">
              <a href="#gallery" className="hover:text-stone-900 transition-colors">Photos</a>
              <a href="#services" className="hover:text-stone-900 transition-colors">Services</a>
              <a href="#team" className="hover:text-stone-900 transition-colors">Team</a>
              <a href="#reviews" className="hover:text-stone-900 transition-colors">Reviews</a>
              <a href="#about" className="hover:text-stone-900 transition-colors">About</a>
            </nav>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-stone-900 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-stone-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              Book Now
            </Link>
          </div>
        </div>

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

        {/* About — full width centred */}
        <div id="about" className="border-t border-stone-100">
          <AboutSection />
        </div>

        {/* Opening Hours + Find Us — side by side */}
        <div
          className="border-t border-stone-100 relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #F5EDE4 0%, #FAF8F5 100%)" }}
        >
          {/* Decorative circle blurs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #E8C5B8 0%, transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #C4A882 0%, transparent 70%)" }}
          />
          <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-14">
              <OpeningHoursBlock />
              <ContactSection />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="border-t border-stone-100 py-10 px-4 md:px-8 bg-stone-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-sm">{BUSINESS_CONFIG.name}</p>
              <p className="text-stone-400 text-xs mt-0.5">{BUSINESS_CONFIG.address}</p>
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
    </>
  );
}
