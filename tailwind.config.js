/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/shared/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: '0px 1px 2px rgba(0,0,0,0.25)',
        lg: '0px 3.5px 3.5px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        lg: '10px',
      },
      colors: {
        red: {
          100: '#FEE2E2',
          200: '#F0B2B2',
          300: '#E58080',
          400: '#DB4D4D',
          500: '#CC0000',
          700: '#B91C1C',
        },
        gray: {
          100: '#F8F8F8',
          200: '#D9D9D9',
          300: '#BFBFBF',
          400: '#8C8C8C',
          500: '#585858',
        },
      },
      top: {
        8: '8%',
        42: '42%',
      },
      bottom: {
        8: '8%',
        42: '42%',
      },
    },
  },
  plugins: [],
};
