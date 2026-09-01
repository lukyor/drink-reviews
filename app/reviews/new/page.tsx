"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewReviewPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [score, setScore] = useState(3);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const { data, error } = await supabase
      .from("reviews")
      .insert({ name, category, score, notes })
      .select()
      .single();

    if (error || !data) {
      setStatus("error");
      return;
    }

    router.push(`/reviews/${data.id}`);
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Log a drink</h1>
      <p className="mt-1 text-sm text-stone">
        This page is open to anyone for now — you can lock it down later once
        you add authentication.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-prose space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Espresso Martini"
            className="mt-1 w-full rounded border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-brass"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="e.g. Cocktail, Coffee, Beer"
            className="mt-1 w-full rounded border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-brass"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">
            Score: {score} / 5
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="mt-2 w-full accent-brass"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">
            Tasting notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            rows={6}
            placeholder="What did it taste like? Would you order it again?"
            className="mt-1 w-full rounded border border-line bg-white/60 px-3 py-2 text-sm outline-none focus-visible:border-brass"
          />
        </div>

        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-brass disabled:opacity-50"
        >
          {status === "saving" ? "Saving…" : "Publish review"}
        </button>
        {status === "error" && (
          <p className="text-sm text-wine">
            Something went wrong saving that — check your Supabase setup.
          </p>
        )}
      </form>
    </div>
  );
}
