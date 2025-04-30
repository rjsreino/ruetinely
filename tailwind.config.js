/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      dropShadow: {
        '2xl': ['0 10px 8px rgba(0, 0, 0, 0.20)', '0 4px 3px rgba(0, 0, 0, 0.35)'],
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': ['0 12px 10px rgba(0, 0, 0, 0.20)', '0 5px 4px rgba(0, 0, 0, 0.35)'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
