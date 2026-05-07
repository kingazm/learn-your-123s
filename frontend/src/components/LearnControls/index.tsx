interface Props {
  selectedChar: string | null
  showGuide: boolean
  onOpenPicker: () => void
  onToggleGuide: (v: boolean) => void
}

export default function LearnControls({ selectedChar, showGuide, onOpenPicker, onToggleGuide }: Props) {
  return (
    <div className="flex w-full items-center gap-3 px-4 pb-2 sm:px-6 mb-2 justify-center short:mb-0 short:pb-3">
      <button
        type="button"
        onClick={onOpenPicker}
        className="inline-flex items-center py-1 px-2 gap-1.5 rounded-lg border border-brand-200 bg-brand-50 text-[0.82rem] font-bold text-brand-700 transition-colors hover:bg-brand-100"
      >
        {selectedChar ? `Drawing: ${selectedChar}` : 'Choose character'}
        <span aria-hidden="true" className="text-brand-400">▸</span>
      </button>

      <label className="flex cursor-pointer select-none items-center gap-1.5 text-[0.78rem] font-bold text-brand-600">
        <input
          type="checkbox"
          checked={showGuide}
          onChange={e => onToggleGuide(e.target.checked)}
          className="peer h-3.5 w-3.5 cursor-pointer appearance-none rounded-sm border border-brand-300 bg-white checked:bg-brand-500 checked:border-brand-500 focus:outline-none"
        />
        <span className="pointer-events-none absolute ml-[3px] hidden h-5 w-5 text-white peer-checked:block">✓</span>
        <span>Show guide</span>
      </label>
    </div>
  )
}
