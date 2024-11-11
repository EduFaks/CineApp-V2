/** @type {import('tailwindcss').Config} */

const withMt = require("@material-tailwind/react/utils/withMT");
module.exports = withMt({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: 'rgb(18, 18, 18)',
          200: 'rgb(51, 51, 51)'
        },
      brand: {
          100: '#0984e3',
          200: '#0984e3'
        }
      }
    },
  },
  plugins: [],
})
