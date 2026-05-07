import { useEffect,useState } from 'react'

export type Theme = 'pink' | 'blue' | 'yellow'

export interface Settings {
  soundEnabled: boolean
  animationsEnabled: boolean
  theme: Theme
}

const DEFAULT: Settings = { soundEnabled: true, animationsEnabled: true, theme: 'pink' }
const KEY = 'app-settings'

function applyToDOM(s: Settings) {
  document.documentElement.dataset.theme = s.theme
  if (s.animationsEnabled) {
    delete document.documentElement.dataset.noAnimations
  } else {
    document.documentElement.dataset.noAnimations = ''
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem(KEY)
      const loaded: Settings = raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT
      applyToDOM(loaded)
      return loaded
    } catch { return DEFAULT }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(settings))
    applyToDOM(settings)
  }, [settings])

  function update(patch: Partial<Settings>) {
    setSettings(s => ({ ...s, ...patch }))
  }

  return { settings, update }
}
