interface Props {
  chars: string[]
  selected: string | null
  onSelect: (char: string) => void
}

export default function CharacterPicker({ chars, selected, onSelect }: Props) {
  return (
    <div className="flex w-full flex-col gap-2 px-5 sm:px-7">
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.07em] text-brand-400">
        Choose a character
      </p>
      <div className="grid grid-cols-5 gap-1.5">
        {chars.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => onSelect(c)}
            className={`h-9 w-full rounded-lg border-2 text-[1rem] font-extrabold leading-none transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              selected === c
                ? 'border-brand-500 bg-brand-500 text-white shadow-[0_4px_12px_rgb(var(--c-500)_/_0.3)] -translate-y-px'
                : 'border-brand-200 bg-brand-50 text-brand-700 hover:border-brand-300 hover:bg-brand-100 hover:-translate-y-px active:scale-[0.96]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
