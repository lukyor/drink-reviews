import Link from "next/link";
import ScoreDial from "./ScoreDial";
import type { Review } from "@/lib/types";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Link
      href={`/reviews/${review.id}`}
      className="group flex items-center justify-between gap-6 border-b border-line py-6 first:pt-0"
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-stone">
          {review.category}
        </p>
        <h2 className="font-display text-2xl text-ink group-hover:text-brass transition-colors">
          {review.name}
        </h2>
        <p className="mt-1 line-clamp-1 max-w-prose text-sm text-stone">
          {review.notes}
        </p>
      </div>
      <ScoreDial score={review.score} />
    </Link>
  );
}
