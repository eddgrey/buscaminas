const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Build your palette here
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.gray,
        blueGray: colors.blueGray,
        blue: colors.blue,
        lightBlue: colors.lightBlue
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
