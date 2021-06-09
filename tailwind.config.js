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
  purge: {
    options: {
      safelist: {
        standard: [
          /^max-h-/,
          /^md:w-/,
          /^md:h-/
        ]
      }
    }
  }
}
