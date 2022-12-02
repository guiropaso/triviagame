/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./dist/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        sans: ['"Open Sans"',...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: "#5680e9",
        cyan: "#84ceeb",
        lightBlue: "#5ab9ea",
        gray: "#c1c8e4",
        purple: "#8860d0",
        color1: "#2196F3"
      },
    },
  },
  plugins: [],
}
