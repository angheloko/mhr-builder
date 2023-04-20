module.exports = {
  plugins: [
    require('@tailwindcss/forms')
  ],
  variants: {
    extend: {
      borderStyle: ['last'],
      margin: ['last'],
      inset: ['last'],
      backgroundColor: ['checked'],
      borderColor: ['checked']
    }
  },
  content: [
    './pages/**/*.{js,jsx,ts,tsx,vue}',
    './components/**/*.{js,jsx,ts,tsx,vue}'
  ]
}
