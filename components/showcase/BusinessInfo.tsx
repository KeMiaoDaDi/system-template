import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function AboutSection() {
  const { description, name } = BUSINESS_CONFIG;

  return (
    <section
      className="relative py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, #F5EDE4 0%, #FAF8F5 70%)",
      }}
    >
      {/* Decorative large background lettering */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[18vw] font-black text-stone-900/[0.03] leading-none tracking-tighter uppercase"
      >
        {name}
      </span>

      {/* Thin ornamental rule */}
      <div className="relative flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-16 bg-stone-300" />
        <svg className="h-4 w-4 text-stone-300 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z" />
        </svg>
        <div className="h-px w-16 bg-stone-300" />
      </div>

      {/* Content */}
      <div className="relative max-w-2xl mx-auto text-center">
        {/* Oversized decorative quote mark */}
        <div
          aria-hidden
          className="text-8xl leading-none text-stone-200 font-serif mb-2 select-none"
          style={{ fontFamily: "Georgia, serif" }}
        >
          "
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-5">About the Studio</h2>
        <p className="text-stone-600 leading-relaxed text-base">{description}</p>
      </div>

      {/* Thin ornamental rule (bottom) */}
      <div className="relative flex items-center justify-center gap-4 mt-8">
        <div className="h-px w-16 bg-stone-300" />
        <div className="h-1 w-1 rounded-full bg-stone-300" />
        <div className="h-px w-16 bg-stone-300" />
      </div>
    </section>
  );
}

export function ContactSection() {
  const { address, phone, email } = BUSINESS_CONFIG;

  return (
    <div>
      {/* Section label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">Location</p>
      <h2 className="text-2xl font-bold text-stone-900 mb-6">Find Us</h2>

      <div className="space-y-3">
        <InfoRow icon={<MapPinIcon />} label="Address" value={address} />
        <InfoRow icon={<PhoneIcon />} label="Phone" value={phone} href={`tel:${phone}`} />
        <InfoRow icon={<MailIcon />} label="Email" value={email} href={`mailto:${email}`} />
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all">
      <div className="mt-0.5 h-9 w-9 rounded-xl flex items-center justify-center text-stone-600 shrink-0"
        style={{ background: "linear-gradient(135deg, #F5EDE4 0%, #EDE5DA 100%)" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-stone-800 text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
