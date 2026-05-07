/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:   'rgb(var(--c-50) / <alpha-value>)',
          100:  'rgb(var(--c-100) / <alpha-value>)',
          200:  'rgb(var(--c-200) / <alpha-value>)',
          300:  'rgb(var(--c-300) / <alpha-value>)',
          400:  'rgb(var(--c-400) / <alpha-value>)',
          500:  'rgb(var(--c-500) / <alpha-value>)',
          600:  'rgb(var(--c-600) / <alpha-value>)',
          700:  'rgb(var(--c-700) / <alpha-value>)',
          800:  'rgb(var(--c-800) / <alpha-value>)',
          900:  'rgb(var(--c-900) / <alpha-value>)',
          tint: 'rgb(var(--c-tint) / <alpha-value>)',
        },
      },
      screens: {
        // targets landscape phones (height ≤ 500px)
        short: { raw: '(max-height: 500px)' },
        // targets tall portrait phones (e.g. iPhone 14/17) — more vertical room for a larger canvas
        tall:  { raw: '(min-height: 700px) and (max-width: 639px)' },
      },
    },
  },
  plugins: [],
}
