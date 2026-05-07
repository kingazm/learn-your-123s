const LETTERS = ['A', 'b', 'C', 'd']

export default function LearnABCsPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-10">

      {/* preview: letter tiles */}
      <div className="flex items-center gap-3">
        {LETTERS.map((l, i) => (
          <div
            key={i}
            className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-brand-200 bg-brand-50 text-[1.5rem] font-extrabold text-brand-300"
          >
            {l}
          </div>
        ))}
      </div>

      {/* label + description */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-brand-100 px-3 py-[3px] text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-brand-400">
          Coming soon
        </span>
        <h2 className="text-[1.1rem] font-extrabold text-brand-700">Learn ABCs</h2>
        <p className="max-w-[240px] text-[0.78rem] leading-relaxed text-brand-400">
          Trace and practice every letter of the alphabet with guided outlines and instant AI feedback.
        </p>
      </div>

    </div>
  )
}
