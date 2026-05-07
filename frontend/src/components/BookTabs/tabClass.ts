const TAB = 'shrink-0 p-1 -mb-0.5 rounded-t-xl border-2 text-[0.8rem] font-extrabold transition-colors duration-150 sm:px-5 sm:text-[0.82rem]'
const ACTIVE = 'relative z-10 border-brand-300 border-b-brand-tint bg-brand-tint text-brand-700'
const INACTIVE = 'border-brand-200 border-b-transparent bg-transparent text-brand-400 hover:text-brand-600'

export const tabClass = (active: boolean) => `${TAB} ${active ? ACTIVE : INACTIVE}`
