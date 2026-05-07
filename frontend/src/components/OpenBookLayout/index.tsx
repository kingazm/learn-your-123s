import type { ReactNode } from 'react'

interface Props { left: ReactNode; right: ReactNode }

export default function OpenBookLayout({ left, right }: Props) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-brand-200 bg-white shadow-[0_4px_20px_rgb(var(--c-500)_/_0.11),0_1px_4px_rgba(0,0,0,.06)] sm:flex-row sm:items-stretch pen-cursor"
    >
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-center overflow-y-auto bg-white sm:shadow-[inset_-8px_0_14px_rgba(0,0,0,.025)]">
        {left}
      </div>
      <div aria-hidden="true" className="h-[10px] w-full shrink-0 bg-brand-200 sm:h-auto sm:w-[10px] md:w-3" />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto bg-brand-50/60 px-4 py-5 sm:gap-5 sm:px-5 md:px-7">
        {right}
      </div>
    </div>
  )
}
