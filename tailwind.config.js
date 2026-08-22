/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F6ECE6',
        plum: {
          DEFAULT: '#3B232E',
          hover: '#523241',
        },
        rose: {
          accent: '#EAD7CF',
        },
        charcoal: '#2D1E25',
        mauve: '#7A6870',
        growth: '#2D6A4F',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        indic: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
