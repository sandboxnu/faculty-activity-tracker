/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/shared/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ruby": "#D41B2C",
        "ruby-dark": "#A41F2C",
        "ruby-disabled": "#ED949C",
      },
    },
  },
  plugins: [],
}
