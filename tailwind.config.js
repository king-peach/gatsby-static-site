/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
        '1': '1',
        '9': '9',
        '99': '99',
        '999': '999',
        '9999': '9999'
      },
      colors: {
        neutral: colors.neutral,
        primary: colors.purple,
      },
      fontFamily: {
        sans: ['100%/1.5 -apple-system', '"PingFang SC"', '"Lantinghei SC"', '"Source Han Sans"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'SimSun', 'sans-serif', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"']
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xs: '1rem',
        sm: '1rem',
        xl: '1rem',
        '2xl': '6rem'
      }
    }
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
