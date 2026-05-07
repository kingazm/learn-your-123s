const ROWS = [
  { label: 'Digits practiced', value: '—' },
  { label: 'Correct answers',  value: '—' },
  { label: 'Accuracy',         value: '—' },
  { label: 'Best streak',      value: '—' },
]

export default function StatsPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-10">

      {/* preview: stat rows */}
      <div className="flex w-full max-w-[200px] flex-col gap-2">
        {ROWS.map(r => (
          <div key={r.label} className="flex items-center justify-between gap-4">
            <span className="text-[0.72rem] font-bold text-brand-300">{r.label}</span>
            <span className="text-[0.82rem] font-extrabold text-brand-200">{r.value}</span>
          </div>
        ))}
      </div>

      {/* label + description */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-brand-100 px-3 py-[3px] text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-brand-400">
          Coming soon
        </span>
        <h2 className="text-[1.1rem] font-extrabold text-brand-700">History &amp; Stats</h2>
        <p className="max-w-[240px] text-[0.78rem] leading-relaxed text-brand-400">
          Track which digits you've practiced, your accuracy over time, and your longest correct streaks.
        </p>
      </div>

    </div>
  )
}
