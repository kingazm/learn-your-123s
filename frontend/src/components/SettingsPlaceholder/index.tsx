import type { Settings } from '../../hooks/useSettings'

interface Props {
  settings: Settings
  onUpdate: (patch: Partial<Settings>) => void
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? 'bg-brand-500' : 'bg-brand-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-[0.82rem] font-bold text-brand-600">{label}</span>
      {children}
    </div>
  )
}

export default function SettingsPlaceholder({ settings, onUpdate }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-10">

      <div className="flex w-full max-w-[240px] flex-col gap-5">
        <h2 className="text-[1.1rem] font-extrabold text-brand-700">Settings</h2>

        <Row label="Sound effects">
          <Toggle checked={settings.soundEnabled} onChange={v => onUpdate({ soundEnabled: v })} />
        </Row>

        <Row label="Animations">
          <Toggle checked={settings.animationsEnabled} onChange={v => onUpdate({ animationsEnabled: v })} />
        </Row>

        <Row label="Theme">
          <div className="flex gap-2.5">
            <button
              type="button"
              title="Pink"
              onClick={() => onUpdate({ theme: 'pink' })}
              className={`h-6 w-6 rounded-full border-2 transition-transform duration-150 ${
                settings.theme === 'pink' ? 'border-pink-700 scale-110' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: '#ec4899' }}
            />
            <button
              type="button"
              title="Blue"
              onClick={() => onUpdate({ theme: 'blue' })}
              className={`h-6 w-6 rounded-full border-2 transition-transform duration-150 ${
                settings.theme === 'blue' ? 'border-blue-700 scale-110' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: '#3b82f6' }}
            />
            <button
              type="button"
              title="Yellow"
              onClick={() => onUpdate({ theme: 'yellow' })}
              className={`h-6 w-6 rounded-full border-2 transition-transform duration-150 ${
                settings.theme === 'yellow' ? 'border-yellow-700 scale-110' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: '#f59e0b' }}
            />
          </div>
        </Row>
      </div>

    </div>
  )
}
