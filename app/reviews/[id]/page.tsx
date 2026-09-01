import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ScoreDial from "@/components/ScoreDial";
import CommentForm from "@/components/CommentForm";
import type { Comment, Review } from "@/lib/types";

export const revalidate = 0;

export default async function ReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: review } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", params.id)
    .single<Review>();

  if (!review) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("review_id", params.id)
    .order("created_at", { ascending: true });

  return (
    <article>
      <p className="text-xs uppercase tracking-wide text-stone">
        {review.category}
      </p>
      <h1 className="mt-1 font-display text-4xl text-ink">{review.name}</h1>
      <div className="mt-4">
        <ScoreDial score={review.score} />
      </div>
      <p className="mt-6 max-w-prose whitespace-pre-line text-ink/90">
        {review.notes}
      </p>

      <section className="mt-14 border-t border-line pt-8">
        <h2 className="font-display text-2xl text-ink">
          {comments && comments.length > 0
            ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
            : "Be the first to comment"}
        </h2>

        <div className="mt-6 space-y-5">
          {(comments as Comment[] | null)?.map((comment) => (
            <div key={comment.id} className="border-b border-line pb-5">
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink">{comment.author_name}</p>
                {comment.score !== null && (
                  <span className="text-sm text-brass">{comment.score} / 5</span>
                )}
              </div>
              <p className="mt-1 text-sm text-ink/80">{comment.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <CommentForm reviewId={review.id} />
        </div>
      </section>
    </article>
  );
}
