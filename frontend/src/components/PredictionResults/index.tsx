import type { Prediction } from '../../types'

interface Props {
  predictions: Prediction[]
}

export default function PredictionResults({ predictions }: Props) {
  if (predictions.length === 0) return null
  return (
    <div className="w-[300px]">
      {predictions.map((p, i) => (
        <div key={i} className="mb-[0.55rem] flex items-center gap-[0.65rem]">
          <span className="w-[1.8rem] text-center text-[1.5rem] font-extrabold text-brand-700">{p.digit}</span>
          <div className="h-6 flex-1 overflow-hidden rounded-full bg-brand-100">
            <div
              className={`flex h-full min-w-[2.8rem] items-center rounded-full pl-[10px] text-[0.78rem] font-bold text-white transition-[width] duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] ${
                i === 0
                  ? 'bg-[linear-gradient(90deg,rgb(var(--c-500)),rgb(var(--c-400)))]'
                  : i === 1
                    ? 'bg-[linear-gradient(90deg,rgb(var(--c-400)),rgb(var(--c-500)))]'
                    : 'bg-[linear-gradient(90deg,rgb(var(--c-300)),rgb(var(--c-400)))]'
              }`}
              style={{ width: `${Math.max(p.confidence, 4)}%` }}
            >
              {p.confidence.toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
