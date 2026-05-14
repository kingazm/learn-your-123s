const STEPS = [
  { n: '1', text: 'Pick a number to practise' },
  { n: '2', text: 'Trace it on the canvas — a faint guide helps you get the shape right' },
  { n: '3', text: 'The AI tells you straight away if you got it!' },
  { n: '4', text: 'Click the eraser mascot to clear the canvas' },
]

export default function About() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-8 py-10">

      <div className="flex w-full max-w-[240px] sm:max-w-[300px] flex-col gap-4 sm:gap-5">
        <h2 className="text-[1rem] sm:text-[1.2rem] font-extrabold text-brand-700">How does it work?</h2>
        {STEPS.map(({ n, text }) => (
          <div key={n} className="flex items-start gap-3">
            <span className="mt-px flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-brand-400 text-[0.62rem] sm:text-[0.7rem] font-extrabold text-white">
              {n}
            </span>
            <p className="text-[0.78rem] sm:text-[0.9rem] leading-snug text-brand-500">{text}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
