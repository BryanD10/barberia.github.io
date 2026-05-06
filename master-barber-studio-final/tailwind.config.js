/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4D03F',
          dark: '#B8960C'
        },
        dark: {
          DEFAULT: '#0A0A0A',
          deeper: '#050505',
          card: '#1A1A1A',
          border: '#2A2A2A'
        },
        cream: '#F5F5F0',
        'text-gray': '#A0A0A0'
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}