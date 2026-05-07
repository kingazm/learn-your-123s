import { useCallback,useEffect, useRef } from 'react'

const SIZE = 380

interface Props {
  onDrawStart: () => void
  onPredict: (dataUrl: string) => void
  onClear: () => void
  onClick?: () => void
  clearSignal?: number
  guideChar?: string
  showCharGuide?: boolean
  disabled?: boolean
}

export default function DrawingCanvas({
  onDrawStart, onPredict, onClear, onClick,
  clearSignal = 0, guideChar, showCharGuide = true, disabled = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing   = useRef(false)
  const hasDrawn  = useRef(false)
  const debounce  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastClear = useRef(clearSignal)

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, SIZE, SIZE)
    ctx.lineWidth = 20
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  function strokeColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--brand-stroke').trim() || '#ec4899'
  }

  const getPos = useCallback((e: MouseEvent | TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const src  = 'touches' in e ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * (SIZE / rect.width),
      y: (src.clientY - rect.top)  * (SIZE / rect.height),
    }
  }, [])

  const onStart = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    drawing.current = true
    onDrawStart()
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.strokeStyle = strokeColor()
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }, [getPos, onDrawStart])

  const onMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current!.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    hasDrawn.current = true
  }, [getPos])

  const onEnd = useCallback(() => {
    if (!drawing.current) return
    drawing.current = false
    if (hasDrawn.current) {
      if (debounce.current) clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        onPredict(canvasRef.current!.toDataURL('image/png'))
      }, 400)
    }
  }, [onPredict])

  useEffect(() => {
    if (disabled) return
    const el = canvasRef.current!
    el.addEventListener('mousedown',  onStart)
    el.addEventListener('mousemove',  onMove)
    el.addEventListener('mouseup',    onEnd)
    el.addEventListener('mouseleave', onEnd)
    el.addEventListener('touchstart', onStart, { passive: false })
    el.addEventListener('touchmove',  onMove,  { passive: false })
    el.addEventListener('touchend',   onEnd)
    return () => {
      el.removeEventListener('mousedown',  onStart)
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseup',    onEnd)
      el.removeEventListener('mouseleave', onEnd)
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove',  onMove)
      el.removeEventListener('touchend',   onEnd)
    }
  }, [disabled, onStart, onMove, onEnd])

  const handleClear = useCallback(() => {
    if (debounce.current) clearTimeout(debounce.current)
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, SIZE, SIZE)
    hasDrawn.current = false
    drawing.current  = false
    onClear()
  }, [onClear])

  useEffect(() => {
    if (clearSignal === lastClear.current) return
    lastClear.current = clearSignal
    handleClear()
  }, [clearSignal, handleClear])

  const gs = Math.round(SIZE * 0.72)
  const gx = Math.round((SIZE - gs) / 2)
  const c  = Math.round(SIZE / 2)

  return (
    <div className="flex w-full flex-col items-center gap-3 px-5 pb-3 sm:px-7 sm:pb-6 short:px-3 short:pb-2">
      <div className="relative aspect-square w-[85%] max-w-[63vw] tall:max-w-[76vw] overflow-hidden rounded-xl shadow-[0_0_0_2px_rgb(var(--c-200)),0_6px_20px_rgb(var(--c-500)_/_0.14)] sm:max-w-[290px] md:max-w-[340px] lg:max-w-[375px] short:max-w-[48vh]">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className={`block h-full w-full touch-none bg-white ${disabled ? 'cursor-default' : 'pen-cursor'}`}
        />

        <svg
          className="pointer-events-none absolute inset-0"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden="true"
        >
          <rect
            x={gx} y={gx} width={gs} height={gs}
            fill="none" stroke="var(--brand-guide)" strokeWidth="2" strokeDasharray="6 5" rx="10"
          />
          <line x1={c - 7} y1={c} x2={c + 7} y2={c} stroke="var(--brand-guide)" strokeWidth="2" strokeLinecap="round"/>
          <line x1={c} y1={c - 7} x2={c} y2={c + 7} stroke="var(--brand-guide)" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {guideChar && (
          <svg
            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${showCharGuide ? 'opacity-100' : 'opacity-0'}`}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
          >
            <text
              x={c} y={c + 28}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={Math.round(SIZE * 0.75)}
              fontWeight="800"
              fontFamily="Nunito, system-ui, sans-serif"
              fill="var(--brand-stroke)"
              opacity="0.07"
              style={{ userSelect: 'none' }}
            >
              {guideChar}
            </text>
          </svg>
        )}

        {disabled && (
          <button
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-brand-50/85 backdrop-blur-[1px] leading-snug text-brand-500"
            onClick={onClick}
          >
            Choose a character<br/>to start drawing
          </button>
        )}
      </div>
    </div>
  )
}
