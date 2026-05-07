export const MODES = [
  { id: 'learn',    label: 'Learn'    },
  { id: 'practice', label: 'Practice' },
  { id: 'test',     label: 'Test'     },
] as const

export type Mode    = (typeof MODES)[number]['id']
export type SubMode = '123s' | 'ABCs'
