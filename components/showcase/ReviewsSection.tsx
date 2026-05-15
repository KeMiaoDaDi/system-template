import { REVIEWS } from "@/lib/data/reviews";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? "text-amber-400 fill-amber-400" : "text-stone-300 fill-stone-300"}`}
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= rating} />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const { rating, reviewCount } = BUSINESS_CONFIG;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">What clients say</h2>
          <div className="flex items-center gap-2 mt-2">
            <StarRow rating={5} />
            <span className="text-stone-700 font-semibold text-sm">{rating.toFixed(1)}</span>
            <span className="text-stone-400 text-sm">· {reviewCount} verified reviews</span>
          </div>
        </div>
      </div>

      {/* Review grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="p-5 rounded-2xl border border-stone-100 bg-white hover:border-stone-200 hover:shadow-sm transition-all"
          >
            {/* Reviewer */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: review.avatarColor }}
              >
                {review.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900 leading-tight">{review.name}</p>
                <p className="text-xs text-stone-400">{review.date}</p>
              </div>
            </div>

            <StarRow rating={review.rating} />

            {review.text && (
              <p className="mt-3 text-sm text-stone-600 leading-relaxed">{review.text}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
