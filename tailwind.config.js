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
        lg: '11px',
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
          150: '#EBEBEB',
          200: '#D9D9D9',
          300: '#BFBFBF',
          400: '#8C8C8C',
          500: '#585858',
        },
        green: {
          100: '#DDF8DD',
        },
        success: {
          50: '#EAFFE4',
          100: '#C0F3B3',
          300: '#31BE24',
          500: '#1E8735',
        },
        error: {
          50: '#FCECE9',
          100: '#FFCBBF',
          300: '#EF4800',
          500: '#A02929',
        },
      },
      opacity: {
        15: '15%',
      },
      top: {
        8: '8%',
        42: '42%',
      },
      bottom: {
        8: '8%',
        42: '42%',
      },
      fontSize: {
        'heading-1': ['1.5rem', { fontWeight: 700 }],
        'heading-2': ['1.375rem', { fontWeight: 700 }],
        'heading-3': ['1.125rem', { fontWeight: 700 }],
        'body-bold': ['1rem', { fontWeight: 700 }],

        body: ['1rem', { fontWeight: 400 }],
        small: ['0.875rem', { fontWeight: 400 }],
        'small-italicized': ['0.875rem', { fontWeight: 400 }],
        label: ['0.875rem', { fontWeight: 300 }],
        'graph-label': ['0.75rem', { fontWeight: 500 }],
        'graph-number': ['0.625rem', { fontWeight: 400 }],
        tooltip: ['0.625rem', { fontWeight: 600 }],
      },
      width: {
        'profile-field': '256px',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addUtilities }) => {
      addUtilities({
        '.text-small-italicized': {
          fontStyle: 'italic',
        },
        '.text-tooltip': {
          fontFamily: 'Lato, sans-serif',
          lineHeight: '12px',
        },
      });
    }),
  ],
};
