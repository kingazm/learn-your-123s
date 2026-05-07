import type { ReactNode } from 'react'

import { type Mode, MODES } from '../../config/modes'
import { tabClass } from './tabClass'

interface Props {
  mode: Mode | null
  onSwitch: (m: Mode) => void
  locked?: boolean
  trailing?: ReactNode
}

export default function BookTabs({ mode, onSwitch, locked, trailing }: Props) {
  return (
    <div className="flex shrink-0 items-end border-b-2 border-brand-200 px-3 sm:px-5">
      <div className="flex flex-1 items-end gap-2">
        {MODES.map(m => (
          <button
            key={m.id}
            type="button"
            onClick={() => !locked && onSwitch(m.id)}
            className={`${tabClass(mode === m.id)} ${locked ? 'cursor-default' : ''}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      {trailing && <div className="flex shrink-0 items-end gap-2 pl-2">{trailing}</div>}
    </div>
  )
}
