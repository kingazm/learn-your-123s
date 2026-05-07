import CharacterPicker from '../CharacterPicker'

interface Props {
  chars: string[]
  selected: string | null
  onSelect: (char: string) => void
  onClose: () => void
}

export default function CharacterPickerModal({ chars, selected, onSelect, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rotate-[-1.5deg] rounded-2xl border-2 border-brand-300 bg-brand-100 p-5 shadow-[0_12px_32px_rgb(var(--c-500)_/_0.22),0_4px_8px_rgba(0,0,0,.08)]"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 h-6 w-6 rounded-full border border-brand-200 bg-white text-sm font-bold text-brand-500 hover:bg-brand-50"
        >×</button>
        <CharacterPicker chars={chars} selected={selected} onSelect={onSelect} />
      </div>
    </div>
  )
}
