/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.css'
],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#1b1d30',
          purple: '#5c51ca',
          rose: '#d076ad',
          darkGrey: '#1C1C1E',
          lightGrey: '#D1D1D6',
          white: '#F8F8F8',
        },
        blue: {
          1: '#0466C8',
          2: '#0353A4',
          3: '#023E7D',
          4: '#002855',
          5: '#001845',
          6: '#001233',
        },
        greyBlue: '#33415C',
        inactiveGrey: '#A1A1A1',
        bgBlack: '#121212',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Neue Montreal', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  variants: {
    scrollSnapType: ['responsive'],
  },
  darkMode: 'class',
}

