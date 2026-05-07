export interface Prediction {
  digit: number
  confidence: number
}

export type Mood = 'idle' | 'thinking' | 'happy' | 'sad'

export type { Mode } from './config/modes'
