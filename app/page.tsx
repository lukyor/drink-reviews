import { supabase } from "@/lib/supabase";
import ReviewCard from "@/components/ReviewCard";
import type { Review } from "@/lib/types";

export const revalidate = 0;

export default async function HomePage() {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <p className="font-display text-lg italic text-stone">
        One drink at a time.
      </p>
      <h1 className="mt-1 max-w-prose font-display text-4xl text-ink">
        Notes, scores, and honest opinions on everything I've tried.
      </h1>

      <div className="mt-10">
        {error && (
          <p className="text-sm text-wine">
            Couldn't load reviews. Check your Supabase setup in .env.local.
          </p>
        )}

        {!error && reviews && reviews.length === 0 && (
          <p className="text-sm text-stone">
            No reviews yet — the first one is waiting to be written.
          </p>
        )}

        {!error &&
          reviews &&
          (reviews as Review[]).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
      </div>
    </div>
  );
}
