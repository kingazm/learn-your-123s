import { BRAND } from '../../config/theme'
import type { Mood } from '../../types'

const MOOD_ANIM: Record<Mood, string> = {
  idle:     'animate-[float_3.2s_ease-in-out_infinite]',
  thinking: 'animate-[think_1.8s_ease-in-out_infinite]',
  happy:    'animate-[jump_0.65s_cubic-bezier(0.34,1.56,0.64,1)_1,_float_3.2s_0.68s_ease-in-out_infinite]',
  sad:      'animate-[droop_2.8s_ease-in-out_infinite]',
}

const MOUTH: Record<Mood, string> = {
  idle:     'M23 57 Q36 64 49 57',
  thinking: 'M25 60 Q36 60 47 60',
  happy:    'M21 55 Q36 65 51 55',
  sad:      'M23 63 Q36 57 49 63',
}

interface Props {
  message: string
  mood: Mood
  bubbleKey: number
  onEraseClick?: () => void
}

export default function Mascot({ message, mood, bubbleKey, onEraseClick }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 short:gap-1">
      <div
        key={bubbleKey}
        className="animate-[bubble-pop_0.38s_cubic-bezier(0.34,1.56,0.64,1)_both] relative max-w-[180px] rounded-[10px] border-[1.5px] border-brand-200 bg-white px-3 py-[0.5rem] text-center text-[0.78rem] font-bold text-brand-700 shadow-[0_2px_8px_rgb(var(--c-500)_/_0.12)] sm:max-w-[200px] sm:px-4 sm:text-[0.82rem] md:max-w-[220px] md:text-[0.85rem] short:max-w-[150px] short:text-[0.7rem] short:px-2 short:py-1"
      >
        {message}
        <span aria-hidden="true" style={{ position:'absolute', bottom:-10, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'8px solid transparent', borderRight:'8px solid transparent', borderTop:'10px solid var(--brand-guide)' }} />
        <span aria-hidden="true" style={{ position:'absolute', bottom:-8, left:'50%', zIndex:1, transform:'translateX(-50%)', width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:'8px solid white' }} />
      </div>

      <button
        type="button"
        onClick={onEraseClick}
        aria-label="Clear canvas"
        title="Tap to erase"
        className="cursor-pointer rounded-xl p-1 transition-transform hover:scale-105 active:scale-95"
      >
        <svg
          key={mood}
          className={`h-[80px] w-[70px] origin-bottom will-change-transform sm:h-[110px] sm:w-[95px] md:h-[140px] md:w-[122px] lg:h-[160px] lg:w-[140px] short:h-[60px] short:w-[52px] ${MOOD_ANIM[mood]}`}
          viewBox="0 0 72 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse cx="36" cy="80" rx="20" ry="2.5" fill={BRAND.bodyDeep} opacity=".35"/>
          <rect x="12" y="10" width="52" height="56" rx="8" fill={BRAND.bodyDeep}/>
          <rect x="8"  y="6"  width="52" height="56" rx="8" fill={BRAND.body}/>
          <rect x="8"  y="6"  width="52" height="15" rx="8" fill={BRAND.cap}/>
          <rect x="8"  y="17" width="52" height="4"  fill={BRAND.capBand}/>
          <rect x="12" y="9"  width="20" height="4"  rx="2" fill="#fff" opacity=".18"/>
          <rect x="8"  y="21" width="52" height="18" fill={BRAND.label}/>
          <line x1="15" y1="27" x2="55" y2="27" stroke={BRAND.bodyDeep} strokeWidth="1.2"/>
          <line x1="15" y1="33" x2="55" y2="33" stroke={BRAND.bodyDeep} strokeWidth="1.2"/>
          <circle cx="27" cy="49" r="3.5" fill={BRAND.eye}/>
          <circle cx="45" cy="49" r="3.5" fill={BRAND.eye}/>
          <circle cx="28.4" cy="47.5" r="1.3" fill="#fff"/>
          <circle cx="46.4" cy="47.5" r="1.3" fill="#fff"/>
          <ellipse cx="17" cy="53" rx="3.5" ry="2" fill={BRAND.blush} opacity=".55"/>
          <ellipse cx="55" cy="53" rx="3.5" ry="2" fill={BRAND.blush} opacity=".55"/>
          <path d={MOUTH[mood]} stroke={BRAND.eye} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <rect x="0"  y="44" width="9"  height="10" rx="4" fill={BRAND.bodyDeep}/>
          <rect x="63" y="44" width="9"  height="10" rx="4" fill={BRAND.bodyDeep}/>
          <rect x="14" y="62" width="12" height="8"  rx="4" fill={BRAND.bodyDeep}/>
          <rect x="46" y="62" width="12" height="8"  rx="4" fill={BRAND.bodyDeep}/>
        </svg>
        <p className="text-[0.68rem] font-bold tracking-wide text-brand-300 short:text-[0.58rem]">tap to erase</p>
      </button>
    </div>
  )
}
