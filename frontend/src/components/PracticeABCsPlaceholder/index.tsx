const WORDS = [
  { letters: ['C', 'A', 'T'], done: [true, true, false] },
  { letters: ['D', 'O', 'G'], done: [true, false, false] },
]

export default function PracticeABCsPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-10">

      {/* preview: spell-the-word rows */}
      <div className="flex flex-col gap-3">
        {WORDS.map((w, wi) => (
          <div key={wi} className="flex items-center gap-2">
            {w.letters.map((l, li) => (
              <div
                key={li}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border-2 text-[1rem] font-extrabold ${
                  w.done[li]
                    ? 'border-brand-400 bg-brand-100 text-brand-700'
                    : 'border-dashed border-brand-300 bg-white text-brand-300'
                }`}
              >
                {w.done[li] ? l : '?'}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* label + description */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-brand-100 px-3 py-[3px] text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-brand-400">
          Coming soon
        </span>
        <h2 className="text-[1.1rem] font-extrabold text-brand-700">Practice ABCs</h2>
        <p className="max-w-[240px] text-[0.78rem] leading-relaxed text-brand-400">
          Spell out words letter by letter — great handwriting practice that also builds vocabulary!
        </p>
      </div>

    </div>
  )
}
