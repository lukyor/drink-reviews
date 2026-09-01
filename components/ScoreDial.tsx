export default function ScoreDial({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(5, score));

  return (
    <div className="flex items-center gap-2" aria-label={`Score ${clamped} out of 5`}>
      <div className="flex gap-[3px]">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className="h-2 w-4 rounded-sm"
            style={{
              backgroundColor: n <= clamped ? "#B8863B" : "#D8D0BE",
            }}
          />
        ))}
      </div>
      <span className="font-display text-lg text-ink">{clamped.toFixed(1)}</span>
    </div>
  );
}
