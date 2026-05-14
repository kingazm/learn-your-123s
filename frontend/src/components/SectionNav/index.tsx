import { tabClass } from '../BookTabs/tabClass'

const ITEMS = [
  { id: 'stats',    label: 'Stats'    },
  { id: 'settings', label: 'Settings' },
  { id: 'about',    label: 'About'    },
]

interface Props {
  active: string | null
  onSelect: (id: string) => void
  locked?: boolean
}

export default function SectionNav({ active, onSelect, locked }: Props) {
  return (
    <>
      {ITEMS.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={() => !locked && onSelect(item.id)}
          className={`${tabClass(active === item.id)} ${locked ? 'cursor-default' : ''}`}
        >
          {item.label}
        </button>
      ))}
    </>
  )
}
