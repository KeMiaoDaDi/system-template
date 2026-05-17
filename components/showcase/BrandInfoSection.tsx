import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function BrandInfoSection() {
  const { name, tagline, description, phone, email } = BUSINESS_CONFIG;

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-stone-100 py-16 md:py-24 px-6 md:px-12 lg:px-20"
      style={{
        background: "radial-gradient(ellipse 90% 70% at 50% 50%, #F5EDE4 0%, #FAF8F5 75%)",
      }}
    >
      {/* Large faint watermark */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center leading-none text-stone-900/[0.025]"
        style={{ fontFamily: "var(--font-allura)", fontSize: "22vw" }}
      >
        {name}
      </span>

      {/* Top ornamental rule */}
      <div className="relative flex items-center justify-center gap-4 mb-12">
        <div className="h-px w-16 bg-stone-300" />
        <svg className="h-3.5 w-3.5 text-stone-300 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z" />
        </svg>
        <div className="h-px w-16 bg-stone-300" />
      </div>

      {/* Content grid — Cormorant Garamond scoped to this section */}
      <div
        className="relative max-w-7xl mx-auto grid md:grid-cols-[3fr_2fr] gap-14 md:gap-20"
        style={{ fontFamily: "var(--font-italiana)" }}
      >

        {/* Left — brand story */}
        <div>
          <h2
            className="text-6xl md:text-7xl lg:text-8xl text-stone-900 mb-5 leading-none"
            style={{ fontFamily: "var(--font-allura)", fontWeight: 400 }}
          >
            {name}
          </h2>
          <p
            className="text-stone-500 mb-6 leading-relaxed"
            style={{ fontFamily: "var(--font-italiana)", fontSize: "1.1rem" }}
          >
            {tagline}
          </p>
          <p className="text-sm text-stone-500 leading-loose max-w-xl mb-10">
            {description}
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 border border-stone-900 text-stone-900 text-xs font-semibold uppercase tracking-widest px-7 py-3.5 hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Right — contact info */}
        <div className="flex flex-col justify-start gap-10 pt-2">
          <InfoBlock
            label="Location"
            icon={<MapPinIcon />}
            lines={["65 Whitechapel Road, Room 222", "WorkspaceEast London Works", "London, E1 1DU"]}
          />
          <InfoBlock
            label="Phone"
            icon={<PhoneIcon />}
            lines={[phone]}
            href={`tel:${phone}`}
          />
          <InfoBlock
            label="Email"
            icon={<MailIcon />}
            lines={[email]}
            href={`mailto:${email}`}
          />
          <InfoBlock
            label="Instagram"
            icon={<InstagramIcon />}
            lines={["@catpro.nails"]}
            href="https://www.instagram.com/catpro.nails"
          />
        </div>
      </div>

      {/* Bottom ornamental rule */}
      <div className="relative flex items-center justify-center gap-4 mt-12">
        <div className="h-px w-16 bg-stone-300" />
        <div className="h-1.5 w-1.5 rounded-full bg-stone-300" />
        <div className="h-px w-16 bg-stone-300" />
      </div>
    </section>
  );
}

function InfoBlock({
  label,
  icon,
  lines,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 text-stone-400 shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1.5">
          {label}
        </p>
        {lines.map((l, i) => (
          <p key={i} className="text-sm text-stone-700 leading-relaxed">
            {l}
          </p>
        ))}
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="hover:opacity-70 transition-opacity">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
