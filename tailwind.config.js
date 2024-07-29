/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#C67C4E',
          50: '#F3E3D9',
          100: '#EED7C9',
          200: '#E4C1AB',
          300: '#DAAA8C',
          400: '#D0936D',
          500: '#C67C4E',
          600: '#A66136',
          700: '#7C4828',
          800: '#582200',
          900: '#27170D',
          950: '#120A06'
        },
        // 'primary': { // 'carnaby-tan': {
        //   DEFAULT: '#582200',
        //   50: '#FFB88B',
        //   100: '#FFAB77',
        //   200: '#FF924E',
        //   300: '#FF7925',
        //   400: '#FB6100',
        //   500: '#D25100',
        //   600: '#AA4200',
        //   700: '#813200',
        //   800: '#582200',
        //   900: '#200C00',
        //   950: '#040100'
        // },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('autoprefixer'),
  ],
}