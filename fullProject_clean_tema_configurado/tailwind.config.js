/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '0.45rem',
        'sm': '0.75rem',
        'base': '0.85rem',
        'lg': '1rem',
        'xl': '1.125rem',
        '2xl': '1.25rem',
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
      }
    },
  },
  plugins: [],}