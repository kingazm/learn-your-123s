const DOTS = [3, 1, 4, 2]

export default function PracticeModePlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-10">

      {/* preview: groups of dots → write the count */}
      <div className="flex items-center gap-4">
        {DOTS.map((count, gi) => (
          <div key={gi} className="flex flex-col items-center gap-2">
            <div className={`grid gap-1.5 ${count > 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="h-4 w-4 rounded-full bg-brand-300" />
              ))}
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-dashed border-brand-300 text-[0.85rem] font-extrabold text-brand-300">
              ?
            </div>
          </div>
        ))}
      </div>

      {/* label + description */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-brand-100 px-3 py-[3px] text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-brand-400">
          Coming soon
        </span>
        <h2 className="text-[1.1rem] font-extrabold text-brand-700">Counting Practice</h2>
        <p className="max-w-[240px] text-[0.78rem] leading-relaxed text-brand-400">
          See a group of objects on screen and write how many there are — a fun way to connect digits to real quantities!
        </p>
      </div>

    </div>
  )
}
