const ROUNDS = [
  { label: '7', points: 10, correct: true  },
  { label: '3', points: 10, correct: true  },
  { label: '9', points:  0, correct: false },
]

export default function TestModePlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-10">

      {/* preview: mini score feed */}
      <div className="flex flex-col gap-2">
        {ROUNDS.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 text-[0.9rem] font-extrabold ${
              r.correct
                ? 'border-brand-400 bg-brand-100 text-brand-700'
                : 'border-brand-200 bg-white text-brand-300'
            }`}>
              {r.label}
            </div>
            <div className={`h-1.5 w-20 rounded-full ${r.correct ? 'bg-brand-400' : 'bg-brand-100'}`} />
            <span className={`text-[0.75rem] font-extrabold tabular-nums ${r.correct ? 'text-brand-600' : 'text-brand-300'}`}>
              {r.correct ? `+${r.points}` : '—'}
            </span>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-end gap-1.5 border-t border-brand-100 pt-2">
          <span className="text-[0.7rem] font-bold uppercase tracking-widest text-brand-300">total</span>
          <span className="text-[0.95rem] font-extrabold text-brand-600">20 pts</span>
        </div>
      </div>

      {/* label + description */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-brand-100 px-3 py-[3px] text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-brand-400">
          Coming soon
        </span>
        <h2 className="text-[1.1rem] font-extrabold text-brand-700">Quiz &amp; Points</h2>
        <p className="max-w-[240px] text-[0.78rem] leading-relaxed text-brand-400">
          Answer rounds of digit challenges, earn points for correct answers, and build streaks — how high can you score?
        </p>
      </div>

    </div>
  )
}
