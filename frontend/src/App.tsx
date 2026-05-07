import { Lock, LockOpen } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import BookTabs from './components/BookTabs'
import CharacterPickerModal from './components/CharacterPickerModal'
import DrawingCanvas from './components/DrawingCanvas'
import LearnABCsPlaceholder from './components/LearnABCsPlaceholder'
import LearnControls from './components/LearnControls'
import Mascot from './components/Mascot'
import PracticeABCsPlaceholder from './components/PracticeABCsPlaceholder'
import PracticeModePlaceholder from './components/PracticeModePlaceholder'
import SegmentedControl from './components/SegmentedControl'
import SettingsNav from './components/SettingsNav'
import SettingsPlaceholder from './components/SettingsPlaceholder'
import StatsPlaceholder from './components/StatsPlaceholder'
import TestModePlaceholder from './components/TestModePlaceholder'
import type { Mode, SubMode } from './config/modes'
import mascot from './data/mascot.json'
import { useSettings } from './hooks/useSettings'
import { useSound } from './hooks/useSound'
import type { Mood, Prediction } from './types'

const DIGITS = ['0','1','2','3','4','5','6','7','8','9']

function fmt(template: string, char: string) {
  return template.replace('{char}', char)
}

export default function App() {
  const { settings, update }             = useSettings()
  const [mode, setMode]                  = useState<Mode>('learn')
  const [subModes, setSubModes]          = useState<Record<Mode, SubMode>>({ learn: '123s', practice: '123s', test: '123s' })
  const [locked, setLocked]             = useState(false)
  const [selectedChar, setSelectedChar]  = useState<string | null>(null)
  const [pickerOpen, setPickerOpen]      = useState(false)
  const [showGuide, setShowGuide]        = useState(true)
  const [, setIsCorrect]                 = useState<boolean | null>(null)
  const [message, setMessage]            = useState(mascot.idleLines[0])
  const [bubbleKey, setBubbleKey]        = useState(0)
  const [mood, setMood]                  = useState<Mood>('idle')
  const [clearSignal, setClearSignal]    = useState(0)
  const [rightTab, setRightTab]          = useState<string | null>(null)
  const isIdle  = useRef(true)
  const idleIdx = useRef(0)
  const { playCorrect, playWrong } = useSound(settings.soundEnabled)

  const subMode = subModes[mode]

  function setSubMode(v: SubMode) {
    if (locked) return
    setSubModes(s => ({ ...s, [mode]: v }))
    setSelectedChar(null)
    setIsCorrect(null)
    setClearSignal(c => c + 1)
  }

  function say(text: string, newMood: Mood = 'idle') {
    setMessage(text)
    setBubbleKey(k => k + 1)
    setMood(newMood)
  }

  useEffect(() => {
    const t = setInterval(() => {
      if (isIdle.current) {
        idleIdx.current = (idleIdx.current + 1) % mascot.idleLines.length
        say(mascot.idleLines[idleIdx.current])
      }
    }, 7000)
    return () => clearInterval(t)
  }, [])

  function switchMode(m: Mode) {
    setMode(m)
    setSelectedChar(null)
    setPickerOpen(false)
    setIsCorrect(null)
    isIdle.current = true
    say(mascot.idleLines[0])
  }

  function handleCharSelect(char: string) {
    setSelectedChar(char)
    setPickerOpen(false)
    setIsCorrect(null)
    setClearSignal(v => v + 1)
    isIdle.current = false
    say(fmt(mascot.templates.practice, char))
  }

  function handleDrawStart() {
    isIdle.current = false
    setMood('idle')
  }

  async function handleRecognize(dataUrl: string) {
    isIdle.current = false
    try {
      const res = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      })
      if (!res.ok) return
      const data = await res.json()
      if (data.not_drawing) { say(mascot.templates.notDrawing, 'thinking'); return }
      const top: Prediction = data.predictions[0]
      say(`${mascot.digitQuips[top.digit]} (${top.confidence.toFixed(0)}% sure!)`, 'happy')
    } catch (err) {
      console.error(err)
      say(mascot.templates.oops)
    }
  }

  async function handleLearn(dataUrl: string) {
    isIdle.current = false
    if (!selectedChar) return
    try {
      const res = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      })
      if (!res.ok) return
      const data = await res.json()
      if (data.not_drawing) { say(fmt(mascot.templates.notDrawingLearn, selectedChar), 'thinking'); return }
      const top: Prediction = data.predictions[0]
      const correct = String(top.digit) === selectedChar
      setIsCorrect(correct)
      if (correct) {
        say(fmt(mascot.templates.correct, selectedChar), 'happy')
        playCorrect()
      } else {
        say(fmt(mascot.templates.wrong, selectedChar), 'sad')
        playWrong()
      }
    } catch (err) {
      console.error(err)
      say(mascot.templates.oops)
    }
  }

  function handleClear() {
    setIsCorrect(null)
    isIdle.current = true
    say(mode === 'learn' && selectedChar
      ? fmt(mascot.templates.clearLearn, selectedChar)
      : mascot.idleLines[0]
    )
  }

  const subControlVisible = !rightTab && (mode === 'learn' || mode === 'practice')

  const leftPage = rightTab === 'stats'    ? <StatsPlaceholder />
                 : rightTab === 'settings' ? <SettingsPlaceholder settings={settings} onUpdate={update} />
                 : mode === 'test'         ? <TestModePlaceholder />
                 : mode === 'learn' && subMode === 'ABCs'     ? <LearnABCsPlaceholder />
                 : mode === 'practice' && subMode === 'ABCs'  ? <PracticeABCsPlaceholder />
                 : mode === 'practice' && subMode === 'ABCs' ? <PracticeModePlaceholder />
                 : (
      <div className="flex h-full w-full flex-col items-center justify-center">
        {mode === 'learn' && (
          <LearnControls
            selectedChar={selectedChar}
            showGuide={showGuide}
            onOpenPicker={() => setPickerOpen(true)}
            onToggleGuide={setShowGuide}
          />
        )}
        <DrawingCanvas
          onDrawStart={handleDrawStart}
          onPredict={mode === 'learn' ? handleLearn : handleRecognize}
          onClear={handleClear}
          onClick={mode === 'learn' && !selectedChar ? () => setPickerOpen(true) : undefined}
          clearSignal={clearSignal}
          guideChar={mode === 'learn' && selectedChar ? selectedChar : undefined}
          showCharGuide={showGuide}
          disabled={mode === 'learn' && !selectedChar}
        />
      </div>
    )

  const rightPage = (
    <div className="relative flex w-full flex-1 min-h-0 flex-col items-center pt-4">
      {subControlVisible && (
        <SegmentedControl value={subMode} onChange={setSubMode} disabled={locked} />
      )}
      <div className="flex flex-1 items-center justify-center">
        <Mascot
          message={message}
          mood={mood}
          bubbleKey={bubbleKey}
          onEraseClick={() => setClearSignal(v => v + 1)}
        />
      </div>
      <button
        type="button"
        onClick={() => setLocked(l => !l)}
        title={locked ? 'Unlock navigation' : 'Lock navigation'}
        className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-brand-300 transition-colors hover:text-brand-500"
      >
        {locked ? <Lock size={20} /> : <LockOpen size={20} />}
      </button>
    </div>
  )

  return (
    <div className="flex h-screen sm:h-[90vh] flex-col items-center overflow-hidden px-3">
      <header className="mt-5 pt-6 shrink-0 flex flex-col items-center gap-0.5 short:mt-1 short:pt-4">
        <h1 className="bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-xl font-extrabold tracking-[-0.02em] text-transparent sm:text-[1.7rem] short:text-sm">
          Learn your 123s
        </h1>
        <p className="my-2 pb-5 text-[0.68rem] text-brand-400/60 sm:text-[0.8rem] short:hidden">AI-assisted handwriting and math practice</p>
      </header>

      <main className="flex w-full flex-1 min-h-0 justify-center">
        <div className="flex h-full w-full max-w-[1200px] flex-col">
          <BookTabs mode={rightTab ? null : mode} locked={locked} onSwitch={m => { setRightTab(null); switchMode(m) }} trailing={
            <SettingsNav
              active={rightTab}
              locked={locked}
              onSelect={id => {
                if (locked) return
                const next = rightTab === id ? null : id
                setRightTab(next)
                if (next) {
                  const lines = mascot.sectionLines[next as keyof typeof mascot.sectionLines]
                  say(lines[Math.floor(Math.random() * lines.length)])
                } else {
                  isIdle.current = true
                  say(mascot.idleLines[0])
                }
              }}
            />
          } />
          <div
            className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-b-xl border-x border-b border-brand-200 shadow-[0_4px_20px_rgb(var(--c-500)_/_0.11),0_1px_4px_rgba(0,0,0,.06)]"
          >
            <div className="flex flex-1 min-h-0 flex-col sm:flex-row">
              <div className={`flex min-h-0 min-w-0 flex-1 flex-col items-center overflow-y-auto bg-white sm:shadow-[inset_-6px_0_12px_rgba(0,0,0,.025)]${!rightTab ? ' pen-cursor' : ''}`}>
                {leftPage}
              </div>
              <div aria-hidden="true" className="h-[8px] w-full shrink-0 bg-brand-200 sm:h-auto sm:w-[8px] md:w-2.5" />
              <div className="relative flex min-w-0 flex-none flex-col overflow-y-auto bg-brand-50/60 sm:min-h-0 sm:flex-1">
                {rightPage}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-10 text-center text-[0.62rem] text-brand-300/60 sm:text-[0.72rem] short:mt-5 short:text-[0.55rem]">
        Copyright &copy; 2026 Kinga Żmuda
      </footer>

      {mode === 'learn' && pickerOpen && (
        <CharacterPickerModal
          chars={DIGITS}
          selected={selectedChar}
          onSelect={handleCharSelect}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}
