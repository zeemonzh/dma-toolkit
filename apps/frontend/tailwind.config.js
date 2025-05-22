/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#e9213d',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#e9213d',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        'dark': {
          DEFAULT: '#0b0c10',
          secondary: '#14151a',
          light: '#181a20',
          lighter: '#1c1d23',
        }
      },
      backgroundColor: {
        'body': '#0b0c10',
      }
    },
  },
  plugins: [],
}

