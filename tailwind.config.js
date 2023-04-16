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
        ruby: '#D41B2C',
        'ruby-dark': '#A41F2C',
        'ruby-disabled': '#ED949C',
        'light-grey': '#D9D9D9',
        'medium-grey': '#F8F8F8',
        grey: '#F3F3F3',
        red: '#CC0000',
        b: '#000000',
        g: '#585858',
        er: '#A1A1A1',
        'light-red': '#ef4444',
        'red-100': '#fee2e2',
        'red-400': '#f87171',
        'red-700': '#b91c1c',
        'last-date-modified-grey': '#8C8C8C',
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
