import type { SubMode } from '../../config/modes'

const OPTIONS: { id: SubMode; label: string }[] = [
  { id: '123s', label: '123s' },
  { id: 'ABCs', label: 'ABCs' },
]

interface Props {
  value: SubMode
  onChange: (v: SubMode) => void
  disabled?: boolean
}

export default function SegmentedControl({ value, onChange, disabled }: Props) {
  return (
    <div className="inline-flex rounded-full border border-brand-200 bg-brand-50 p-0.5 gap-0.5">
      {OPTIONS.map(opt => (
        <button
          key={opt.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt.id)}
          className={`rounded-full px-3 py-0.5 text-[0.72rem] font-extrabold transition-colors duration-150 ${
            value === opt.id
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-brand-400 hover:text-brand-600'
          } ${disabled ? 'cursor-default opacity-60' : ''}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
