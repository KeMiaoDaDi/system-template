import { BUSINESS_CONFIG } from "@/lib/config/business.config";

export function BusinessInfo() {
  const { description, address, phone, email, amenities } = BUSINESS_CONFIG;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4">About the Studio</h2>
          <p className="text-stone-600 leading-relaxed mb-6">{description}</p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {amenities.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full font-medium"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Contact & Location */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Find Us</h2>

          <InfoRow icon={<MapPinIcon />} label="Address" value={address} />
          <InfoRow icon={<PhoneIcon />} label="Phone" value={phone} href={`tel:${phone}`} />
          <InfoRow icon={<MailIcon />} label="Email" value={email} href={`mailto:${email}`} />
        </div>
      </div>
    </section>
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
    <div className="flex items-start gap-3">
      <div className="mt-0.5 h-9 w-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-stone-800 text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
