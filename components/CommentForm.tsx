"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CommentForm({ reviewId }: { reviewId: string }) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState<number | "">("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;

    setStatus("saving");
    const { error } = await supabase.from("comments").insert({
      review_id: reviewId,
      author_name: name.trim(),
      body: body.trim(),
      score: score === "" ? null : score,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setName("");
    setBody("");
    setScore("");
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="rounded border border-line bg-white/40 px-4 py-3 text-sm text-ink">
        Thanks — your comment has been added. Refresh to see it below.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 rounded border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-brass"
        />
        <select
          value={score}
          onChange={(e) => setScore(e.target.value === "" ? "" : Number(e.target.value))}
          className="rounded border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-brass"
        >
          <option value="">No rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} / 5
            </option>
          ))}
        </select>
      </div>
      <textarea
        placeholder="What did you think?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        rows={3}
        className="w-full rounded border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-brass"
      />
      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-brass disabled:opacity-50"
      >
        {status === "saving" ? "Posting…" : "Post comment"}
      </button>
      {status === "error" && (
        <p className="text-sm text-wine">Something went wrong — try again.</p>
      )}
    </form>
  );
}
