/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#EEE9DF',       // Palladian Linen
        surface: '#FFFFFF',      // Pure white
        well: '#F4F0E8',         // Soft tint well
        oatmeal: '#C9C1B1',      // Border oatmeal
        abyssal: {
          DEFAULT: '#1B2632',    // Abyssal Anchorfish Blue
          hover: '#2C3B4D',
        },
        truffle: '#A35139',       // Truffle Trouble Warm Contrast Accent
        flame: '#FFB162',         // Burning Flame Interactive Highlight
        slateText: '#5C6B7A',     // Muted Secondary Text
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
