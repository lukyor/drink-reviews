import { supabase } from "@/lib/supabase";
import ReviewCard from "@/components/ReviewCard";
import type { Review } from "@/lib/types";

export const revalidate = 0;

function slugifyCategory(category: string) {
  return category.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
}

function formatCategoryLabel(category: string) {
  const value = category.trim() || "Uncategorised";
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function HomePage() {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .order("category", { ascending: true })
    .order("created_at", { ascending: false });

  const groupedReviews = ((reviews as Review[] | null) ?? []).reduce<
    Record<string, { label: string; reviews: Review[] }>
  >((groups, review) => {
    const rawCategory = review.category.trim() || "Uncategorised";
    const categoryKey = rawCategory.toLowerCase();
    const label = formatCategoryLabel(rawCategory);

    if (!groups[categoryKey]) {
      groups[categoryKey] = { label, reviews: [] };
    }

    groups[categoryKey].reviews.push(review);
    return groups;
  }, {});

  const categories = Object.entries(groupedReviews)
    .map(([key, value]) => ({
      key,
      label: value.label,
      reviews: value.reviews,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div>
      <p className="font-display text-lg italic text-stone">
        We drink beer, together.
      </p>
      <h1 className="mt-1 max-w-prose font-display text-4xl text-ink">
        Honest beer reviews, scores, and notes from a small group of friends.
      </h1>

      <div className="mt-10">
        {error && (
          <p className="text-sm text-wine">
            Couldn't load reviews. Check your Supabase setup in .env.local.
          </p>
        )}

        {!error && categories.length === 0 && (
          <p className="text-sm text-stone">
            No reviews yet — the first one is waiting to be written.
          </p>
        )}

        {!error && categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
              <a
                key={key}
                href={`#${slugifyCategory(label)}`}
                className="rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-stone transition-colors hover:border-brass hover:text-ink"
              >
                {label}
              </a>
            ))}
          </div>
        )}

        {!error && categories.length > 0 && (
          <div className="space-y-10">
            {categories.map(({ key, label, reviews: categoryReviews }) => (
              <section
                key={key}
                id={slugifyCategory(label)}
                className="scroll-mt-24"
              >
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-line pb-3">
                  <h2 className="font-display text-2xl text-ink">{label}</h2>
                  <span className="rounded-full bg-brass/10 px-2.5 py-1 text-xs uppercase tracking-[0.12em] text-stone">
                    {categoryReviews.length}
                  </span>
                </div>

                <div>
                  {categoryReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
