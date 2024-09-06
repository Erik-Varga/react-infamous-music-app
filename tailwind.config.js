/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1.5s ease-out',
        'spin-slow': 'spin 400s linear infinite',
        'reverse-spin': 'reverse-spin 300s linear infinite'
      },
      colors: {
        "dark": '#232A3C',
        "medium": '#293245',
        "primary": '#02b875',
        "secondary": '#212121',
      },
      screens: {
        sm: { max: "639px" },
        md: "800px",
      },
    },
  },
  plugins: [],
}

