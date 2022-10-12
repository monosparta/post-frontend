/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const zhFontFamily = {
  sans: ['Inter','文泉驛正黑', 'WenQuanYi Zen Hei', '儷黑 Pro', 'LiHei Pro', '黑體-繁', 'Heiti TC', '微軟正黑體', 'Microsoft JhengHei'],
}

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'), //多行省略
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter var', ...zhFontFamily.sans, ...defaultTheme.fontFamily.sans],
        'Inter': ['"Inter"'],
      },
    },
  },
}
