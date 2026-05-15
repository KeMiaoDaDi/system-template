import { STAFF_MEMBERS } from "@/lib/data/staff";

const AVATAR_GRADIENTS = [
  "from-rose-200 to-pink-300",
  "from-violet-200 to-purple-300",
  "from-sky-200 to-blue-300",
];

export function StaffSection() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-stone-900 mb-1">Meet the team</h2>
        <p className="text-stone-500 text-sm">Expert technicians dedicated to your perfect nails</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STAFF_MEMBERS.map((member, i) => {
          const initials = member.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={member.id}
              className="rounded-2xl border border-stone-100 bg-white hover:border-stone-200 hover:shadow-md transition-all duration-300 p-6"
            >
              {/* Initials avatar */}
              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center mb-5`}
              >
                <span className="text-white font-bold text-xl tracking-tight">{initials}</span>
              </div>

              <h3 className="font-bold text-stone-900 text-base">{member.name}</h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5 mb-3">{member.role}</p>
              <p className="text-sm text-stone-600 leading-relaxed">{member.bio}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
